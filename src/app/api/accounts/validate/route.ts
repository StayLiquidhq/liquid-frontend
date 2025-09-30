import { NextResponse } from "next/server";
import { monnifyValidateAccount } from "@/utils/monnify/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const accountNumber = searchParams.get("accountNumber") || "";
    const bankCode = searchParams.get("bankCode") || "";
    if (!/^\d{10}$/.test(accountNumber) || !bankCode) {
      return NextResponse.json(
        { error: "accountNumber (10 digits) and bankCode are required" },
        { status: 400 }
      );
    }
    const result = await monnifyValidateAccount({ accountNumber, bankCode });
    return NextResponse.json(result);
  } catch (e: any) {
    const status = typeof e?.status === "number" ? e.status : 500;
    const message = e?.message || "Validation failed";
    return NextResponse.json({ error: message }, { status });
  }
}
