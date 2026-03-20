"use client";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function SettingsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <section className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        <h1 className="text-xl font-semibold mb-6">Settings</h1>

        <div className="space-y-4">
          <input placeholder="Name" className="w-full border p-2 rounded" />
          <input placeholder="Email" className="w-full border p-2 rounded" />
          <input placeholder="Current Password" className="w-full border p-2 rounded" />
          <input placeholder="New Password" className="w-full border p-2 rounded" />
          <input placeholder="Confirm Password" className="w-full border p-2 rounded" />
        </div>
      </section>

      <Footer />
    </main>
  );
}