import { ReactNode } from "react";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type DataTableColumn<TData> = {
  key: string;
  header: ReactNode;
  accessor?: keyof TData;
  cell?: (row: TData, rowIndex: number) => ReactNode;
  className?: string;
  headerClassName?: string;
};

type DataTableProps<TData> = {
  data: TData[];
  columns: DataTableColumn<TData>[];
  getRowKey?: (row: TData, rowIndex: number) => string;
  emptyMessage?: string;
  rowActions?: (row: TData, rowIndex: number) => ReactNode;
  actionsHeader?: ReactNode;
  tableClassName?: string;
};

function DataTable<TData>({
  data,
  columns,
  getRowKey,
  emptyMessage = "No data found.",
  rowActions,
  actionsHeader = "Actions",
  tableClassName,
}: DataTableProps<TData>) {
  const totalColumns = columns.length + (rowActions ? 1 : 0);

  return (
    <div className="rounded-2xl border border-border/60 bg-card">
      <Table className={cn(tableClassName)}>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30">
            {columns.map((column) => (
              <TableHead key={column.key} className={column.headerClassName}>
                {column.header}
              </TableHead>
            ))}
            {rowActions ? <TableHead className="text-right">{actionsHeader}</TableHead> : null}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={totalColumns} className="h-24 text-center text-muted-foreground">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow key={getRowKey?.(row, rowIndex) ?? String(rowIndex)}>
                {columns.map((column) => {
                  const cellContent =
                    column.cell?.(row, rowIndex) ??
                    (column.accessor ? (row[column.accessor] as ReactNode) : null);

                  return (
                    <TableCell key={column.key} className={column.className}>
                      {cellContent}
                    </TableCell>
                  );
                })}

                {rowActions ? <TableCell className="text-right">{rowActions(row, rowIndex)}</TableCell> : null}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTable;
