import { NextResponse } from "next/server";

import { deleteTicket, getTicketByIdOrNo } from "@/lib/mock/db";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  const { ticketId } = await params;
  const ticket = getTicketByIdOrNo(ticketId);

  if (!ticket) {
    return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
  }

  return NextResponse.json(ticket);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  const { ticketId } = await params;
  const ok = deleteTicket(ticketId);
  if (!ok) {
    return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

