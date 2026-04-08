import DataTable, { DataTableColumn } from "@/components/data-table";
import { Button } from "@/components/ui/button";

import { Ticket } from "@/lib/models/ticket";

const rows: Ticket[] = [
  {
    id: "1", ticket_no: "TK-1001", customer_id: "c1", vendor_id: "v1", customer_name: "Nadeesha Perera", vendor_name: "Dialog", status: "Pending", issue_data: { vendor: "Dialog", connection_number: "N/A", issue_summary: "Frequent fiber disconnections", category: "Network" }, internal_notes: null, created_at: "2022-01-13T00:00:00.000Z"
  },
  {
    id: "2", ticket_no: "TK-1002", customer_id: "c2", vendor_id: "v2", customer_name: "Kasun Fernando", vendor_name: "SLT", status: "Processing", issue_data: { vendor: "SLT", connection_number: "N/A", issue_summary: "Billing dispute on monthly package", category: "Billing" }, internal_notes: null, created_at: "2022-01-13T00:00:00.000Z"
  },
  {
    id: "3", ticket_no: "TK-1003", customer_id: "c3", vendor_id: "v4", customer_name: "Aisha Rahman", vendor_name: "Hutch", status: "Addressed", issue_data: { vendor: "Hutch", connection_number: "N/A", issue_summary: "4G signal drops in evening", category: "Network" }, internal_notes: null, created_at: "2022-01-13T00:00:00.000Z"
  },
];

const columns: DataTableColumn<Ticket>[] = [
  {
    key: "id",
    header: "Ticket ID",
    cell: (row) => <span>{row.ticket_no}</span>,
    className: "font-medium",
  },
  {
    key: "customer",
    header: "Customer",
    cell: (row) => <span>{row.customer_name}</span>,
  },
  {
    key: "provider",
    header: "Provider",
    cell: (row) => <span>{row.vendor_name}</span>,
  },
  {
    key: "issue",
    header: "Issue",
    cell: (row) => <span>{row.issue_data.issue_summary}</span>,
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => {
      const tone =
        row.status === "Addressed"
          ? "bg-emerald-100 text-emerald-700"
          : row.status === "Processing"
            ? "bg-amber-100 text-amber-700"
            : "bg-blue-100 text-blue-700";

      return (
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>
          {row.status}
        </span>
      );
    },
  },
];

export default function TableDemoPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10 lg:px-10">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">DataTable Demo</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Reusable table with configurable columns and row actions.
          </p>
        </div>

        <DataTable
          data={rows}
          columns={columns}
          getRowKey={(row) => row.id}
          rowActions={() => (
            <div className="inline-flex gap-2">
              <Button size="sm" variant="outline">
                View
              </Button>
              <Button size="sm">Edit</Button>
              <Button size="sm" variant="destructive">
                Delete
              </Button>
            </div>
          )}
        />
      </div>
    </main>
  );
}
