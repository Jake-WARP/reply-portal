"use client";

import type { UserRow } from "@/data/users";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type UserTableProps = {
  users: UserRow[];
};

export default function UserTable({ users }: UserTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Naam</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Laatst actief</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="py-6 text-center text-zinc-500">
                Geen gebruikers gevonden.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.lastActiveLabel}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
