"use client";

import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import type { UserRow } from "@/data/users";

type UserTableProps = {
  users: UserRow[];
};

export default function UserTable({ users }: UserTableProps) {
  const columns = useMemo<MRT_ColumnDef<UserRow>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Naam",
        size: 180,
      },
      {
        accessorKey: "email",
        header: "E-mail",
        size: 220,
      },
      {
        accessorKey: "lastActiveRaw",
        header: "Laatst actief",
        sortingFn: "datetime",
        accessorFn: (row) => row.lastActiveRaw,
        Cell: ({ row }) => row.original.lastActiveLabel,
        size: 150,
      },
    ],
    []
  );

  const data = useMemo(() => users, [users]);

  const table = useMaterialReactTable({
    columns,
    data,
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: "10px",
        border: "1px solid #e4e4e7",
      },
    },
  });

  return <MaterialReactTable table={table} />;
}
