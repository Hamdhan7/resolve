import { NextResponse } from "next/server";

import { createTicket, listTickets } from "@/lib/mock/db";
import type { TicketCreate } from "@/lib/models/ticket";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(listTickets());
}

export async function POST(req: Request) {
  const body = (await req.json()) as TicketCreate;

  if (!body?.vendor_id || !body?.issue_data) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  const created = createTicket(body);
  return NextResponse.json(created, { status: 201 });
}

