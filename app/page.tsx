import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  LayoutDashboard,
  MessageSquareText,
  PhoneCall,
  Ticket,
  Wifi,
} from "lucide-react";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "Multilingual AI",
    description:
      "Speak comfortably in Sinhala, Tamil, or English. Our AI understands local nuances and technical terms perfectly.",
    icon: MessageSquareText,
  },
  {
    title: "Instant Ticketing",
    description:
      "Skip the IVR menus. We generate a formal support ticket instantly and route it directly to the correct provider dashboard.",
    icon: Ticket,
  },
  {
    title: "Unified Dashboard",
    description:
      "Track your Fiber, 4G, and TV complaints from different providers in one secure, consolidated view.",
    icon: LayoutDashboard,
  },
] as const;

const providers = [
  { name: "HUTCH", className: "text-orange-500" },
  { name: "Dialog", className: "text-red-500" },
  { name: "airtel", className: "text-red-500 italic font-normal" },
  { name: "SLTMOBITEL", className: "text-blue-700" },
] as const;

const orbitNodeClasses = [
  "left-1/2 top-0 -translate-x-1/2",
  "right-8 top-8",
  "right-0 top-1/2 -translate-y-1/2",
  "right-8 bottom-8",
  "bottom-0 left-1/2 -translate-x-1/2",
  "bottom-8 left-8",
  "left-0 top-1/2 -translate-y-1/2",
  "left-8 top-8",
] as const;

const figurePalette = [
  { head: "bg-orange-200", body: "bg-emerald-600" },
  { head: "bg-orange-300", body: "bg-orange-500" },
  { head: "bg-orange-300", body: "bg-orange-500" },
  { head: "bg-stone-400", body: "bg-emerald-600" },
] as const;

const rightContent = () => {
  return (
    <>
      <Button asChild variant="ghost" className="rounded-sm hidden sm:inline-flex">
        <Link href="/provider/dashboard" className="text-[#667085]">
          Provider Portal
        </Link>
      </Button>
      <Button asChild variant="ghost" className="rounded-sm">
        <Link href="/sign-in" className="text-[#667085] ">
          Log in
        </Link>
      </Button>
      <Button asChild className="rounded-sm px-5 text-white bg-[#122841]">
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-foreground">
      <Navbar rightContent={rightContent()} />

      <section className="border-b border-border/60 bg-white">
        <div className="mx-auto max-w-7xl px-6 pt-16 lg:px-10 lg:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.1]">
              No More Waiting on Hold.
              <br />
              One Solution for Everything.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Report internet issues, billing disputes, and signal drops for
              Dialog, SLT, Mobitel, and Hutch instantly using our multilingual
              AI assistant.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="min-w-56 rounded-sm hover:text-white"
              >
                <Link href="/customer/view">Check Existing Ticket</Link>
              </Button>
              <Button asChild size="lg" className="min-w-56 rounded-sm ">
                <Link href="/customer">
                  Start Complaint Assistant
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-14 overflow-hidden rounded-t-[2.5rem] border border-border/50 shadow-2xl shadow-primary/10 dark:border-white/10">
            <div className="relative px-4 pt-10 pb-8 sm:px-8 lg:px-12 flex justify-center">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-56" />

              <div className="relative z-10 w-full max-w-5xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden bg-white/5 backdrop-blur-sm">
                <img
                  src="/hero-image.png"
                  alt="OneHelp Dashboard"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="rounded-[2rem] border-border/60 transition-transform duration-200 hover:-translate-y-1"
                >
                  <CardHeader className="items-center text-center">
                    <div className="mb-2 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="size-7" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-sm leading-7">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="mx-full max-w-full px-6 text-center lg:px-10">
          <p className="mb-10 text-lg text-muted-foreground">Compatible with</p>
          <div className="flex flex-wrap items-center justify-center gap-5 lg:gap-8">
            {providers.map((provider) => (
              <div
                key={provider.name}
                className="px-5 py-4"
              >
                <span
                  className={`text-2xl font-extrabold tracking-wide ${provider.className}`}
                >
                  {provider.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
