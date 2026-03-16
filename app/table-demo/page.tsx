import DataTable, { DataTableColumn } from "@/components/data-table";
import { Button } from "@/components/ui/button";

type TicketRow = {
  id: string;
  customer: string;
  provider: "Dialog" | "SLT" | "Hutch" | "Airtel";
  issue: string;
  status: "Open" | "In Progress" | "Resolved";
};

const rows: TicketRow[] = [
  {
    id: "TK-1001",
    customer: "Nadeesha Perera",
    provider: "Dialog",
    issue: "Frequent fiber disconnections",
    status: "Open",
  },
  {
    id: "TK-1002",
    customer: "Kasun Fernando",
    provider: "SLT",
    issue: "Billing dispute on monthly package",
    status: "In Progress",
  },
  {
    id: "TK-1003",
    customer: "Aisha Rahman",
    provider: "Hutch",
    issue: "4G signal drops in evening",
    status: "Resolved",
  },
];

const columns: DataTableColumn<TicketRow>[] = [
  {
    key: "id",
    header: "Ticket ID",
    accessor: "id",
    className: "font-medium",
  },
  {
    key: "customer",
    header: "Customer",
    accessor: "customer",
  },
  {
    key: "provider",
    header: "Provider",
    accessor: "provider",
  },
  {
    key: "issue",
    header: "Issue",
    accessor: "issue",
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => {
      const tone =
        row.status === "Resolved"
          ? "bg-emerald-100 text-emerald-700"
          : row.status === "In Progress"
            ? "bg-amber-100 text-amber-700"
            : "bg-rose-100 text-rose-700";

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
