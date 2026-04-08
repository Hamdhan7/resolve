"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Mic, Send, ChevronLeft, ImagePlus, CircleUserRound, LogOut } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import { mockSendChatMessage } from "@/lib/mock-api";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  time: string;
  isTicketDraft?: boolean;
  ticketData?: any;
  ticketConfirmed?: boolean;
}

export default function CustomerPage() {
        const [mode, setMode] = useState<"assistant" | "manual" | "review">("assistant");
    const [draftTicket, setDraftTicket] = useState<any>(null);
    const [draftMessageId, setDraftMessageId] = useState<string>("");
    const [manualForm, setManualForm] = useState({
        vendor: "",
        connection_number: "",
        category: "",
        status: "normal",
        description: ""
    });
    
    // Chat State
    const [sessionId, setSessionId] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [turnCount, setTurnCount] = useState(1);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial load
    useEffect(() => {
        setSessionId(Math.random().toString(36).substring(2, 10));
        setMessages([
            {
                id: "initial",
                role: "assistant",
                text: "Hi! I am the Resolv.lk Assistant. Please tell me about the issue you are facing today, so I can help route it to the correct provider.",
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            }
        ]);
    }, [mode]); 

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;
        const userMsg = input.trim();
        setInput("");
        
        const newMessage: Message = { id: Date.now().toString(), role: "user", text: userMsg, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
        setMessages(prev => [...prev, newMessage]);
        setIsLoading(true);
        
        try {
            const data = await mockSendChatMessage(userMsg, turnCount);
            setTurnCount(prev => prev + 1);
            
            const assistantMsg: Message = {
               id: Date.now().toString() + "_ai",
               role: "assistant", 
               text: data.reply || "I understand. Let me help you with that.",
               time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
               isTicketDraft: data.is_complete,
               ticketData: data.ticket_draft
            };
            setMessages(prev => [...prev, assistantMsg]);

        } catch (err) {
            console.error("Chat API Error:", err);
            // Mock response behavior if backend is unavailable testing-wise
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: Date.now().toString() + "_error_mock",
                    role: "assistant", 
                    text: "[Error] Mock data failed.",
                    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                }]);
                setIsLoading(false);
            }, 800);
            return;
        } finally {
            setIsLoading(false);
        }
    };

    const confirmTicket = async (ticketData: any, messageId: string) => {
        setIsLoading(true);
        const verifyMsg: Message = { id: Date.now().toString(), role: "user", text: "Yes, please create it.", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
        setMessages(prev => [...prev.map(m => m.id === messageId ? { ...m, ticketConfirmed: true } : m), verifyMsg]);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setMessages(prev => [...prev, {
                id: Date.now().toString() + "_conf",
                role: "assistant", 
                text: `Done! Ticket #NET-404 has been created successfully. A technical team has been alerted.`,
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            }]);

        } catch (err) {
             console.error("Ticket API Error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const rightContentNode = (
      <div className="flex items-center gap-2 sm:gap-3">
        <Button variant="ghost" className="rounded-sm text-slate-700 font-medium hidden sm:flex">
          <CircleUserRound className="size-4 mr-2" />
          Nadeesha Perera
        </Button>
        <Button asChild variant="outline" className="rounded-sm text-slate-500 hover:text-red-600 transition-colors">
          <Link href="/" title="Log out">
            <LogOut className="size-4" />
          </Link>
        </Button>
      </div>
    );

    return (
        <div className="flex flex-col h-screen bg-slate-50/20 font-sans text-slate-900">
           {/* Header */}
           <Navbar rightContent={rightContentNode}/>   
           <main className="flex-1 flex flex-col px-4 pb-8 w-full max-w-[1050px] mx-auto min-h-0">
               
               {/* Controls Bar */}
               {mode !== "review" && (
               <div className="flex items-center justify-between w-full mb-6 mt-4 shrink-0 px-2 lg:px-0">
                   <div className="flex-1 flex items-center">
                       {mode === "manual" && (
                           <button onClick={() => setMode("assistant")} className="flex items-center text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors">
                               <ChevronLeft className="h-4 w-4 mr-1" /> Create Manual Ticket
                           </button>
                       )}
                   </div>
                   
                   <div className="flex items-center bg-white border border-slate-200 p-1 rounded-lg shadow-sm">
                       <button 
                           onClick={() => setMode("assistant")}
                           className={`px-6 py-1.5 text-sm font-medium rounded-md shadow-sm transition-colors ${mode === "assistant" ? "bg-[#1a202c] text-white" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}`}
                       >
                           Assistant
                       </button>
                       <button 
                           onClick={() => setMode("manual")}
                           className={`px-6 py-1.5 text-sm font-medium rounded-md shadow-sm transition-colors ${mode === "manual" ? "bg-[#1a202c] text-white" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}`}
                       >
                           Manual
                       </button>
                   </div>

                   <div className="flex-1 flex justify-end">
                       <Button asChild variant="outline" className="text-sm font-medium border-slate-200 text-slate-700 shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-lg h-9">
                           <Link href="/customer/view">View my tickets</Link>
                       </Button>
                   </div>
               </div>
               )}

               {/* Conditional Content */}
               {mode === "assistant" ? (
                   // --- Chat Interface ---
                   <div className="w-full flex-1 bg-white border border-blue-200/70 rounded-2xl overflow-hidden flex flex-col min-h-0 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
                       {/* Messages Area */}
                       <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8 scroll-smooth bg-[#fafcff]">
                           {messages.map((msg) => (
                               <div key={msg.id} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                                   <div className={`flex items-center justify-between mb-1.5 w-full max-w-[460px] ${msg.role === "user" ? "pl-4" : ""}`}>
                                       <span className="text-[11px] font-semibold text-slate-500">{msg.role === "user" ? "You" : "Resolv.lk Assistant"}</span>
                                       <span className="text-[10px] text-slate-400 font-medium">{msg.time}</span>
                                   </div>
                                   <div className={`text-[14.5px] p-4 rounded-2xl max-w-[460px] leading-relaxed shadow-sm w-fit ${
                                           msg.role === "user" 
                                           ? "bg-[#454550] text-white rounded-tr-sm" 
                                           : "bg-white border border-slate-100 text-[#334155] rounded-tl-sm shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                                       }`}>
                                       {msg.text && <div className="mb-2 whitespace-pre-wrap">{msg.text}</div>}
                                       
                                       {/* Ticket Draft Rendering */}
                                       {msg.isTicketDraft && msg.ticketData && (
                                           <div className="mt-4 bg-slate-50 p-4 rounded-xl border border-slate-100/80">
                                               <div className="space-y-3 mb-5 text-[14px]">
                                                   <div className="flex"><span className="font-semibold w-[100px] text-slate-800">Provider:</span> <span className="text-slate-700">{msg.ticketData.vendor || "N/A"}</span></div>
                                                   <div className="flex"><span className="font-semibold w-[100px] text-slate-800">Connection ID:</span> <span className="text-slate-700">{msg.ticketData.connection_number || "N/A"}</span></div>
                                                   <div className="flex"><span className="font-semibold w-[100px] text-slate-800">Issue:</span> <span className="text-slate-700">{msg.ticketData.issue_summary || "N/A"}</span></div>
                                                   <div className="flex"><span className="font-semibold w-[100px] text-slate-800">Category:</span> <span className="text-slate-700">{msg.ticketData.category || "N/A"}</span></div>
                                               </div>
                                               {!msg.ticketConfirmed && (
                                                   <Button 
                                                        onClick={() => {
                                                            setDraftTicket({
                                                                vendor: msg.ticketData.vendor || "N/A",
                                                                connection_number: msg.ticketData.connection_number || "N/A",
                                                                issue_summary: msg.ticketData.issue_summary || "N/A",
                                                                category: msg.ticketData.category || "N/A",
                                                                ...msg.ticketData
                                                            });
                                                            setDraftMessageId(msg.id);
                                                            setMode("review");
                                                        }} 
                                                        className="w-full bg-[#1a202c] hover:bg-slate-800 text-white shadow-sm font-medium py-2 h-auto text-[13.5px]"
                                                    >
                                                        Review & Create Ticket
                                                   </Button>
                                               )}
                                           </div>
                                       )}
                                   </div>
                               </div>
                           ))}
                           
                           {isLoading && (
                               <div className="flex flex-col items-start">
                                   <div className="flex items-center justify-between mb-1.5 w-full max-w-[420px]">
                                       <span className="text-[11px] font-semibold text-slate-500">Resolv.lk Assistant</span>
                                   </div>
                                   <div className="bg-white border border-slate-100 px-5 py-4 rounded-2xl rounded-tl-sm w-fit shadow-sm flex items-center gap-1.5">
                                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                   </div>
                               </div>
                           )}
                           <div ref={messagesEndRef} />
                       </div>

                       {/* Input Area */}
                       <div className="p-4 bg-white mt-auto border-t border-blue-50">
                           <div className="flex items-center gap-2 w-full border border-slate-200 rounded-[12px] p-1.5 px-3 focus-within:ring-4 focus-within:ring-blue-50 focus-within:border-blue-300 transition-all bg-white relative shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                               <Input 
                                   value={input}
                                   onChange={(e) => setInput(e.target.value)}
                                   onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                   placeholder="Send a message" 
                                   className="flex-1 border-0 shadow-none focus-visible:ring-0 rounded-none h-11 px-1.5 text-[15px] placeholder:text-slate-400 font-medium text-slate-800"
                                   disabled={isLoading}
                               />
                               <button className="p-2.5 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-50" aria-label="Voice input">
                                   <Mic className="h-5 w-5" />
                               </button>
                               <Button onClick={sendMessage} disabled={isLoading || !input.trim()} size="icon" className="h-[40px] w-[44px] bg-[#1a202c] hover:bg-slate-800 disabled:opacity-50 disabled:bg-slate-400 shrink-0 rounded-[10px] ml-1 shadow-sm">
                                   <Send className="h-[18px] w-[18px] text-white ml-0.5" />
                               </Button>
                           </div>
                       </div>
                   </div>
                ) : mode === "manual" ? (
                    // --- Manual Ticket Form via SHADCN UI ---
                   <div className="w-full flex-1 bg-white border border-slate-200 rounded-2xl overflow-y-auto shadow-sm pb-10">
                       <div className="max-w-3xl mx-auto pt-10 px-8">
                           <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
                               
                               <div className="space-y-2.5 flex flex-col">
                                   <label className="text-sm font-semibold text-slate-700">Service Provider:</label>
                                   <Select onValueChange={(val) => setManualForm(prev => ({...prev, vendor: val}))}>
                                      <SelectTrigger className="w-full bg-white h-11 text-[13.5px] border-slate-300 shadow-sm focus:ring-1 focus:ring-slate-400 font-medium text-slate-700">
                                        <SelectValue placeholder="Select your service provider" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="slt_fibre">Telecom - SLT Fibre</SelectItem>
                                        <SelectItem value="dialog">Telecom - Dialog</SelectItem>
                                        <SelectItem value="mobitel">Telecom - Mobitel</SelectItem>
                                        <SelectItem value="hutch">Telecom - Hutch</SelectItem>
                                        <SelectItem value="ceb">Utility - CEB (Electricity)</SelectItem>
                                        <SelectItem value="nwsdb">Utility - NWSDB (Water)</SelectItem>
                                      </SelectContent>
                                    </Select>
                               </div>

                               <div className="space-y-2.5">
                                   <label className="text-sm font-semibold text-slate-700">Connection Number / Account ID:</label>
                                   <Input 
                                     onChange={(e) => setManualForm(prev => ({...prev, connection_number: e.target.value}))}
                                     placeholder="Enter your connection number" 
                                     className="w-full border-slate-300 bg-white h-11 text-[13.5px] shadow-sm placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-slate-400 font-medium text-slate-700" 
                                   />
                               </div>
                               
                               <div className="space-y-2.5 flex flex-col">
                                   <label className="text-sm font-semibold text-slate-700">Issue Category:</label>
                                   <Select onValueChange={(val) => setManualForm(prev => ({...prev, category: val}))}>
                                      <SelectTrigger className="w-full bg-white h-11 text-[13.5px] border-slate-300 shadow-sm focus:ring-1 focus:ring-slate-400 font-medium text-slate-700">
                                        <SelectValue placeholder="Select your issue category" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="internet">Internet Connectivity</SelectItem>
                                        <SelectItem value="voice">Voice/Landline</SelectItem>
                                        <SelectItem value="billing">Billing & Payments</SelectItem>
                                        <SelectItem value="hardware">Hardware / Router Fault</SelectItem>
                                        <SelectItem value="power_outage">Power Outage / Line Fault</SelectItem>
                                        <SelectItem value="water_leak">Water Leak / Supply Drop</SelectItem>
                                        <SelectItem value="meter_issue">Smart Meter Issue</SelectItem>
                                      </SelectContent>
                                    </Select>
                               </div>

                               <div className="space-y-4 pt-1">
                                   <label className="text-sm font-semibold text-slate-700">Device/Meter Status (If applicable):</label>
                                   <RadioGroup defaultValue="normal" onValueChange={(val) => setManualForm(prev => ({...prev, status: val}))} className="flex flex-wrap gap-8">
                                        <div className="flex items-center space-x-3 cursor-pointer">
                                            <RadioGroupItem value="normal" id="r1" className="border-slate-300 text-[#1a202c] focus:ring-[#1a202c] shadow-sm h-4 w-4" />
                                            <label htmlFor="r1" className="cursor-pointer text-[13.5px] text-slate-600 font-medium">Normal</label>
                                        </div>
                                        <div className="flex items-center space-x-3 cursor-pointer">
                                            <RadioGroupItem value="los" id="r2" className="border-slate-300 text-[#1a202c] focus:ring-[#1a202c] shadow-sm h-4 w-4" />
                                            <label htmlFor="r2" className="cursor-pointer text-[13.5px] text-slate-600 font-medium">LOS Blinking Red (Router)</label>
                                        </div>
                                        <div className="flex items-center space-x-3 cursor-pointer">
                                            <RadioGroupItem value="off" id="r3" className="border-slate-300 text-[#1a202c] focus:ring-[#1a202c] shadow-sm h-4 w-4" />
                                            <label htmlFor="r3" className="cursor-pointer text-[13.5px] text-slate-600 font-medium">No Power / Display Blank</label>
                                        </div>
                                        <div className="flex items-center space-x-3 cursor-pointer">
                                            <RadioGroupItem value="not_applicable" id="r4" className="border-slate-300 text-[#1a202c] focus:ring-[#1a202c] shadow-sm h-4 w-4" />
                                            <label htmlFor="r4" className="cursor-pointer text-[13.5px] text-slate-600 font-medium">Not Applicable</label>
                                        </div>
                                   </RadioGroup>
                               </div>

                               <div className="space-y-2.5 pt-2 flex flex-col">
                                   <label className="text-sm font-semibold text-slate-700">Description:</label>
                                   <Textarea 
                                     rows={5} 
                                     onChange={(e) => setManualForm(prev => ({...prev, description: e.target.value}))}
                                     placeholder="Type your issue description" 
                                     className="w-full border-slate-300 bg-white text-[13.5px] placeholder:text-slate-400 resize-none shadow-sm focus-visible:ring-1 focus-visible:ring-slate-400 mt-1 font-medium text-slate-700 p-3" 
                                   />
                               </div>
                               
                               <div className="space-y-2.5 pt-1 mt-6">
                                   <label className="text-sm font-semibold text-slate-700">Attachment / Upload:</label>
                                   <div className="w-full border-2 border-dashed border-slate-200 rounded-xl p-10 flex flex-col items-center justify-center bg-[#fafcff] cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-all">
                                       <div className="bg-white p-3 rounded-full shadow-sm mb-4 border border-slate-100">
                                           <ImagePlus strokeWidth={2.5} className="h-7 w-7 text-slate-400" />
                                       </div>
                                       <span className="text-[13.5px] font-semibold text-slate-600 mb-1">Upload screenshots of the error or router status</span>
                                       <span className="text-xs text-slate-400 font-medium">(File Types: JPG, PNG only)</span>
                                   </div>
                               </div>

                               <div className="pt-8 pb-4 flex justify-end gap-3 w-full">
                                   <Button variant="outline" type="button" onClick={() => setMode("assistant")} className="px-8 rounded-[6px] border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-sm font-semibold text-[13.5px] h-10 transition-colors">Cancel</Button>
                                   <Button type="button" onClick={() => {
                                       setDraftTicket({
                                            vendor: manualForm.vendor || "SLT",
                                            connection_number: manualForm.connection_number || "N/A",
                                            issue_summary: manualForm.description || "Customer manually submitted a ticket regarding connectivity.",
                                            category: manualForm.category || "General",
                                            isManual: true,
                                            subject: "[Manual] User Submitted Ticket - " + (manualForm.category || "General Issue"),
                                            diagnostics: "- Hardware Status: " + (manualForm.status || "Unknown") + "\n- User Description: " + (manualForm.description || "None provided.")
                                       });
                                       setDraftMessageId("");
                                       setMode("review");
                                   }} className="px-8 rounded-[6px] bg-[#1a202c] hover:bg-slate-800 text-white shadow-sm font-semibold text-[13.5px] h-10 transition-colors">Review Ticket</Button>
                               </div>

                           </form>
                       </div>
                   </div>
               ) : (
                   // --- Review View ---
                   <div className="w-full flex-1 bg-white overflow-hidden pb-10 flex flex-col pt-8 min-h-0">
                       <div className="max-w-4xl mx-auto w-full px-4 lg:px-8 mt-4 overflow-y-auto">
                           {/* Header */}
                           <button onClick={() => setMode(draftMessageId ? "assistant" : "manual")} className="flex items-center text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors mb-10 w-fit">
                               <ChevronLeft className="h-4 w-4 mr-1" /> New Ticket
                           </button>
                           
                           <h2 className="text-[17px] font-bold text-slate-800 mb-8 border-b-2 border-transparent">Ticket Id : NET-404</h2>

                           <div className="flex flex-col lg:flex-row gap-10">
                               {/* Left Column Box */}
                               <div className="flex-1 border border-slate-200 rounded-[8px] p-8 px-6 bg-white shadow-sm text-[14px] text-slate-800 leading-relaxed font-medium">
                                   <div className="mb-6 flex">
                                        <span className="text-slate-500 mr-2 shrink-0">Subject:</span>
                                        <span className="font-semibold text-slate-700">{draftTicket?.subject || `[Critical] ${draftTicket?.vendor || "SLT Fibre"} - Loss of Signal (LOS) Detected`}</span>
                                   </div>
                                   
                                   <div className="mb-2 text-slate-500 mt-8">Issue Description:</div>
                                   <div className="mb-6">{draftTicket?.issue_summary || draftTicket?.description || "Customer reported a complete loss of internet connectivity on SLT Fibre connection 011-2558900."} </div>

                                   <div className="mb-2 text-slate-500 mt-8">Diagnostics Performed:</div>
                                   <div className="mb-6 whitespace-pre-wrap ml-1 text-[13.5px]">
                                        {draftTicket?.diagnostics || `- Symptom: Total service outage.\n- Hardware Status: Customer confirmed the 'LOS' (Loss of Signal) indicator on the router is blinking red.\n- AI Diagnosis: Physical line fault suspected.`}
                                   </div>

                                   <div className="mb-2 text-slate-500 mt-8">Action Required:</div>
                                   <div className="">{draftTicket?.action_required || "Field technician dispatch required to inspect fiber patch cord and drop wire for physical damage or breaks."}</div>
                               </div>

                               {/* Right Column */}
                               <div className="w-full lg:w-[150px] shrink-0 pt-2 lg:pl-10">
                                   <div className="space-y-1.5 flex flex-col mb-10">
                                        <label className="text-[12px] font-semibold text-slate-500">Provider</label>
                                        <Select defaultValue={draftTicket?.vendor?.toLowerCase()?.includes('dialog') ? 'dialog' : 'slt'}>
                                           <SelectTrigger className="w-full bg-transparent border-0 shadow-none h-auto px-0 py-1 focus:ring-0 text-[14.5px] font-semibold text-slate-700">
                                             <SelectValue placeholder="Select provider" />
                                           </SelectTrigger>
                                           <SelectContent>
                                             <SelectItem value="slt">SLT</SelectItem>
                                             <SelectItem value="dialog">Dialog</SelectItem>
                                             <SelectItem value="mobitel">Mobitel</SelectItem>
                                             <SelectItem value="hutch">Hutch</SelectItem>
                                           </SelectContent>
                                        </Select>
                                   </div>
                               </div>
                           </div>
                           
                           <div className="mt-12 flex justify-end lg:pr-32">
                               <Button 
                                   onClick={async () => {
                                        if (draftMessageId) {
                                            setMode("assistant");
                                            // Make sure confirmTicket exists in scope above
                                            // The simplest way without redefining is standard flow
                                            // We will handle dummy fetch inline if fail, but actual confirmTicket is local.
                                            // Wait, unfortunately confirmTicket takes scope variables but we are inside component so it's fine.
                                            confirmTicket(draftTicket, draftMessageId);
                                        } else {
                                            setMode("assistant");
                                            setMessages((prev : any) => [...prev, {
                                                id: Date.now().toString(),
                                                role: "assistant", 
                                                text: `Done! Ticket #NET-TEST has been created manually.`,
                                                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                                            }]);
                                        }
                                   }}
                                   className="px-8 rounded-md bg-[#122841] hover:bg-slate-800 text-white shadow-sm font-semibold text-[13.5px] h-10 tracking-wide"
                               >
                                   Create
                               </Button>
                           </div>
                       </div>
                   </div>
               )}
           </main>
           <Footer />
        </div>
    );
}