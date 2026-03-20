"use client";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TicketDetailsPage() {
  const ticket = {
    id: "NET-404",
    subject: "SLT Fibre Issue",
    description: "Customer has no internet connection.",
    diagnostics: ["No signal detected", "Router LOS blinking"],
    action: "Technician required",
    provider: "Dialog",
    status: "Pending",
    createdDate: "Jan 12, 2022",
  };

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <section className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <h2 className="mb-6 text-lg font-medium">
          Ticket Id: {ticket.id}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 rounded-lg border p-6 shadow-sm bg-white">
            <p><strong>Subject:</strong> {ticket.subject}</p>

            <p className="mt-4"><strong>Description:</strong></p>
            <p>{ticket.description}</p>

            <ul className="mt-4 list-disc pl-5">
              {ticket.diagnostics.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>

            <p className="mt-4"><strong>Action:</strong> {ticket.action}</p>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs mb-2">Provider</p>
              <Select defaultValue={ticket.provider}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dialog">Dialog</SelectItem>
                  <SelectItem value="SLT">SLT</SelectItem>
                  <SelectItem value="Hutch">Hutch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <p className="text-xs">Status</p>
              <span>{ticket.status}</span>
            </div>

            <div>
              <p className="text-xs">Created Date</p>
              <p>{ticket.createdDate}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}