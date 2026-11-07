const BASE58_ALPHABET =
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

export type WalletNetwork = "solana" | "base";

function decodeBase58(value: string): Uint8Array | null {
  const bytes = [0];

  for (const char of value) {
    const carryStart = BASE58_ALPHABET.indexOf(char);

    if (carryStart === -1) return null;

    let carry = carryStart;

    for (let i = 0; i < bytes.length; i++) {
      carry += bytes[i] * 58;
      bytes[i] = carry & 0xff;
      carry >>= 8;
    }

    while (carry > 0) {
      bytes.push(carry & 0xff);
      carry >>= 8;
    }
  }

  for (const char of value) {
    if (char !== "1") break;
    bytes.push(0);
  }

  return new Uint8Array(bytes.reverse());
}

export function isValidSolanaAddress(address: string): boolean {
  const trimmed = address.trim();

  if (trimmed.length === 0) return true;
  if (trimmed.length < 32 || trimmed.length > 44) return false;

  return decodeBase58(trimmed)?.length === 32;
}

export function isValidEvmAddress(address: string): boolean {
  const trimmed = address.trim();

  if (trimmed.length === 0) return true;

  return /^0x[a-fA-F0-9]{40}$/.test(trimmed);
}

export function isValidAddressForNetwork(
  address: string,
  network: WalletNetwork
): boolean {
  return network === "base"
    ? isValidEvmAddress(address)
    : isValidSolanaAddress(address);
}

export function getNetworkLabel(network: WalletNetwork): string {
  return network === "base" ? "Base" : "Solana";
}

export function getNetworkLogo(network: WalletNetwork): string {
  return network === "base" ? "/base.jpeg" : "/solana.png";
}
