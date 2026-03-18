import { NextResponse } from "next/server";

import { updateTicketNotes } from "@/lib/mock/db";
import type { TicketNotesUpdate } from "@/lib/models/ticket";

export const runtime = "nodejs";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  const { ticketId } = await params;
  const body = (await req.json()) as Partial<TicketNotesUpdate> | null;

  if (!body || !("internal_notes" in body)) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  const updated = updateTicketNotes(ticketId, body.internal_notes ?? "");
  if (!updated) {
    return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

