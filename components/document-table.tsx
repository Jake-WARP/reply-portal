"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import type { DocumentRow } from "@/data/documents";
import DataTable from "@/components/data-table";

type DocumentTableProps = {
  documents: DocumentRow[];
};

export default function DocumentTable({ documents }: DocumentTableProps) {
  const columns = useMemo<ColumnDef<DocumentRow>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Naam",
        cell: ({ row }) => (
          <span className="font-medium">{row.original.title}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "owner",
        header: "Bewerker",
      },
      {
        accessorKey: "lastUpdatedRaw",
        header: "Laatst bewerkt",
        cell: ({ row }) => row.original.lastUpdatedLabel,
        sortingFn: "datetime",
      },
    ],
    []
  );

  return (
    <DataTable
      columns={columns}
      data={documents}
      searchPlaceholder="Zoeken naar documenten..."
      emptyLabel="Geen documenten gevonden."
    />
  );
}
