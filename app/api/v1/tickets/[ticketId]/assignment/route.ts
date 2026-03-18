import { NextResponse } from "next/server";

import { updateTicketAssignment } from "@/lib/mock/db";
import type { TicketAssignmentUpdate } from "@/lib/models/ticket";

export const runtime = "nodejs";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  const { ticketId } = await params;
  const body = (await req.json()) as TicketAssignmentUpdate;

  if (!body?.assigned_technician_id || !body?.assigned_technician_name) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  const updated = updateTicketAssignment(
    ticketId,
    body.assigned_technician_id,
    body.assigned_technician_name
  );
  if (!updated) {
    return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

