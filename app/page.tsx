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
  Ticket,
  Bot
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

const rightContent = () => {
  return (
    <>
      <Button asChild variant="ghost" className="rounded-sm hidden sm:inline-flex">
        <Link href="/provider/dashboard" className="text-[#667085] font-semibold hover:text-slate-900">
          Provider Portal
        </Link>
      </Button>
      <Button asChild variant="ghost" className="rounded-sm">
        <Link href="/sign-in" className="text-[#667085] font-semibold hover:text-slate-900">
          Log in
        </Link>
      </Button>
      <Button asChild className="rounded-sm px-5 text-white bg-blue-600 hover:bg-blue-700 shadow-md">
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafcff] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar rightContent={rightContent()} />

      <section className="relative overflow-hidden pt-20 pb-20 border-b border-border/40">
        {/* Subtle Gradient Background */}
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-400/10 blur-[120px] -z-10 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute top-40 left-0 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[100px] -z-10 mix-blend-multiply pointer-events-none"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 text-center flex flex-col items-center">
          
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-balance text-5xl font-extrabold tracking-tight sm:text-6xl xl:text-[4.2rem] xl:leading-[1.05] text-slate-900">
              No More Waiting on Hold.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                One Solution for Everything.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Report internet issues, billing disputes, and signal drops for Dialog, SLT, Mobitel, and Hutch instantly using our highly reliable support assistant.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="min-w-56 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/20 px-8 py-6 text-[15px] font-semibold transition-transform hover:scale-105">
                <Link href="/customer">
                  Start Complaint Assistant
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-w-56 rounded-full border-slate-200 text-slate-700 shadow-sm hover:border-slate-300 hover:bg-white px-8 py-6 text-[15px] font-semibold transition-all">
                <Link href="/customer/view">Check Existing Ticket</Link>
              </Button>
            </div>
          </div>

          <div className="mt-16 w-full max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-4 bg-white/40 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
               {/* Simulated Chat Interface */}
               <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-2xl flex flex-col min-h-[400px]">
                  <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <Bot className="size-5" />
                       </div>
                       <div>
                          <div className="font-semibold text-[15px] text-slate-800 tracking-tight">Resolv Assistant</div>
                          <div className="text-[12px] text-green-600 font-medium flex items-center gap-1.5">
                             <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"></span>
                             Online
                          </div>
                       </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-6 flex flex-col gap-5 bg-slate-50/20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                     {/* Chat Bubble AI */}
                     <div className="flex w-full items-end gap-2 pr-12">
                       <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mb-1">
                          <Bot className="size-4" />
                       </div>
                       <div className="bg-white border border-slate-100 shadow-sm p-4 rounded-2xl rounded-bl-sm text-[14.5px] text-slate-700 leading-relaxed font-medium">
                         Hi Hamdhan! I'm sorry to hear you're experiencing connectivity loss. Are the lights on your router blinking red?
                       </div>
                     </div>
                     {/* Chat Bubble User */}
                     <div className="flex w-full items-end gap-2 justify-end pl-12 mt-2">
                       <div className="bg-blue-600 text-white shadow-md p-4 rounded-2xl rounded-br-sm text-[14.5px] leading-relaxed font-medium">
                         Yes, the LOS light is blinking red on my SLT Fibre router.
                       </div>
                     </div>
                     {/* Chat Bubble AI Action */}
                     <div className="flex w-full items-end gap-2 pr-12 mt-2">
                       <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mb-1">
                          <Bot className="size-4" />
                       </div>
                       <div className="bg-white border border-slate-100 shadow-sm p-4 rounded-2xl rounded-bl-sm text-[14.5px] text-slate-700 leading-relaxed font-medium">
                         Understood. I have drafted a ticket for <strong className="text-slate-900 font-bold">SLT Fibre</strong> regarding a physical line fault. A local technician is being alerted.
                         
                         <div className="mt-4 p-4 border border-blue-100 bg-blue-50/50 rounded-xl space-y-2">
                            <div className="flex justify-between items-center"><span className="text-sm font-semibold text-slate-500">Ticket ID</span><span className="text-sm font-bold text-blue-700">NET-404</span></div>
                            <div className="flex justify-between items-center"><span className="text-sm font-semibold text-slate-500">Status</span><span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-700">Processing</span></div>
                         </div>
                       </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Brands Section moved directly beneath Hero for immediate Trust Building */}
      <section className="bg-white py-10 border-b border-slate-100">
        <div className="mx-full max-w-full px-6 text-center lg:px-10">
          <p className="mb-6 text-sm font-semibold tracking-wider text-slate-400 uppercase">Trusted Provider Integrations</p>
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-14 opacity-80 grayscale transition hover:grayscale-0">
            {providers.map((provider) => (
              <div
                key={provider.name}
                className="px-2"
              >
                <span
                  className={`text-2xl font-extrabold tracking-tight ${provider.className}`}
                >
                  {provider.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Light-Theme Optimized "Transform Your Support Flow" Section */}
      <section className="py-24 sm:py-32 bg-slate-50 overflow-hidden relative">
         <div className="mx-auto max-w-7xl px-6 lg:px-10 relative">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-sm font-bold tracking-widest uppercase leading-7 text-blue-600 mb-2">Automated Resolutions</h2>
              <p className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Transform Your Support Flow
              </p>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Join the forward-thinking teams delivering exceptional experiences. Consolidate your communication and let intelligent systems automate your most frequent requests.
              </p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-center text-center group">
                 <span className="text-6xl font-extrabold text-blue-600 tracking-tighter group-hover:scale-105 transition-transform">&lt; 2m</span>
                 <span className="mt-4 text-sm font-bold tracking-widest text-slate-400 uppercase">Avg Response Time</span>
               </div>
               <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-center text-center group">
                 <span className="text-6xl font-extrabold text-blue-600 tracking-tighter group-hover:scale-105 transition-transform">24/7</span>
                 <span className="mt-4 text-sm font-bold tracking-widest text-slate-400 uppercase">AI Availability</span>
               </div>
               <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-center text-center group">
                 <span className="text-6xl font-extrabold text-blue-600 tracking-tighter group-hover:scale-105 transition-transform">100%</span>
                 <span className="mt-4 text-sm font-bold tracking-widest text-slate-400 uppercase">Automated Routing</span>
               </div>
            </div>
         </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center mb-16 lg:mb-20">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Everything You Need to Delight Customers
            </h2>
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
                    <CardTitle className="text-xl font-extrabold text-slate-900 tracking-tight">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[15px] leading-relaxed text-slate-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="mt-20 text-center">
             <Button asChild size="lg" className="rounded-full bg-slate-900 text-white hover:bg-slate-800 px-10 py-6 text-base font-semibold shadow-xl hover:scale-105 transition-transform">
                <Link href="/sign-up">Start for free today</Link>
             </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
