"use client";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function TicketDetailsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <section className="flex-1 p-6">
        <h1>Ticket Details</h1>
      </section>

      <Footer />
    </main>
  );
}