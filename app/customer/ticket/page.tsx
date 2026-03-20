"use client";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function TicketDetailsPage() {
  const ticket = {
    id: "NET-404",
    subject: "SLT Fibre Issue",
    description: "Customer has no internet connection.",
    diagnostics: ["No signal detected", "Router LOS blinking"],
    action: "Technician required",
  };

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <section className="flex-1 p-6">
        <h2>Ticket Id: {ticket.id}</h2>

        <p><strong>Subject:</strong> {ticket.subject}</p>

        <p><strong>Description:</strong> {ticket.description}</p>

        <ul>
          {ticket.diagnostics.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>

        <p><strong>Action:</strong> {ticket.action}</p>
      </section>

      <Footer />
    </main>
  );
}