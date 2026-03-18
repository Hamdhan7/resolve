import { NextResponse } from "next/server";

import { listVendors } from "@/lib/mock/db";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(listVendors());
}

