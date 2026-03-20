"use client";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
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
    subject: "[Critical] SLT Fibre - Loss of Signal (LOS) Detected",
    description:
      "Customer reported a complete loss of internet connectivity.",
    diagnostics: [
      "Total outage",
      "LOS blinking red",
      "Physical fault suspected",
    ],
    action: "Technician required",
    provider: "Dialog",
    status: "Pending",
    createdDate: "Jan 12, 2022",
  };

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <section className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <h2 className="mb-6 text-lg font-medium">
          Ticket Id : {ticket.id}
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2 rounded-lg border bg-white p-6 shadow-sm">
            <p><strong>Subject:</strong> {ticket.subject}</p>

            <p className="mt-4 font-medium">Issue Description:</p>
            <p>{ticket.description}</p>

            <ul className="mt-4 list-disc pl-5">
              {ticket.diagnostics.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>

            <p className="mt-4"><strong>Action Required:</strong> {ticket.action}</p>
          </div>

          <div className="flex flex-col justify-between">
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
                <p className="text-xs">Created date</p>
                <p>{ticket.createdDate}</p>
              </div>

              <div>
                <p className="text-xs">Status</p>
                <span className="bg-blue-100 px-2 py-1 rounded text-xs">
                  ● {ticket.status}
                </span>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button>Create</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}