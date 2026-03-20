import DataTable, { DataTableColumn } from "@/components/data-table";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";

type CompanyRequestRow = {
    companyName: string;
    email: string;
    regNo: string;
    requestedDate: string;
    status: "Pending" | "Approved" | "Rejected";
};

const companyRequests: CompanyRequestRow[] = [
    {
        companyName: "Dialog Axiata PLC",
        email: "admin@dialog.lk",
        regNo: "PV-22045",
        requestedDate: "2026-03-08",
        status: "Pending",
    },
    {
        companyName: "Sri Lanka Telecom PLC",
        email: "partnerships@slt.lk",
        regNo: "PB-10412",
        requestedDate: "2026-03-10",
        status: "Approved",
    },
    {
        companyName: "Hutch Lanka Ltd",
        email: "ops@hutch.lk",
        regNo: "PV-88701",
        requestedDate: "2026-03-12",
        status: "Rejected",
    },
];

const columns: DataTableColumn<CompanyRequestRow>[] = [
    {
        key: "companyName",
        header: "Company Name",
        accessor: "companyName",
        className: "font-medium",
    },
    {
        key: "email",
        header: "Email",
        accessor: "email",
    },
    {
        key: "regNo",
        header: "Reg No",
        accessor: "regNo",
    },
    {
        key: "requestedDate",
        header: "Requested Date",
        cell: (row) => {
            const formattedDate = new Date(row.requestedDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            });

            return formattedDate;
        },
    },
    {
        key: "status",
        header: "Status",
        cell: (row) => {
            const tone =
                row.status === "Approved"
                    ? "bg-emerald-100 text-emerald-700"
                    : row.status === "Rejected"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-amber-100 text-amber-700";

            return (
                <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>
                    {row.status}
                </span>
            );
        },
    },
];

export default function AdminPage() {
    return (
        <main className="flex min-h-screen flex-col bg-background text-foreground">
            <Navbar
                rightContent={
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Button variant="outline" className="rounded-sm">
                            <CircleUserRound className="size-4" />
                            Company Registration Approvals
                        </Button>
                    </div>
                }
            />

            <section className="mx-auto w-full max-w-7xl flex-1 px-6 py-10 lg:px-10">
                <div className="space-y-1">
                    <h1 className="text-3xl font-semibold tracking-tight">Admin Portal</h1>
                    <p className="text-sm text-muted-foreground">
                        Review and approve pending service provider accounts.
                    </p>
                </div>

                <div className="mt-6">
                    <DataTable
                        data={companyRequests}
                        columns={columns}
                        getRowKey={(row) => row.regNo}
                        actionsHeader="Actions"
                        rowActions={() => (
                            <div className="inline-flex gap-2">
                                <Button size="sm" className="rounded-lg">
                                    Approve
                                </Button>
                                <Button size="sm" variant="destructive" className="rounded-lg">
                                    Reject
                                </Button>
                            </div>
                        )}
                    />
                </div>
            </section>

            <Footer />
        </main>
    );
}