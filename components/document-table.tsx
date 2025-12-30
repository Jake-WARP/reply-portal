"use client";

import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import type { DocumentRow } from "@/data/documents";

type DocumentTableProps = {
  documents: DocumentRow[];
};

export default function DocumentTable({ documents }: DocumentTableProps) {
  const columns = useMemo<MRT_ColumnDef<DocumentRow>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Naam",
        size: 200,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 120,
      },
      {
        accessorKey: "owner",
        header: "Bewerker",
        size: 150,
      },
      {
        accessorKey: "lastUpdatedRaw",
        header: "Laatst bewerkt",
        sortingFn: "datetime",
        accessorFn: (row) => row.lastUpdatedRaw,
        Cell: ({ row }) => row.original.lastUpdatedLabel,

        size: 150,
      },
    ],
    []
  );

  const data = useMemo(() => documents, [documents]);

  const table = useMaterialReactTable({
    columns,
    data,
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: '10px',
        border: '1px solid #e4e4e7',
      },
    }
  });

  return <MaterialReactTable table={table} />;
}
