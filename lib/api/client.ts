import type { Ticket, TicketAssignmentUpdate, TicketNotesUpdate, TicketStatusUpdate } from "@/lib/models/ticket";
import type { Vendor } from "@/lib/models/vendor";
import { MOCK_VENDORS, MOCK_TICKETS, updateTicketStatus } from "@/lib/mock-api";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getVendors(): Promise<Vendor[]> {
  await delay(500);
  return MOCK_VENDORS;
}

export async function getTickets(): Promise<Ticket[]> {
  await delay(500);
  return MOCK_TICKETS;
}

export async function getTicket(ticketId: string): Promise<Ticket> {
  await delay(500);
  const ticket = MOCK_TICKETS.find((t) => t.id === ticketId || t.ticket_no === ticketId);
  if (!ticket) throw new Error("Ticket not found");
  return ticket;
}

export async function patchTicketStatus(ticketId: string, payload: TicketStatusUpdate): Promise<Ticket> {
  return updateTicketStatus(ticketId, payload.status);
}

export async function patchTicketNotes(ticketId: string, payload: TicketNotesUpdate): Promise<Ticket> {
  await delay(500);
  const ticket = MOCK_TICKETS.find((t) => t.id === ticketId || t.ticket_no === ticketId);
  if (!ticket) throw new Error("Ticket not found");
  ticket.internal_notes = payload.internal_notes;
  return ticket;
}

export async function patchTicketAssignment(ticketId: string, payload: TicketAssignmentUpdate): Promise<Ticket> {
  await delay(500);
  const ticket = MOCK_TICKETS.find((t) => t.id === ticketId || t.ticket_no === ticketId);
  if (!ticket) throw new Error("Ticket not found");
  ticket.assigned_technician_id = payload.assigned_technician_id;
  ticket.assigned_technician_name = payload.assigned_technician_name;
  return ticket;
}

export async function deleteTicket(ticketId: string): Promise<{ ok: true }> {
  await delay(500);
  const index = MOCK_TICKETS.findIndex((t) => t.id === ticketId || t.ticket_no === ticketId);
  if (index !== -1) MOCK_TICKETS.splice(index, 1);
  return { ok: true };
}
