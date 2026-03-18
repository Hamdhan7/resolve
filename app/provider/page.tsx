<<<<<<< Current (Your changes)
import React from "react";
import TableDemoPage from "@/app/table-demo/page";

export default function ProviderPage() {
    return (
        <div>
            <h1>Provider Page</h1>
            <TableDemoPage></TableDemoPage>
        </div>
    );
=======
import { redirect } from "next/navigation";

export default function ProviderPage() {
  redirect("/provider/dashboard");
>>>>>>> Incoming (Background Agent changes)
}