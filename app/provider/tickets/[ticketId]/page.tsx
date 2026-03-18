import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import ManageTicketClient from "@/app/provider/tickets/[ticketId]/manage-ticket-client";
import { CircleUserRound } from "lucide-react";

export default async function ManageTicketPage({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { ticketId } = await params;

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar
        rightContent={
          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="ghost" className="rounded-sm">
              Shajjanthan
            </Button>
            <Button variant="outline" className="rounded-sm">
              <CircleUserRound className="size-4" />
            </Button>
          </div>
        }
      />

      <section className="mx-auto w-full max-w-7xl flex-1 px-6 py-10 lg:px-10">
        <p className="mb-6 text-sm text-muted-foreground">OneHelp | Provider Portal</p>
        <ManageTicketClient ticketId={ticketId} />
      </section>

      <Footer />
    </main>
  );
}

