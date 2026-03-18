import type { Ticket, TicketAssignmentUpdate, TicketNotesUpdate, TicketStatusUpdate } from "@/lib/models/ticket";
import type { Vendor } from "@/lib/models/vendor";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }

  return (await res.json()) as T;
}

export function getVendors() {
  return apiFetch<Vendor[]>("/api/v1/vendors", { cache: "no-store" });
}

export function getTickets() {
  return apiFetch<Ticket[]>("/api/v1/tickets", { cache: "no-store" });
}

export function getTicket(ticketId: string) {
  return apiFetch<Ticket>(`/api/v1/tickets/${encodeURIComponent(ticketId)}`, { cache: "no-store" });
}

export function patchTicketStatus(ticketId: string, payload: TicketStatusUpdate) {
  return apiFetch<Ticket>(`/api/v1/tickets/${encodeURIComponent(ticketId)}/status`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function patchTicketNotes(ticketId: string, payload: TicketNotesUpdate) {
  return apiFetch<Ticket>(`/api/v1/tickets/${encodeURIComponent(ticketId)}/notes`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function patchTicketAssignment(ticketId: string, payload: TicketAssignmentUpdate) {
  return apiFetch<Ticket>(`/api/v1/tickets/${encodeURIComponent(ticketId)}/assignment`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function deleteTicket(ticketId: string) {
  return apiFetch<{ ok: true }>(`/api/v1/tickets/${encodeURIComponent(ticketId)}`, {
    method: "DELETE",
  });
}

