import { NextResponse } from "next/server";
import { monnifyGetBanks } from "@/utils/monnify/client";

export async function GET() {
  try {
    const banks = await monnifyGetBanks();
    // return minimal list for UI dropdown
    return NextResponse.json({ banks });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Failed to fetch banks" },
      { status: 500 }
    );
  }
}
