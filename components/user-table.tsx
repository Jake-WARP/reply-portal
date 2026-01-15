"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import DataTable from "@/components/data-table";
import type { UserRow } from "@/data/users";

type UserTableProps = {
  users: UserRow[];
};

export default function UserTable({ users }: UserTableProps) {
  const columns = useMemo<ColumnDef<UserRow>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Naam",
        cell: ({ row }) => (
          <span>{row.original.name}</span>
        ),
      },
      {
        accessorKey: "email",
        header: "E-mail",
      },
      {
        accessorKey: "lastActiveRaw",
        header: "Laatst actief",
        cell: ({ row }) => row.original.lastActiveLabel,
        sortingFn: "datetime",
      },
    ],
    []
  );

  return (
    <DataTable
      columns={columns}
      data={users}
      searchPlaceholder="Zoeken naar gebruikers..."
      emptyLabel="Geen gebruikers gevonden."
    />
  );
}
