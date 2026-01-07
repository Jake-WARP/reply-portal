"use client";

import type { DocumentRow } from "@/data/documents";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DocumentTableProps = {
  documents: DocumentRow[];
};

export default function DocumentTable({ documents }: DocumentTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Naam</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Bewerker</TableHead>
            <TableHead>Laatst bewerkt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="py-6 text-center text-zinc-500">
                Geen documenten gevonden.
              </TableCell>
            </TableRow>
          ) : (
            documents.map((document) => (
              <TableRow key={document.id}>
                <TableCell className="font-medium">{document.title}</TableCell>
                <TableCell>{document.status}</TableCell>
                <TableCell>{document.owner}</TableCell>
                <TableCell>{document.lastUpdatedLabel}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
