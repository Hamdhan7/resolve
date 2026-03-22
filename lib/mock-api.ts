
// --- HELPER: Simulate Network Delay ---
import type { Vendor } from "@/lib/models/vendor";
import type { Profile } from "@/lib/models/profile";
import type { Ticket } from "@/lib/models/ticket";
import type { ChatApiResponse } from "@/lib/models/chat";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// --- MOCK DATA ---

export const MOCK_VENDORS: Vendor[] = [
    { id: 'v1-uuid', name: 'Dialog', code: 'DLG' },
    { id: 'v2-uuid', name: 'SLT Mobitel', code: 'SLT' },
    { id: 'v3-uuid', name: 'Airtel', code: 'ATL' },
];

export const MOCK_CURRENT_USER: Profile = {
    id: 'user1-uuid',
    email: 'shajanthan@example.com',
    role: 'customer',
    full_name: 'Yogeswaran Shajanthan',
    phone_number: '0771234567',
};

export const MOCK_VENDOR_USER: Profile = {
    id: 'agent1-uuid',
    email: 'support@dialog.lk',
    role: 'vendor',
    full_name: 'Dialog Support Team',
    phone_number: '0112345678',
};

export const MOCK_TICKETS: Ticket[] = [
    {
        id: 'ticket-1',
        ticket_no: 'TCK-001',
        customer_id: 'user1-uuid',
        vendor_id: 'v1-uuid',
        vendor_name: 'Dialog',
        status: 'In Progress',
        issue_data: {
            vendor: 'Dialog',
            connection_number: '0771234567',
            issue_summary: '4G Data connection dropping constantly since yesterday morning.',
            category: 'Network Issue'
        },
        internal_notes: 'Checking tower logs in the Colombo area.',
        created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
    {
        id: 'ticket-2',
        ticket_no: 'TCK-002',
        customer_id: 'user1-uuid',
        vendor_id: 'v2-uuid',
        vendor_name: 'SLT Mobitel',
        status: 'Resolved',
        issue_data: {
            vendor: 'SLT Mobitel',
            connection_number: '0112558900',
            issue_summary: 'LOS light is blinking red on the Fibre router.',
            category: 'Hardware/Physical Line'
        },
        internal_notes: 'Technician dispatched. Fiber cable was chewed by a squirrel. Replaced line.',
        created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    },
    {
        id: 'ticket-3',
        ticket_no: 'TCK-003',
        customer_id: 'user2-uuid', // Different user
        vendor_id: 'v1-uuid',
        vendor_name: 'Dialog',
        status: 'Open',
        issue_data: {
            vendor: 'Dialog',
            connection_number: '0779876543',
            issue_summary: 'Overcharged on the last monthly postpaid bill.',
            category: 'Billing'
        },
        internal_notes: null,
        created_at: new Date().toISOString(), // Today
    }
];

// --- MOCK API FUNCTIONS (To be replaced by actual fetch calls later) ---

export const fetchUserTickets = async (userId: string): Promise<Ticket[]> => {
    await delay(1000); // 1 second fake delay
    return MOCK_TICKETS.filter((t) => t.customer_id === userId);
};

export const fetchVendorTickets = async (vendorId: string): Promise<Ticket[]> => {
    await delay(1000);
    return MOCK_TICKETS.filter((t) => t.vendor_id === vendorId);
};

export const updateTicketStatus = async (ticketId: string, newStatus: string): Promise<Ticket> => {
    await delay(800);
    const ticket = MOCK_TICKETS.find(t => t.id === ticketId);
    if (!ticket) throw new Error("Ticket not found");
    // In a real app, this updates the DB. Here we just return a mutated mock object.
    const allowed = ["Open", "In Progress", "Resolved"] as const;
    const nextStatus = (allowed.includes(newStatus as (typeof allowed)[number])
      ? (newStatus as (typeof allowed)[number])
      : ticket.status);
    return { ...ticket, status: nextStatus };
};

// Simulate the AI Chatbot response
export const mockSendChatMessage = async (message: string, turnCount: number): Promise<ChatApiResponse> => {
    await delay(1500); // AI usually takes a little longer to respond

    // Simulate the AI gathering data over a few messages
    if (turnCount === 1) {
        return {
            reply: "I'm sorry to hear you're having trouble. Could you please tell me which service provider you are using (e.g., Dialog, SLT)?",
            is_complete: false,
            ticket_draft: null
        };
    } else if (turnCount === 2) {
        return {
            reply: "Thank you. And what is the phone number or account number associated with this connection?",
            is_complete: false,
            ticket_draft: null
        };
    } else {
        // On the 3rd turn, simulate completion
        return {
            reply: "Thank you for the details. I have gathered all the necessary information. Please review the ticket details below. Should I submit this to your provider?",
            is_complete: true,
            ticket_draft: {
                vendor: "Dialog",
                connection_number: "077xxxxxxx",
                issue_summary: message, // Uses the last thing they typed as the summary
                category: "Technical Support"
            }
        };
    }
};