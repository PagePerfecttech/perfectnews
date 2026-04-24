import { NextResponse } from "next/server";
import { getSetupStatus } from "@/lib/setup-status";

export async function GET() {
  const status = await getSetupStatus();
  return NextResponse.json(status);
}
