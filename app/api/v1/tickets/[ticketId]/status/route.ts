import { NextResponse } from "next/server";

import { updateTicketStatus } from "@/lib/mock/db";
import type { TicketStatusUpdate } from "@/lib/models/ticket";

export const runtime = "nodejs";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  const { ticketId } = await params;
  const body = (await req.json()) as TicketStatusUpdate;

  if (!body?.status) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  const updated = updateTicketStatus(ticketId, body.status);
  if (!updated) {
    return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

