import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Smartphone,
  Zap,
  BarChart3,
  Users,
  Shield,
  LayoutDashboard,
  MessageSquareText,
  Ticket
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
    title: "Unified Inbox",
    description: "All your customer conversations from email, chat, social media, and more — in one organized view.",
    icon: Mail,
  },
  {
    title: "Multi-Channel Support",
    description: "Connect with customers wherever they are. Email, live chat, WhatsApp, Twitter, and Instagram — unified.",
    icon: Smartphone,
  },
  {
    title: "AI-Powered Responses",
    description: "Smart suggestions and automated replies help your team respond faster without losing the human touch.",
    icon: Zap,
  },
  {
    title: "Actionable Analytics",
    description: "Track response times, customer satisfaction, and team performance with real-time dashboards.",
    icon: BarChart3,
  },
  {
    title: "Team Collaboration",
    description: "Internal notes, @mentions, and seamless handoffs make teamwork effortless.",
    icon: Users,
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade encryption, SSO, and compliance features keep your customer data safe.",
    icon: Shield,
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

      <section className="relative overflow-hidden border-b border-border/60 bg-white">
        {/* Dotted Background Pattern */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.3]" 
          style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 lg:px-10 lg:pt-20">
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
              <Button asChild size="lg" className="min-w-56 rounded-sm bg-[#122841] text-white hover:bg-[#0d1d2f]">
                <Link href="/customer">
                  Start Complaint Assistant
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-14 flex justify-center w-full px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 w-full max-w-6xl xl:max-w-7xl drop-shadow-2xl">
              <img
                src="/hero-image.png"
                alt="OneHelp Dashboard"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a1526] py-20 text-white sm:py-28">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-cyan-600/20 blur-[100px]"></div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <div className="mb-6 inline-flex uppercase tracking-wider items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300 backdrop-blur-md">
            Available Now
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl text-white">
            Transform Your Support Flow
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100/70">
            Join the forward-thinking teams that are delivering exceptional experiences. Consolidate your communication and let intelligent AI automate your most frequent requests. 
          </p>
          
          <div className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-6">
             <div className="flex flex-col items-center justify-center bg-white/5 backdrop-blur-md rounded-2xl p-6 min-w-[160px] sm:min-w-[200px] border border-white/10 shadow-2xl">
               <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">&lt; 2m</span>
               <span className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium tracking-wide text-blue-200/80 uppercase">Avg Response Time</span>
             </div>
             <div className="flex flex-col items-center justify-center bg-white/5 backdrop-blur-md rounded-2xl p-6 min-w-[160px] sm:min-w-[200px] border border-white/10 shadow-2xl">
               <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">24/7</span>
               <span className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium tracking-wide text-blue-200/80 uppercase">AI Availability</span>
             </div>
             <div className="flex flex-col items-center justify-center bg-white/5 backdrop-blur-md rounded-2xl p-6 min-w-[160px] sm:min-w-[200px] border border-white/10 shadow-2xl">
               <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">100%</span>
               <span className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium tracking-wide text-blue-200/80 uppercase">Automated Routing</span>
             </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center mb-16 lg:mb-20">
            <h2 className="text-sm font-bold tracking-widest uppercase leading-7 text-blue-600">Powerful Capabilities</h2>
            <p className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Everything You Need to Delight Customers
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Powerful features designed to streamline your support workflow and create exceptional customer experiences across all your channels.
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="rounded-[2rem] border-slate-100 bg-white transition-all duration-300 hover:-translate-y-2 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-900/5 overflow-hidden group"
                >
                  <CardHeader>
                    <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="size-7" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed text-slate-600">
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
