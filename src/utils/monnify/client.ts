/* Monnify REST helper with token caching (server-side only) */

let cachedToken: { accessToken: string; expiresAt: number } | null = null;

const MONNIFY_BASE_URL =
  process.env.MONNIFY_BASE_URL || "https://sandbox.monnify.com";
const MONNIFY_API_KEY = process.env.MONNIFY_API_KEY || "";
const MONNIFY_SECRET_KEY = process.env.MONNIFY_SECRET_KEY || "";

async function fetchAccessToken(): Promise<string> {
  const basic = Buffer.from(
    `${MONNIFY_API_KEY}:${MONNIFY_SECRET_KEY}`
  ).toString("base64");
  const res = await fetch(`${MONNIFY_BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${basic}`,
    },
    body: JSON.stringify({}),
    // ensure it's server-side
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Monnify auth failed: ${res.status}`);
  }
  const data = await res.json();
  const accessToken: string = data?.responseBody?.accessToken;
  const expiresIn: number = data?.responseBody?.expiresIn ?? 3000; // seconds
  if (!accessToken) throw new Error("Monnify auth missing accessToken");
  // set expiry a bit earlier to be safe
  const expiresAt = Date.now() + (expiresIn - 60) * 1000;
  cachedToken = { accessToken, expiresAt };
  return accessToken;
}

export async function getMonnifyAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.accessToken;
  }
  return await fetchAccessToken();
}

export async function monnifyGetBanks(): Promise<
  Array<{ name: string; code: string }>
> {
  const token = await getMonnifyAccessToken();
  const res = await fetch(`${MONNIFY_BASE_URL}/api/v1/banks`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch banks: ${res.status}`);
  }
  const data = await res.json();
  const list: any[] = data?.responseBody ?? [];
  return list
    .filter((b) => typeof b?.name === "string" && typeof b?.code === "string")
    .map((b) => ({ name: b.name as string, code: b.code as string }));
}

export async function monnifyValidateAccount(params: {
  accountNumber: string;
  bankCode: string;
}): Promise<{ accountNumber: string; accountName: string; bankCode: string }> {
  const token = await getMonnifyAccessToken();
  const url = new URL(
    `${MONNIFY_BASE_URL}/api/v1/disbursements/account/validate`
  );
  url.searchParams.set("accountNumber", params.accountNumber);
  url.searchParams.set("bankCode", params.bankCode);
  const res = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      data?.responseMessage || data?.message || `Failed to validate account`;
    throw { status: res.status, message } as any;
  }
  const body = data?.responseBody ?? {};
  return {
    accountNumber: String(body.accountNumber ?? params.accountNumber),
    accountName: String(body.accountName ?? ""),
    bankCode: String(body.bankCode ?? params.bankCode),
  };
}
