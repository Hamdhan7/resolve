import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import ProviderDashboardClient from "@/app/provider/dashboard/provider-dashboard-client";
import { CircleUserRound, LogOut } from "lucide-react";
import Link from "next/link";

export default function ProviderDashboardPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar
        rightContent={
          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="ghost" className="rounded-sm text-slate-700 font-medium hidden sm:flex">
              <CircleUserRound className="size-4 mr-2" />
              Shajjanthan
            </Button>
            <Button asChild variant="outline" className="rounded-sm text-slate-500 hover:text-red-600 transition-colors">
              <Link href="/" title="Log out">
                <LogOut className="size-4" />
              </Link>
            </Button>
          </div>
        }
      />

      <section className="mx-auto w-full max-w-7xl flex-1 px-6 py-10 lg:px-10">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">OneHelp | Provider Portal</p>
        </div>
        <ProviderDashboardClient />
      </section>

      <Footer />
    </main>
  );
}

