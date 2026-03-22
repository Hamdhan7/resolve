import type { TicketIssueData } from "@/lib/models/ticket";

export interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: string;
}

export interface ChatApiResponse {
    reply: string;
    is_complete: boolean;
    ticket_draft: TicketIssueData | null;
}
