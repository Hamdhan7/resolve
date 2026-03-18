"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import CustomerAvatar from "@/components/customer/customer-avatar";
import StatusPill from "@/components/provider/status-pill";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SelectNative } from "@/components/ui/select-native";
import { getTicket, patchTicketAssignment, patchTicketNotes, patchTicketStatus } from "@/lib/api/client";
import type { Ticket } from "@/lib/models/ticket";
import type { TicketStatus } from "@/lib/models/common";

function formatTicketSubject(ticket: Ticket) {
  return `[${ticket.issue_data.vendor}] ${ticket.issue_data.issue_summary}`;
}

const TECHNICIANS = [
  { id: "unassigned", label: "Unassigned" },
  { id: "tech-1", label: "Technician A" },
  { id: "tech-2", label: "Technician B" },
  { id: "tech-3", label: "Technician C" },
] as const;

export default function ManageTicketClient({ ticketId }: { ticketId: string }) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [status, setStatus] = useState<TicketStatus>("Open");
  const [notes, setNotes] = useState("");
  const [savingStatus, setSavingStatus] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);
  const [assignment, setAssignment] = useState<(typeof TECHNICIANS)[number]["id"]>("unassigned");
  const [savingAssignment, setSavingAssignment] = useState(false);

  useEffect(() => {
    let mounted = true;
    getTicket(ticketId)
      .then((data) => {
        if (!mounted) return;
        setTicket(data);
        setStatus(data.status);
        setNotes(data.internal_notes ?? "");
        setAssignment((data.assigned_technician_id as typeof assignment) ?? "unassigned");
      })
      .catch(() => {
        if (mounted) setTicket(null);
      });
    return () => {
      mounted = false;
    };
  }, [ticketId]);

  const customerInfo = useMemo(() => {
    return {
      name: ticket?.customer_name ?? "Customer",
      tier: "Premium User",
      contact: ticket?.customer_phone ?? "—",
      connectionId: ticket?.issue_data.connection_number ?? "—",
      location: ticket?.customer_location ?? "—",
    };
  }, [ticket?.customer_location, ticket?.customer_name, ticket?.customer_phone, ticket?.issue_data.connection_number]);

  async function onSaveStatus(nextStatus: TicketStatus) {
    if (!ticket) return;
    setSavingStatus(true);
    try {
      const updated = await patchTicketStatus(ticket.id, { status: nextStatus });
      setTicket(updated);
      setStatus(updated.status);
    } finally {
      setSavingStatus(false);
    }
  }

  async function onAddNote() {
    if (!ticket) return;
    setSavingNotes(true);
    try {
      const updated = await patchTicketNotes(ticket.id, { internal_notes: notes });
      setTicket(updated);
      setNotes(updated.internal_notes ?? "");
    } finally {
      setSavingNotes(false);
    }
  }

  async function onUpdateAssignment() {
    if (!ticket) return;
    const selected = TECHNICIANS.find((t) => t.id === assignment);
    if (!selected) return;

    setSavingAssignment(true);
    try {
      const updated = await patchTicketAssignment(ticket.id, {
        assigned_technician_id: selected.id,
        assigned_technician_name: selected.label,
      });
      setTicket(updated);
      setAssignment((updated.assigned_technician_id as typeof assignment) ?? "unassigned");
    } finally {
      setSavingAssignment(false);
    }
  }

  if (!ticket) {
    return (
      <div className="rounded-3xl border border-border/60 bg-card p-8">
        <p className="text-sm text-muted-foreground">Ticket not found.</p>
        <Button asChild variant="link" className="px-0">
          <Link href="/provider/dashboard">
            <ChevronLeft className="size-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <Button asChild variant="link" className="px-0 text-muted-foreground">
            <Link href="/provider/dashboard">
              <ChevronLeft className="size-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">
            Manage Ticket <span className="text-muted-foreground">#{ticket.ticket_no}</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <StatusPill status={ticket.status} />
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-card px-4 py-3">
            <span className="text-sm text-muted-foreground">Current Status</span>
            <SelectNative
              value={status}
              onChange={(e) => {
                const next = e.target.value as TicketStatus;
                setStatus(next);
                void onSaveStatus(next);
              }}
              className="h-9 w-[160px] rounded-xl"
              disabled={savingStatus}
            >
              <option value="Open">Pending</option>
              <option value="In Progress">Processing</option>
              <option value="Resolved">Resolved</option>
            </SelectNative>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.65fr_1fr]">
        <div className="space-y-6">
          <Card className="rounded-3xl shadow-none">
            <CardHeader>
              <h2 className="text-sm font-semibold tracking-wide text-muted-foreground">Issue Details</h2>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-muted-foreground">SUBJECT</p>
                <p className="text-sm font-semibold">{formatTicketSubject(ticket)}</p>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-muted-foreground">DESCRIPTION</p>
                <p className="text-sm text-muted-foreground">
                  Customer reported an issue for connection <span className="font-medium">{ticket.issue_data.connection_number}</span>.
                  The issue summary is <span className="font-medium">{ticket.issue_data.issue_summary}</span>.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-xs font-semibold text-blue-700">AI DIAGNOSTICS</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-blue-800/90">
                  <li>Symptom: {ticket.issue_data.issue_summary}</li>
                  <li>Category: {ticket.issue_data.category}</li>
                  <li>Suspected fault: Physical line break / configuration issue</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-none">
            <CardHeader>
              <h2 className="text-sm font-semibold tracking-wide text-muted-foreground">Internal Notes</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes for the technical team..."
                className="min-h-28 w-full resize-none rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30"
              />
              <div className="flex justify-end">
                <Button className="rounded-lg" onClick={() => void onAddNote()} disabled={savingNotes}>
                  {savingNotes ? "Saving..." : "Add Note"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-3xl shadow-none">
            <CardHeader>
              <h2 className="text-sm font-semibold tracking-wide text-muted-foreground">Customer Info</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <CustomerAvatar name={customerInfo.name} />
                <div>
                  <p className="text-sm font-semibold">{customerInfo.name}</p>
                  <p className="text-xs text-muted-foreground">{customerInfo.tier}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Contact</span>
                  <span className="font-medium">{customerInfo.contact}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Connection ID</span>
                  <span className="font-medium">{customerInfo.connectionId}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{customerInfo.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-none">
            <CardHeader>
              <h2 className="text-sm font-semibold tracking-wide text-muted-foreground">Assignment</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">Assigned Technician</p>
              <SelectNative
                value={assignment}
                onChange={(e) => setAssignment(e.target.value as typeof assignment)}
                className="rounded-2xl"
                disabled={savingAssignment}
              >
                {TECHNICIANS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </SelectNative>
              <Button className="w-full rounded-lg" onClick={() => void onUpdateAssignment()} disabled={savingAssignment}>
                {savingAssignment ? "Updating..." : "Update Assignment"}
              </Button>
              <p className="text-xs text-muted-foreground">
                Currently assigned:{" "}
                <span className="font-medium text-foreground">
                  {ticket.assigned_technician_name ?? "Unassigned"}
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-none">
            <CardHeader>
              <h2 className="text-sm font-semibold tracking-wide text-muted-foreground">Ticket Meta</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Vendor</p>
                <Input value={ticket.issue_data.vendor} readOnly className="rounded-2xl" />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Category</p>
                <Input value={ticket.issue_data.category} readOnly className="rounded-2xl" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

