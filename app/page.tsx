import Link from "next/link";
import {
  ArrowRight,
  Bot,
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
    icon: Globe2,
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

const supportPoints = [
  { label: "Internet issues", icon: Wifi },
  { label: "Billing disputes", icon: MessageSquareText },
  { label: "Signal drops", icon: PhoneCall },
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

type NavbarProps = {
  rightContent?: React.ReactNode;
};

const rightContent = () => {
  return (
    <>
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
    <main className="min-h-screen bg-background text-foreground">
      <Navbar rightContent={rightContent()} />

      <section className="border-b border-border/60 bg-[linear-gradient(180deg,rgba(248,249,250,0.76)_0%,rgba(240,244,255,0.9)_100%)] dark:bg-[linear-gradient(180deg,rgba(35,40,60,0.72)_0%,rgba(26,35,64,0.96)_100%)]">
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
                <Link href="/sign-in">Check Existing Ticket</Link>
              </Button>
              <Button asChild size="lg" className="min-w-56 rounded-sm ">
                <Link href="/sign-up">
                  Start Complaint Assistant
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-14 overflow-hidden rounded-t-[2.5rem] border border-border/50 bg-[linear-gradient(180deg,#f0f4ff_0%,#1a2340_65%)] shadow-2xl shadow-primary/10 dark:border-white/10">
            <div className="relative min-h-[460px] px-4 pt-10 sm:px-8 lg:px-12">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.45),transparent_60%)]" />

              <div className="absolute left-4 top-24 hidden w-40 space-y-4 xl:block">
                <div className="rounded-2xl border border-white/60 bg-white/90 p-4 shadow-lg">
                  <div className="space-y-2">
                    <div className="h-2.5 w-24 rounded-full bg-slate-200" />
                    <div className="h-2.5 w-16 rounded-full bg-slate-200" />
                    <div className="h-2.5 w-20 rounded-full bg-slate-200" />
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-200/70 bg-white/90 p-4 shadow-lg">
                  <CheckCircle2 className="size-9 rounded-full bg-emerald-500 p-2 text-white" />
                  <div className="space-y-2">
                    <div className="h-2.5 w-16 rounded-full bg-slate-200" />
                    <div className="h-2.5 w-10 rounded-full bg-slate-200" />
                  </div>
                </div>
              </div>

              <div className="absolute right-4 top-20 hidden w-52 space-y-4 xl:block">
                <div className="rounded-2xl border border-white/60 bg-white/90 p-4 shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 size-10 rounded-full bg-slate-100" />
                      <div className="flex-1 space-y-2">
                        <div className="h-2.5 w-24 rounded-full bg-slate-200" />
                        <div className="h-2.5 w-16 rounded-full bg-slate-200" />
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 size-10 rounded-full bg-slate-100" />
                      <div className="flex-1 space-y-2">
                        <div className="h-2.5 w-24 rounded-full bg-slate-200" />
                        <div className="h-2.5 w-14 rounded-full bg-slate-200" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/60 bg-white/90 p-4 shadow-lg">
                  <div className="space-y-2">
                    <div className="h-2.5 w-24 rounded-full bg-slate-200" />
                    <div className="h-2.5 w-16 rounded-full bg-slate-200" />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <div className="size-2.5 rounded-full bg-slate-300" />
                    <div className="size-2.5 rounded-full bg-slate-300" />
                    <div className="size-2.5 rounded-full bg-slate-300" />
                  </div>
                </div>
              </div>

              <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center pb-10">
                <div className="relative flex w-full max-w-3xl items-end justify-center pb-8 pt-2">
                  <div className="absolute top-0 z-20 rounded-2xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-white" />
                      <span className="size-2 rounded-full bg-white" />
                      <span className="size-2 rounded-full bg-white" />
                    </div>
                  </div>

                  <div className="absolute top-12 z-20 flex h-28 w-24 items-start justify-center rounded-t-[3rem] bg-sky-200">
                    <div className="absolute -top-10 size-16 rounded-full bg-orange-200">
                      <div className="absolute left-2 top-0 h-6 w-12 rounded-b-2xl rounded-t-full bg-amber-950" />
                    </div>
                    <div className="absolute top-10 h-14 w-16 rounded-md bg-blue-500" />
                    <div className="absolute -left-4 top-12 h-3 w-10 rotate-[-20deg] rounded-full bg-orange-200" />
                    <div className="absolute -right-3 top-14 h-3 w-8 rotate-[35deg] rounded-full bg-sky-200" />
                  </div>

                  <div className="relative mt-28 w-full rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/20 sm:p-6">
                    <div className="mx-auto flex max-w-md items-center justify-center">
                      <div className="relative flex aspect-square w-44 items-center justify-center rounded-full bg-blue-900 text-white sm:w-52">
                        <span className="text-lg font-bold">OneHelp</span>
                        {orbitNodeClasses.map((nodeClass) => (
                          <div
                            key={nodeClass}
                            className={`absolute ${nodeClass} flex size-7 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm`}
                          >
                            <div className="size-2 rounded-full bg-blue-300" />
                            <div className="absolute inset-1/2 h-px w-14 origin-left bg-slate-200 first:hidden" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-2 left-1/2 h-4 w-[68%] -translate-x-1/2 rounded-full bg-slate-300" />
                  <div className="absolute -bottom-5 left-1/2 h-2.5 w-40 -translate-x-1/2 rounded-full bg-slate-400" />
                </div>

                <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
                  {figurePalette.map((person, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-end gap-2"
                    >
                      <div className={`size-10 rounded-full ${person.head}`} />
                      <div
                        className={`h-14 w-10 rounded-t-full ${person.body}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
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

      <section className="border-t border-border/60 bg-background py-8">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
          <p className="mb-10 text-lg text-muted-foreground">Compatible with</p>
          <div className="flex flex-wrap items-center justify-center gap-5 lg:gap-8">
            {providers.map((provider) => (
              <div
                key={provider.name}
                className="rounded-2xl border border-border/60 bg-card px-5 py-4 shadow-sm"
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

      <section className="bg-background py-10">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 lg:grid-cols-3 lg:px-10">
          {supportPoints.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.label}
                className="rounded-[1.75rem] border-border/60 bg-primary/5 shadow-none"
              >
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <p className="font-semibold">{item.label}</p>
                    <p className="text-sm text-muted-foreground">
                      Handled instantly by OneHelp AI.
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
