"use client";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function TicketDetailsPage() {
  const ticket = {
    id: "NET-404",
    subject: "[Critical] SLT Fibre - Loss of Signal (LOS) Detected",
    description:
      "Customer reported a complete loss of internet connectivity on SLT Fibre connection 011-2558900.",
    diagnostics: [
      "Symptom: Total service outage.",
      "Hardware Status: Customer confirmed the 'LOS' (Loss of Signal) indicator on the router is blinking red.",
      "AI Diagnosis: Physical line fault suspected.",
    ],
    action:
      "Field technician dispatch required to inspect fiber patch cord and drop wire for physical damage or breaks.",
    provider: "Dialog",
    createdDate: "Jan 12, 2022",
    status: "Pending",
  };

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <section className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        {/* Back */}
        <div className="mb-4 text-sm text-muted-foreground cursor-pointer">
          ← New Tickets
        </div>

        {/* Ticket ID */}
        <h2 className="mb-6 text-sm font-medium text-muted-foreground">
          Ticket Id : {ticket.id}
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* LEFT CARD */}
          <div className="md:col-span-2 rounded-lg border bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm">
              <span className="font-medium">Subject:</span>{" "}
              {ticket.subject}
            </p>

            <p className="mb-2 text-sm font-medium">Issue Description:</p>
            <p className="mb-4 text-sm text-muted-foreground">
              {ticket.description}
            </p>

            <p className="mb-2 text-sm font-medium">
              Diagnostics Performed:
            </p>
            <ul className="mb-4 list-disc pl-5 text-sm text-muted-foreground space-y-1">
              {ticket.diagnostics.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                Action Required:
              </span>{" "}
              {ticket.action}
            </p>
          </div>

          {/* RIGHT PANEL */}
          <div className="space-y-6">
            <div>
              <p className="text-xs text-muted-foreground">Provider</p>
              <p className="text-sm font-medium">{ticket.provider}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Created date</p>
              <p className="text-sm font-medium">
                {ticket.createdDate}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                {ticket.status}
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}