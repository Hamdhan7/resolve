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
import { ChevronLeft, Search, Calendar, Filter, ArrowLeft, ArrowRight } from "lucide-react";

// Mock API function
const fetchMockTickets = async (): Promise<TicketData[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600));
  
  return [
    { id: "NET-404", provider: "Dialog", description: "Connectivity Loss", date: "Jan 13, 2022", status: "Processing" },
    { id: "NET-405", provider: "Dialog", description: "Slow Speed", date: "Jan 13, 2022", status: "Addressed" },
    { id: "NET-406", provider: "Airtel", description: "Mobile Data Issue", date: "Jan 13, 2022", status: "Addressed" },
    { id: "NET-407", provider: "Airtel", description: "TV Service", date: "Jan 13, 2022", status: "Declined" },
    { id: "NET-408", provider: "Airtel", description: "Mobile Data Issue", date: "Jan 12, 2022", status: "Pending" },
    { id: "NET-409", provider: "SLTMobitel", description: "Slow Internet Speed", date: "Jan 12, 2022", status: "Addressed" },
    { id: "NET-410", provider: "SLTMobitel", description: "Connectivity Loss", date: "Jan 12, 2022", status: "Addressed" },
    { id: "NET-411", provider: "Dialog", description: "Router Replacement", date: "Jan 11, 2022", status: "Processing" },
    { id: "NET-412", provider: "Airtel", description: "Billing Issue", date: "Jan 11, 2022", status: "Declined" },
    { id: "NET-413", provider: "SLTMobitel", description: "Line Disconnection", date: "Jan 10, 2022", status: "Pending" },
    { id: "NET-414", provider: "Dialog", description: "Package Upgrade", date: "Jan 10, 2022", status: "Addressed" },
    { id: "NET-415", provider: "Hutch", description: "Coverage Issue", date: "Jan 09, 2022", status: "Processing" },
  ];
};

type TicketStatus = "Processing" | "Addressed" | "Declined" | "Pending";

export interface TicketData {
  id: string;
  provider: string;
  description: string;
  date: string;
  status: TicketStatus;
}

const statusBadgeStyles: Record<TicketStatus, string> = {
  Processing: "bg-slate-100 text-slate-600 border border-slate-200/60",
  Addressed: "bg-emerald-50 text-emerald-700 border border-emerald-100/60",
  Declined: "bg-red-50 text-red-700 border border-red-100/60",
  Pending: "bg-blue-50 text-blue-700 border border-blue-100/60",
};

const statusDotStyles: Record<TicketStatus, string> = {
  Processing: "bg-slate-400",
  Addressed: "bg-emerald-500",
  Declined: "bg-red-500",
  Pending: "bg-blue-500",
};

export default function ViewTicketsPage() {
  const [data, setData] = useState<TicketData[]>([]);
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
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      ticket.provider.toLowerCase().includes(searchQuery.toLowerCase()) || 
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesDate = true;
    if (dateRange?.from) {
      // Mock parsing: "Jan 13, 2022" -> Date object
      const ticketDate = new Date(ticket.date);
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

  const columns: DataTableColumn<TicketData>[] = [
    {
      key: "id",
      header: "Ticket Id",
      className: "text-[#667085] font-medium text-[13.5px]",
      headerClassName: "text-[12px] font-semibold text-slate-500 bg-white border-b-0 py-4 px-6 rounded-tl-xl",
      cell: (row) => <span className="text-slate-400 px-2">{row.id}</span>
    },
    {
      key: "provider",
      header: "Provider",
      className: "font-semibold text-slate-800 text-[13.5px]",
      headerClassName: "text-[12px] font-semibold text-slate-500 bg-white border-b-0 py-4",
      cell: (row) => <span>{row.provider}</span>
    },
    {
      key: "description",
      header: "Description",
      className: "text-slate-500 font-medium text-[13.5px]",
      headerClassName: "text-[12px] font-semibold text-slate-500 bg-white w-[30%]",
      cell: (row) => <span>{row.description}</span>
    },
    {
      key: "date",
      header: <span className="flex items-center gap-1 cursor-pointer hover:text-slate-700">Date <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>,
      className: "text-slate-500 font-medium text-[13.5px]",
      headerClassName: "text-[12px] font-semibold text-slate-500 bg-white",
      cell: (row) => <span>{row.date}</span>
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
