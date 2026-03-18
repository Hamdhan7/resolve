import type { TicketStatus } from "@/lib/models/common";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<TicketStatus, { dot: string; text: string; pill: string }> = {
  Open: {
    dot: "bg-blue-500",
    text: "text-blue-700",
    pill: "bg-blue-50 ring-1 ring-blue-100",
  },
  "In Progress": {
    dot: "bg-amber-500",
    text: "text-amber-800",
    pill: "bg-amber-50 ring-1 ring-amber-100",
  },
  Resolved: {
    dot: "bg-emerald-500",
    text: "text-emerald-700",
    pill: "bg-emerald-50 ring-1 ring-emerald-100",
  },
};

const STATUS_LABEL: Record<TicketStatus, string> = {
  Open: "Pending",
  "In Progress": "Processing",
  Resolved: "Resolved",
};

export default function StatusPill({ status, className }: { status: TicketStatus; className?: string }) {
  const styles = STATUS_STYLES[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
        styles.pill,
        styles.text,
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full", styles.dot)} />
      {STATUS_LABEL[status]}
    </span>
  );
}

