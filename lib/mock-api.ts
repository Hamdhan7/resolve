
// --- HELPER: Simulate Network Delay ---
import type { Vendor } from "@/lib/models/vendor";
import type { Profile } from "@/lib/models/profile";
import type { Ticket } from "@/lib/models/ticket";
import type { ChatApiResponse } from "@/lib/models/chat";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// --- MOCK DATA ---

export const MOCK_VENDORS: Vendor[] = [
    { id: 'v1-uuid', name: 'Dialog', code: 'DLG' },
    { id: 'v2-uuid', name: 'SLT Mobitel', code: 'SLTM' },
    { id: 'v3-uuid', name: 'Airtel', code: 'ATL' },
    { id: 'v4-uuid', name: 'SLT Fibre', code: 'SLTF' },
];

export const MOCK_CURRENT_USER: Profile = {
    id: 'user1-uuid',
    email: 'hamdhan@example.com',
    role: 'customer',
    full_name: 'Hamdhan',
    phone_number: '0771234567',
};

export const MOCK_VENDOR_USER: Profile = {
    id: 'agent1-uuid',
    email: 'support@sltfibre.lk',
    role: 'vendor',
    full_name: 'SLT Fibre Support Team',
    phone_number: '0112345678',
};

export const MOCK_TICKETS: Ticket[] = [
    {
        id: 'ticket-1',
        ticket_no: 'NET-404',
        customer_id: 'user1-uuid',
        vendor_id: 'v4-uuid',
        vendor_name: 'SLT Fibre',
        status: 'Pending',
        issue_data: {
            vendor: 'SLT Fibre',
            connection_number: '011-2558900',
            issue_summary: 'Connectivity Loss',
            category: 'Network Issue'
        },
        internal_notes: 'Checking line status.',
        created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
    {
        id: 'ticket-2',
        ticket_no: 'NET-405',
        customer_id: 'user1-uuid',
        vendor_id: 'v1-uuid',
        vendor_name: 'Dialog',
        status: 'Processing',
        issue_data: {
            vendor: 'Dialog',
            connection_number: '0771234567',
            issue_summary: 'Slow Speed',
            category: 'Performance'
        },
        internal_notes: null,
        created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    },
    {
        id: 'ticket-3',
        ticket_no: 'NET-406',
        customer_id: 'user1-uuid',
        vendor_id: 'v2-uuid',
        vendor_name: 'SLT Mobitel',
        status: 'Addressed',
        issue_data: {
            vendor: 'SLT Mobitel',
            connection_number: '0711234567',
            issue_summary: 'Cannot make calls',
            category: 'Network Issue'
        },
        internal_notes: null,
        created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    },
];

export const MOCK_ADMIN_APPROVALS = [
    { id: 'appr-1', company: 'Hutch Telecommunications', status: 'Pending Verification', date: new Date().toISOString() },
    { id: 'appr-2', company: 'Lanka Bell', status: 'Pending Verification', date: new Date().toISOString() },
    { id: 'appr-3', company: 'FastNet Solutions', status: 'Pending Verification', date: new Date().toISOString() },
];


// --- MOCK API FUNCTIONS (To be replaced by actual fetch calls later) ---

export const fetchUserTickets = async (userId: string): Promise<Ticket[]> => {
    await delay(1000); 
    return MOCK_TICKETS; 
};

export const fetchVendorTickets = async (vendorId: string): Promise<Ticket[]> => {
    await delay(1000);
    return MOCK_TICKETS;
};

export const updateTicketStatus = async (ticketId: string, newStatus: string): Promise<Ticket> => {
    await delay(800);
    const ticket = MOCK_TICKETS.find(t => t.ticket_no === ticketId || t.id === ticketId);
    if (!ticket) throw new Error("Ticket not found");
    // In a real app, this updates the DB. Here we just return a mutated mock object.
    const allowed = ["Pending", "Processing", "Addressed", "Declined"] as const;
    const nextStatus = (allowed.includes(newStatus as (typeof allowed)[number])
      ? (newStatus as (typeof allowed)[number])
      : ticket.status);
    return { ...ticket, status: nextStatus };
};

// Simulate the AI Chatbot response
export const mockSendChatMessage = async (message: string, turnCount: number): Promise<ChatApiResponse> => {
    await delay(1500); 

    if (turnCount === 1) {
        return {
            reply: "I'm sorry to hear that. To help you faster, which service provider are you using?",
            is_complete: false,
            ticket_draft: null
        };
    } else if (turnCount === 2) {
        return {
            reply: "Could you please provide your connection telephone number?",
            is_complete: false,
            ticket_draft: null
        };
    } else if (turnCount === 3) {
        return {
            reply: "Thanks. Now, could you check your router and tell me if the 'LOS' light is blinking red?",
            is_complete: false,
            ticket_draft: null
        };
    } else if (turnCount === 4) {
        return {
            reply: "Got it. I will draft a ticket summary: \nSymptom: Total service outage\nHardware Indicator: LOS Blinking Red\nSuspected Fault: Physical Line Break.\nShall I proceed to create this ticket?",
            is_complete: false,
            ticket_draft: null
        };
    } else {
        return {
            reply: "Done! Ticket #NET-404 has been created successfully.",
            is_complete: true,
            ticket_draft: {
                vendor: "SLT Fibre",
                connection_number: "011-2558900",
                issue_summary: "Connectivity Loss via AI Diagnosis", 
                category: "Technical Support"
            }
        };
    }
};