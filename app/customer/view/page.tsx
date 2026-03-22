"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import DataTable, { DataTableColumn } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { ChevronLeft, Search, Calendar, Filter, ArrowLeft, ArrowRight, CircleUserRound, LogOut } from "lucide-react";

import { Ticket } from "@/lib/models/ticket";
import { TicketStatus } from "@/lib/models/common";

// Mock API function
const fetchMockTickets = async (): Promise<Ticket[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600));
  
  return [
    { id: "1", ticket_no: "NET-404", customer_id: "c1", vendor_id: "v1", vendor_name: "Dialog", status: "In Progress", issue_data: { vendor: "Dialog", connection_number: "N/A", issue_summary: "Connectivity Loss", category: "Network" }, internal_notes: null, created_at: "2022-01-13T00:00:00.000Z" },
    { id: "2", ticket_no: "NET-405", customer_id: "c1", vendor_id: "v1", vendor_name: "Dialog", status: "Resolved", issue_data: { vendor: "Dialog", connection_number: "N/A", issue_summary: "Slow Speed", category: "Network" }, internal_notes: null, created_at: "2022-01-13T00:00:00.000Z" },
    { id: "3", ticket_no: "NET-406", customer_id: "c1", vendor_id: "v2", vendor_name: "Airtel", status: "Resolved", issue_data: { vendor: "Airtel", connection_number: "N/A", issue_summary: "Mobile Data Issue", category: "Network" }, internal_notes: null, created_at: "2022-01-13T00:00:00.000Z" },
    { id: "4", ticket_no: "NET-407", customer_id: "c1", vendor_id: "v2", vendor_name: "Airtel", status: "Resolved", issue_data: { vendor: "Airtel", connection_number: "N/A", issue_summary: "TV Service", category: "Network" }, internal_notes: null, created_at: "2022-01-13T00:00:00.000Z" },
    { id: "5", ticket_no: "NET-408", customer_id: "c1", vendor_id: "v2", vendor_name: "Airtel", status: "Open", issue_data: { vendor: "Airtel", connection_number: "N/A", issue_summary: "Mobile Data Issue", category: "Network" }, internal_notes: null, created_at: "2022-01-12T00:00:00.000Z" },
    { id: "6", ticket_no: "NET-409", customer_id: "c1", vendor_id: "v3", vendor_name: "SLTMobitel", status: "Resolved", issue_data: { vendor: "SLTMobitel", connection_number: "N/A", issue_summary: "Slow Internet Speed", category: "Network" }, internal_notes: null, created_at: "2022-01-12T00:00:00.000Z" },
    { id: "7", ticket_no: "NET-410", customer_id: "c1", vendor_id: "v3", vendor_name: "SLTMobitel", status: "Resolved", issue_data: { vendor: "SLTMobitel", connection_number: "N/A", issue_summary: "Connectivity Loss", category: "Network" }, internal_notes: null, created_at: "2022-01-12T00:00:00.000Z" },
    { id: "8", ticket_no: "NET-411", customer_id: "c1", vendor_id: "v1", vendor_name: "Dialog", status: "In Progress", issue_data: { vendor: "Dialog", connection_number: "N/A", issue_summary: "Router Replacement", category: "Network" }, internal_notes: null, created_at: "2022-01-11T00:00:00.000Z" },
    { id: "9", ticket_no: "NET-412", customer_id: "c1", vendor_id: "v2", vendor_name: "Airtel", status: "Resolved", issue_data: { vendor: "Airtel", connection_number: "N/A", issue_summary: "Billing Issue", category: "Billing" }, internal_notes: null, created_at: "2022-01-11T00:00:00.000Z" },
    { id: "10", ticket_no: "NET-413", customer_id: "c1", vendor_id: "v3", vendor_name: "SLTMobitel", status: "Open", issue_data: { vendor: "SLTMobitel", connection_number: "N/A", issue_summary: "Line Disconnection", category: "Network" }, internal_notes: null, created_at: "2022-01-10T00:00:00.000Z" },
    { id: "11", ticket_no: "NET-414", customer_id: "c1", vendor_id: "v1", vendor_name: "Dialog", status: "Resolved", issue_data: { vendor: "Dialog", connection_number: "N/A", issue_summary: "Package Upgrade", category: "Billing" }, internal_notes: null, created_at: "2022-01-10T00:00:00.000Z" },
    { id: "12", ticket_no: "NET-415", customer_id: "c1", vendor_id: "v4", vendor_name: "Hutch", status: "In Progress", issue_data: { vendor: "Hutch", connection_number: "N/A", issue_summary: "Coverage Issue", category: "Network" }, internal_notes: null, created_at: "2022-01-09T00:00:00.000Z" },
  ];
};

const statusBadgeStyles: Record<TicketStatus, string> = {
  "In Progress": "bg-slate-100 text-slate-600 border border-slate-200/60",
  "Resolved": "bg-emerald-50 text-emerald-700 border border-emerald-100/60",
  "Open": "bg-blue-50 text-blue-700 border border-blue-100/60",
};

const statusDotStyles: Record<TicketStatus, string> = {
  "In Progress": "bg-slate-400",
  "Resolved": "bg-emerald-500",
  "Open": "bg-blue-500",
};

export default function ViewTicketsPage() {
  const [data, setData] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters & Pagination State
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchMockTickets().then((mockData) => {
      setData(mockData);
      setIsLoading(false);
    });
  }, []);

  // Compute Filtered and Paginated Data
  const filteredData = data.filter((ticket) => {
    const matchesSearch = 
      ticket.ticket_no.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (ticket.vendor_name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) || 
      ticket.issue_data.issue_summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesDate = true;
    if (dateRange?.from) {
      const ticketDate = new Date(ticket.created_at);
      if (dateRange.to) {
        matchesDate = ticketDate >= dateRange.from && ticketDate <= dateRange.to;
      } else {
        matchesDate = ticketDate.toDateString() === dateRange.from.toDateString() || ticketDate > dateRange.from;
      }
    }

    return matchesSearch && matchesDate;
  });

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, dateRange]);

  // Use the rightContent component for the navbar exactly like the main customer page
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

  const columns: DataTableColumn<Ticket>[] = [
    {
      key: "id",
      header: "Ticket Id",
      className: "text-[#667085] font-medium text-[13.5px]",
      headerClassName: "text-[12px] font-semibold text-slate-500 bg-white border-b-0 py-4 px-6 rounded-tl-xl",
      cell: (row) => <span className="text-slate-400 px-2">{row.ticket_no}</span>
    },
    {
      key: "provider",
      header: "Provider",
      className: "font-semibold text-slate-800 text-[13.5px]",
      headerClassName: "text-[12px] font-semibold text-slate-500 bg-white border-b-0 py-4",
      cell: (row) => <span>{row.vendor_name}</span>
    },
    {
      key: "description",
      header: "Description",
      className: "text-slate-500 font-medium text-[13.5px]",
      headerClassName: "text-[12px] font-semibold text-slate-500 bg-white w-[30%]",
      cell: (row) => <span>{row.issue_data.issue_summary}</span>
    },
    {
      key: "date",
      header: <span className="flex items-center gap-1 cursor-pointer hover:text-slate-700">Date <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>,
      className: "text-slate-500 font-medium text-[13.5px]",
      headerClassName: "text-[12px] font-semibold text-slate-500 bg-white",
      cell: (row) => <span>{new Date(row.created_at).toLocaleDateString()}</span>
    },
    {
      key: "status",
      header: "Status",
      className: "",
      headerClassName: "text-[12px] font-semibold text-slate-500 bg-white w-32",
      cell: (row) => (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold ${statusBadgeStyles[row.status]}`}>
           <span className={`w-1.5 h-1.5 rounded-full ${statusDotStyles[row.status]}`}></span>
           {row.status}
        </div>
      )
    },
    {
      key: "action",
      header: "",
      className: "text-right pr-6",
      headerClassName: "bg-white rounded-tr-xl",
      cell: (row) => (
        <Link href={`/customer/ticket/${row.id}`} className="text-[13px] font-semibold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-wider">
           View
        </Link>
      )
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-900 bg-[#fafcff]">
      {/* Header */}
      <Navbar rightContent={rightContentNode} />

      <main className="flex-1 flex flex-col px-4 w-full max-w-[1100px] mx-auto pb-16">
        {/* Back Link & Title */}
        <div className="mt-12 mb-8 ml-2">
          <Link href="/customer" className="flex items-center text-[15px] font-bold text-[#2a3c5a] hover:text-[#122841] transition-colors w-fit">
            <ChevronLeft className="h-[18px] w-[18px] mr-1.5 stroke-[2.5]" /> My Tickets
          </Link>
        </div>

        {/* Controls block */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6 bg-[#fafcff]">
          {/* Search */}
          <div className="relative w-full sm:w-[380px]">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-[18px] w-[18px] text-slate-400" />
            </div>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ticket id, provider, or description"
              className="pl-10 h-11 bg-white border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-[8px] focus-visible:ring-1 focus-visible:ring-slate-300 text-[14px] font-medium placeholder:text-slate-400 placeholder:font-medium"
            />
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            {/* Calendar Popover Date Range Match */}
            <div className="relative flex items-center">
               <Popover>
                 <PopoverTrigger asChild>
                   <Button
                     id="date"
                     variant={"outline"}
                     className={cn(
                       "h-11 bg-white border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-[8px] text-slate-600 font-medium px-4 text-[13.5px] w-[260px] justify-start text-left",
                       !dateRange && "text-muted-foreground"
                     )}
                   >
                     <Calendar className="mr-2 h-[18px] w-[18px] text-slate-500" />
                     {dateRange?.from ? (
                       dateRange.to ? (
                         <>
                           {format(dateRange.from, "LLL dd, y")} -{" "}
                           {format(dateRange.to, "LLL dd, y")}
                         </>
                       ) : (
                         format(dateRange.from, "LLL dd, y")
                       )
                     ) : (
                       <span>Filter by date range</span>
                     )}
                   </Button>
                 </PopoverTrigger>
                 <PopoverContent className="w-auto p-0" align="start">
                   <CalendarComponent
                     initialFocus
                     mode="range"
                     defaultMonth={dateRange?.from}
                     selected={dateRange}
                     onSelect={setDateRange}
                     numberOfMonths={2}
                   />
                 </PopoverContent>
               </Popover>
            </div>
            
            {/* Filters */}
            <Button variant="outline" className="h-11 bg-white border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-[8px] text-slate-600 font-medium px-4 text-[13.5px]">
              <Filter className="mr-2 h-[17px] w-[17px] text-slate-500" />
              Filters
            </Button>
          </div>
        </div>

        {/* Dynamic Table Card */}
        <div className="bg-white border border-slate-200/70 shadow-[0_2px_15px_rgba(0,0,0,0.02)] rounded-[12px] flex flex-col mb-10 overflow-hidden min-h-[400px]">
          {isLoading ? (
            <div className="h-48 flex items-center justify-center text-slate-400 text-sm font-medium">Loading tickets...</div>
          ) : (
             <DataTable 
               data={paginatedData} 
               columns={columns} 
               tableClassName="border-0 bg-transparent rounded-none"
               emptyMessage="No tickets found matching your criteria."
             />
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-slate-100 p-4 px-6 bg-white shrink-0 mt-auto">
             <Button 
                variant="outline" 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="h-9 px-4 rounded-[6px] border-slate-200 text-slate-600 font-medium text-[13px] hover:bg-slate-50 transition-colors shadow-sm gap-1.5 disabled:opacity-50"
             >
               <ArrowLeft className="h-4 w-4" /> Previous
             </Button>

             <div className="flex items-center gap-1.5 hidden sm:flex">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-8 w-8 flex items-center justify-center rounded-md font-medium text-[13px] transition-colors ${
                      currentPage === i + 1 
                        ? "bg-[#eff6ff] text-blue-700 font-semibold" 
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
             </div>

             <Button 
                variant="outline" 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="h-9 px-4 rounded-[6px] border-slate-200 text-slate-600 font-medium text-[13px] hover:bg-slate-50 transition-colors shadow-sm gap-1.5 disabled:opacity-50"
             >
               Next <ArrowRight className="h-4 w-4" />
             </Button>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
