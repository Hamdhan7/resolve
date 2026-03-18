// Enums based on backend schema
export type UserRole = 'customer' | 'vendor';
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved';

// User Profile
export interface Profile {
    id: string; // Supabase UUID
    email: string;
    role: UserRole;
    full_name: string;
    phone_number: string;
}

// Telecommunication Vendor
export interface Vendor {
    id: string; // UUID
    name: string;
    code: string;
}

// Structured Data extracted by Gemini LLM
export interface IssueData {
    vendor: string;
    connection_number: string;
    issue_summary: string;
    category: string;
}

// Main Ticket Object
export interface Ticket {
    id: string; // UUID
    customer_id: string;
    vendor_id: string;
    status: TicketStatus;
    issue_data: IssueData;
    internal_notes: string | null;
    created_at: string; // ISO 8601 Timestamp string

    // Optional relations useful for the UI (Backend will likely join these)
    vendor_name?: string;
    customer_name?: string;
}

// Chat Types (For the UI and API interaction)
export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant'; // We use 'assistant' instead of 'model' for UI clarity
    content: string;
    timestamp: string;
}

// The exact response expected from POST /chat/message
export interface ChatApiResponse {
    reply: string;
    is_complete: boolean;
    ticket_draft: IssueData | null;
}