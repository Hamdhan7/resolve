"use client";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function SettingsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <section className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        <h1 className="text-2xl font-semibold text-center mb-10">Settings</h1>

        <div className="space-y-6">
          <div>
            <label className="text-sm text-muted-foreground">Name</label>
            <input className="w-full border rounded-md p-2 mt-1" defaultValue="Oliva" />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Email address</label>
            <input className="w-full border rounded-md p-2 mt-1" defaultValue="shajanthan@gmail.com" />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Current password</label>
            <input type="password" className="w-full border rounded-md p-2 mt-1" />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">New password</label>
            <input type="password" className="w-full border rounded-md p-2 mt-1" />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Confirm new password</label>
            <input type="password" className="w-full border rounded-md p-2 mt-1" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}