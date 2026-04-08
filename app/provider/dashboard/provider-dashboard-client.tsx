"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Filter, MoreVertical, Search, Trash2 } from "lucide-react";

import CustomerAvatar from "@/components/customer/customer-avatar";
import DataTable, { type DataTableColumn } from "@/components/data-table";
import StatusPill from "@/components/provider/status-pill";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteTicket, getTickets } from "@/lib/api/client";
import type { TicketStatus } from "@/lib/models/common";
import type { Ticket } from "@/lib/models/ticket";
import { cn } from "@/lib/utils";

type SummaryCard = {
  label: string;
  value: number;
  tone: "neutral" | "blue" | "amber" | "green";
};

const toneStyles: Record<SummaryCard["tone"], { label: string; value: string }> = {
  neutral: { label: "text-muted-foreground", value: "text-foreground" },
  blue: { label: "text-blue-600", value: "text-foreground" },
  amber: { label: "text-amber-600", value: "text-foreground" },
  green: { label: "text-emerald-600", value: "text-foreground" },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function formatRangeLabel(start: string, end: string) {
  if (!start || !end) return "Select date range";
  const s = new Date(`${start}T00:00:00.000Z`);
  const e = new Date(`${end}T00:00:00.000Z`);
  const sLabel = s.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const eLabel = e.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  return `${sLabel} – ${eLabel}`;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

const ALL_STATUSES: TicketStatus[] = ["Pending", "Processing", "Addressed", "Declined"];

const STATUS_FILTER_LABEL: Record<TicketStatus, string> = {
  Pending: "Pending",
  Processing: "Processing",
  Addressed: "Addressed",
  Declined: "Declined",
};

/** No checkboxes selected = no status restriction (show all). */
function emptyStatusFilters(): Record<TicketStatus, boolean> {
  return { Pending: false, Processing: false, Addressed: false, Declined: false };
}

/** Light solid fill on hover (pairs with navy text/icons) */
const brandHoverOutline =
  "rounded-lg transition-colors hover:bg-[#E8EEF4] hover:text-[#122841] hover:[&_svg]:text-[#122841]";

const brandHoverGhost =
  "rounded-lg transition-colors hover:bg-[#E8EEF4] hover:text-[#122841] hover:[&_svg]:text-[#122841]";

function buildPageItems(current: number, total: number) {
  // returns numbers and "…" strings
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items: Array<number | "…"> = [];
  const push = (v: number | "…") => items.push(v);
  push(1);

  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  if (left > 2) push("…");
  for (let p = left; p <= right; p += 1) push(p);
  if (right < total - 1) push("…");

  push(total);
  return items;
}

export default function ProviderDashboardClient() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilters, setStatusFilters] = useState<Record<TicketStatus, boolean>>(emptyStatusFilters);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const pageSize = 7;

  useEffect(() => {
    let mounted = true;
    getTickets()
      .then((data) => {
        if (mounted) setTickets(data);
      })
      .catch(() => {
        if (mounted) setTickets([]);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const start = startDate ? new Date(`${startDate}T00:00:00.000Z`).getTime() : Number.NEGATIVE_INFINITY;
    const end = endDate ? new Date(`${endDate}T23:59:59.999Z`).getTime() : Number.POSITIVE_INFINITY;

    const byDate = tickets.filter((t) => {
      const created = new Date(t.created_at).getTime();
      return created >= start && created <= end;
    });

    const anyStatusSelected = ALL_STATUSES.some((s) => statusFilters[s]);
    const byStatus = anyStatusSelected ? byDate.filter((t) => statusFilters[t.status]) : byDate;

    if (!q) return byStatus;

    return byStatus.filter((t) => {
      const haystack = [
        t.ticket_no,
        t.customer_name,
        t.issue_data.issue_summary,
        t.issue_data.connection_number,
        t.issue_data.vendor,
        t.issue_data.category,
        t.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, tickets, startDate, endDate, statusFilters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = clamp(page, 1, totalPages);
  const pageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [currentPage, filtered]);

  const paginationItems = useMemo(() => buildPageItems(currentPage, totalPages), [currentPage, totalPages]);

  const activeStatusFilterCount = useMemo(
    () => ALL_STATUSES.filter((s) => statusFilters[s]).length,
    [statusFilters]
  );

  function toggleStatusFilter(status: TicketStatus, next: boolean) {
    setStatusFilters((prev) => ({ ...prev, [status]: next }));
    setPage(1);
  }

  const summaryCards: SummaryCard[] = useMemo(() => {
    return [
      { label: "Total Tickets", value: 2420, tone: "neutral" },
      { label: "Pending", value: 2420, tone: "blue" },
      { label: "Processing", value: 0, tone: "amber" },
      { label: "Addressed", value: 0, tone: "green" },
    ];
  }, []);

  const columns: DataTableColumn<Ticket>[] = [
    { key: "ticket_no", header: "Ticket Id", cell: (row) => <span className="text-muted-foreground">{row.ticket_no}</span> },
    {
      key: "customer",
      header: "Customer Name",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <CustomerAvatar name={row.customer_name ?? "Customer"} size="sm" />
          <span className="font-medium text-foreground">{row.customer_name ?? "Customer"}</span>
        </div>
      ),
    },
    { key: "description", header: "Description", cell: (row) => <span className="text-muted-foreground">{row.issue_data.issue_summary}</span> },
    { key: "date", header: <span className="inline-flex items-center gap-1">Date <span className="text-muted-foreground">↓</span></span>, cell: (row) => <span className="text-muted-foreground">{formatDate(row.created_at)}</span> },
    { key: "status", header: "Status", cell: (row) => <StatusPill status={row.status} /> },
  ];

  async function onDelete(row: Ticket) {
    const ok = window.confirm(`Delete ticket ${row.ticket_no}?`);
    if (!ok) return;
    try {
      await deleteTicket(row.id);
      setTickets((prev) => prev.filter((t) => t.id !== row.id));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete ticket.";
      window.alert(message);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {summaryCards.map((card) => {
          const style = toneStyles[card.tone];

          return (
            <Card key={card.label} className="rounded-2xl shadow-none">
              <CardHeader className="flex-row items-start justify-between space-y-0">
                <div>
                  <p className={cn("text-sm font-medium", style.label)}>{card.label}</p>
                  <CardTitle className={cn("mt-1 text-3xl font-semibold", style.value)}>
                    {card.value.toLocaleString()}
                  </CardTitle>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon-sm" variant="ghost" className={brandHoverGhost}>
                      <MoreVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Export</DropdownMenuItem>
                    <DropdownMenuItem>Refresh</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="pt-0" />
            </Card>
          );
        })}
      </div>

      <Card className="rounded-3xl shadow-none">
        <CardContent className="p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search for trades"
                className="pl-9"
              />
            </div>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className={brandHoverOutline}>
                    <CalendarDays className="size-4 text-muted-foreground" />
                    {formatRangeLabel(startDate, endDate)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[320px] p-3">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-muted-foreground">Start date</p>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                          setPage(1);
                        }}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-muted-foreground">End date</p>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => {
                          setEndDate(e.target.value);
                          setPage(1);
                        }}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <Button
                        variant="ghost"
                        className={brandHoverGhost}
                        onClick={() => {
                          setStartDate("2022-01-06");
                          setEndDate("2022-01-13");
                          setPage(1);
                        }}
                      >
                        Reset
                      </Button>
                      <Button
                        className="rounded-lg transition-all duration-200 hover:brightness-105 hover:shadow-md hover:shadow-[#122841]/20"
                        onClick={() => {
                          // close menu by triggering blur; radix handles onSelect but we keep simple
                          (document.activeElement as HTMLElement | null)?.blur?.();
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className={cn("group", brandHoverOutline)}>
                    <Filter className="size-4 text-muted-foreground" />
                    Filters
                    {activeStatusFilterCount > 0 ? (
                      <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-primary-foreground group-hover:bg-[#E8EEF4] group-hover:text-[#122841]">
                        {activeStatusFilterCount}
                      </span>
                    ) : null}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[220px]">
                  <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">Status</DropdownMenuLabel>
                  {ALL_STATUSES.map((s) => (
                    <DropdownMenuCheckboxItem
                      key={s}
                      checked={statusFilters[s]}
                      onCheckedChange={(checked) => toggleStatusFilter(s, checked === true)}
                      onSelect={(e) => e.preventDefault()}
                    >
                      {STATUS_FILTER_LABEL[s]}
                    </DropdownMenuCheckboxItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={() => {
                      setQuery("");
                      setStartDate("2022-01-06");
                      setEndDate("2022-01-13");
                      setStatusFilters(emptyStatusFilters());
                      setPage(1);
                    }}
                  >
                    Clear all
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="mt-5">
            <DataTable
              data={pageData}
              columns={columns}
              getRowKey={(row) => row.id}
              onRowClick={(row) => router.push(`/provider/tickets/${encodeURIComponent(row.id)}`)}
              rowActions={(row) => (
                <div className="inline-flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className={cn(brandHoverGhost, "text-muted-foreground")}
                    onClick={(e) => {
                      e.stopPropagation();
                      void onDelete(row);
                    }}
                    title="Delete ticket"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    className="rounded-lg font-semibold text-white transition-all duration-200 hover:text-white hover:brightness-105 hover:shadow-lg hover:shadow-[#122841]/25 active:scale-[0.98]"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/provider/tickets/${encodeURIComponent(row.id)}`);
                    }}
                  >
                    Manage
                  </Button>
                </div>
              )}
              actionsHeader=""
              tableClassName="w-full"
            />
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              variant="outline"
              className={brandHoverOutline}
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => clamp(p - 1, 1, totalPages))}
            >
              ← Previous
            </Button>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              {paginationItems.map((item, idx) =>
                item === "…" ? (
                  <span key={`dots-${idx}`} className="px-1">
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPage(item)}
                    className={cn(
                      "inline-flex size-8 items-center justify-center rounded-lg transition-colors",
                      item === currentPage
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-[#E8EEF4] hover:text-[#122841]"
                    )}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
            <Button
              variant="outline"
              className={brandHoverOutline}
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => clamp(p + 1, 1, totalPages))}
            >
              Next →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

