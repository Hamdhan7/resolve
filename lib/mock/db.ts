import type { Profile } from "@/lib/models/profile";
import type { Vendor } from "@/lib/models/vendor";
import type { Ticket } from "@/lib/models/ticket";
import type { TicketStatus } from "@/lib/models/common";

function nowIso() {
  return new Date().toISOString();
}

const vendors: Vendor[] = [
  { id: "11111111-1111-1111-1111-111111111111", name: "Dialog", code: "DIALOG" },
  { id: "22222222-2222-2222-2222-222222222222", name: "SLT Fibre", code: "SLT" },
  { id: "33333333-3333-3333-3333-333333333333", name: "Mobitel", code: "MOBITEL" },
  { id: "44444444-4444-4444-4444-444444444444", name: "Hutch", code: "HUTCH" },
];

const profiles: Profile[] = [
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    role: "vendor",
    full_name: "Shajjanthan",
    phone_number: "077-1234567",
    email: "provider@example.com",
    vendor_id: vendors[1]?.id,
  },
  {
    id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    role: "customer",
    full_name: "Hamthan",
    phone_number: "071-2558900",
    email: "customer@example.com",
  },
  {
    id: "cccccccc-cccc-cccc-cccc-cccccccccccc",
    role: "customer",
    full_name: "Aashif",
    phone_number: "071-8881234",
    email: "aashif@example.com",
  },
];

const tickets: Ticket[] = [
  {
    id: "t-0001-0000-0000-0000-000000000001",
    ticket_no: "NET-404",
    customer_id: profiles[1]!.id,
    vendor_id: vendors[1]!.id,
    status: "In Progress",
    issue_data: {
      vendor: "SLT Fibre",
      connection_number: "011-2558900",
      issue_summary: "Connectivity Loss",
      category: "Fiber",
    },
    internal_notes: "Checked router logs, dispatching technician.",
    created_at: "2022-01-13T08:40:00.000Z",
    assigned_technician_id: "tech-1",
    assigned_technician_name: "Technician A",
  },
  {
    id: "t-0002-0000-0000-0000-000000000002",
    ticket_no: "NET-405",
    customer_id: profiles[2]!.id,
    vendor_id: vendors[1]!.id,
    status: "Resolved",
    issue_data: {
      vendor: "SLT Fibre",
      connection_number: "011-2000000",
      issue_summary: "Slow Speed",
      category: "Fiber",
    },
    internal_notes: "Line stabilized after port reset.",
    created_at: "2022-01-13T09:05:00.000Z",
    assigned_technician_id: "unassigned",
    assigned_technician_name: "Unassigned",
  },
  {
    id: "t-0003-0000-0000-0000-000000000003",
    ticket_no: "NET-406",
    customer_id: profiles[2]!.id,
    vendor_id: vendors[2]!.id,
    status: "Resolved",
    issue_data: {
      vendor: "Mobitel",
      connection_number: "077-5551234",
      issue_summary: "Mobile Data Issue",
      category: "Mobile",
    },
    internal_notes: null,
    created_at: "2022-01-13T10:05:00.000Z",
    assigned_technician_id: "tech-2",
    assigned_technician_name: "Technician B",
  },
  {
    id: "t-0004-0000-0000-0000-000000000004",
    ticket_no: "NET-407",
    customer_id: profiles[1]!.id,
    vendor_id: vendors[0]!.id,
    status: "Open",
    issue_data: {
      vendor: "Dialog",
      connection_number: "077-2229876",
      issue_summary: "TV Service",
      category: "TV",
    },
    internal_notes: null,
    created_at: "2022-01-12T06:35:00.000Z",
    assigned_technician_id: "unassigned",
    assigned_technician_name: "Unassigned",
  },
];

export type MockAuthContext =
  | { kind: "vendor"; vendorProfile: Profile }
  | { kind: "customer"; customerProfile: Profile };

export function getMockAuthContext(): MockAuthContext {
  // For now we assume the logged in user is a vendor (Provider Portal).
  return { kind: "vendor", vendorProfile: profiles[0]! };
}

export function listVendors(): Vendor[] {
  return vendors.slice();
}

export function listTickets(): Ticket[] {
  const ctx = getMockAuthContext();

  const enrich = (t: Ticket): Ticket => {
    const customer = profiles.find((p) => p.id === t.customer_id);
    return {
      ...t,
      customer_name: customer?.full_name ?? "Customer",
      customer_phone: customer?.phone_number ?? "",
      customer_location: "Colombo, LK",
      assigned_technician_id: t.assigned_technician_id ?? "unassigned",
      assigned_technician_name: t.assigned_technician_name ?? "Unassigned",
    };
  };

  if (ctx.kind === "customer") {
    return tickets.filter((t) => t.customer_id === ctx.customerProfile.id).map(enrich);
  }

  const vendorId = ctx.vendorProfile.vendor_id;
  if (!vendorId) return [];
  return tickets.filter((t) => t.vendor_id === vendorId).map(enrich);
}

export function getTicketByIdOrNo(ticketIdOrNo: string): Ticket | null {
  const ticket =
    tickets.find((t) => t.id === ticketIdOrNo) ??
    tickets.find((t) => t.ticket_no === ticketIdOrNo) ??
    null;

  if (!ticket) return null;
  const customer = profiles.find((p) => p.id === ticket.customer_id);
  return {
    ...ticket,
    customer_name: customer?.full_name ?? "Customer",
    customer_phone: customer?.phone_number ?? "",
    customer_location: "Colombo, LK",
    assigned_technician_id: ticket.assigned_technician_id ?? "unassigned",
    assigned_technician_name: ticket.assigned_technician_name ?? "Unassigned",
  };
}

export function updateTicketStatus(ticketIdOrNo: string, status: TicketStatus): Ticket | null {
  const ticket = getTicketByIdOrNo(ticketIdOrNo);
  if (!ticket) return null;

  const idx = tickets.findIndex((t) => t.id === ticket.id);
  if (idx < 0) return null;

  tickets[idx] = { ...tickets[idx]!, status };
  return getTicketByIdOrNo(tickets[idx]!.id);
}

export function updateTicketNotes(ticketIdOrNo: string, internal_notes: string): Ticket | null {
  const ticket = getTicketByIdOrNo(ticketIdOrNo);
  if (!ticket) return null;

  const idx = tickets.findIndex((t) => t.id === ticket.id);
  if (idx < 0) return null;

  tickets[idx] = { ...tickets[idx]!, internal_notes };
  return getTicketByIdOrNo(tickets[idx]!.id);
}

export function updateTicketAssignment(
  ticketIdOrNo: string,
  assigned_technician_id: string,
  assigned_technician_name: string
): Ticket | null {
  const ticket = getTicketByIdOrNo(ticketIdOrNo);
  if (!ticket) return null;

  const idx = tickets.findIndex((t) => t.id === ticket.id);
  if (idx < 0) return null;

  tickets[idx] = {
    ...tickets[idx]!,
    assigned_technician_id,
    assigned_technician_name,
  };
  return getTicketByIdOrNo(tickets[idx]!.id);
}

export function deleteTicket(ticketIdOrNo: string): boolean {
  const ticket = getTicketByIdOrNo(ticketIdOrNo);
  if (!ticket) return false;
  const idx = tickets.findIndex((t) => t.id === ticket.id);
  if (idx < 0) return false;
  tickets.splice(idx, 1);
  return true;
}

export function createTicket(payload: {
  vendor_id: string;
  issue_data: Ticket["issue_data"];
}): Ticket {
  const ctx = getMockAuthContext();
  const customerId = ctx.kind === "customer" ? ctx.customerProfile.id : profiles[1]!.id;

  const newTicket: Ticket = {
    id: `t-${Math.random().toString(16).slice(2)}-${Math.random().toString(16).slice(2)}`,
    ticket_no: `NET-${Math.floor(100 + Math.random() * 900)}`,
    customer_id: customerId,
    vendor_id: payload.vendor_id,
    status: "Open",
    issue_data: payload.issue_data,
    internal_notes: null,
    created_at: nowIso(),
    assigned_technician_id: "unassigned",
    assigned_technician_name: "Unassigned",
  };

  tickets.unshift(newTicket);
  return getTicketByIdOrNo(newTicket.id)!;
}

