import type { ISODateTimeString, TicketStatus, UUID } from "@/lib/models/common";

export type TicketIssueData = {
  vendor: string;
  connection_number: string;
  issue_summary: string;
  category: string;
};

export type Ticket = {
  id: UUID;
  ticket_no: string;
  customer_id: UUID;
  vendor_id: UUID;
  status: TicketStatus;
  issue_data: TicketIssueData;
  internal_notes: string | null;
  created_at: ISODateTimeString;
  customer_name?: string;
  customer_phone?: string;
  customer_location?: string;
  assigned_technician_id?: string;
  assigned_technician_name?: string;
};

export type TicketCreate = {
  vendor_id: UUID;
  issue_data: TicketIssueData;
};

export type TicketStatusUpdate = {
  status: TicketStatus;
};

export type TicketNotesUpdate = {
  internal_notes: string;
};

export type TicketAssignmentUpdate = {
  assigned_technician_id: string;
  assigned_technician_name: string;
};

