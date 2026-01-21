"use client";

import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import DataTable from "@/components/data-table";
import type { UserRow } from "@/data/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { agents } from "@/data/agents";
import { Trash2, UserPlus } from "lucide-react";

type UserTableProps = {
  users: UserRow[];
};

export default function UserTable({ users }: UserTableProps) {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteAgents, setInviteAgents] = useState<string[]>([]);
  const [userToDelete, setUserToDelete] = useState<UserRow | null>(null);
  const isDeleteOpen = userToDelete !== null;
  const allAgentsSelected =
    inviteAgents.length === agents.length && agents.length > 0;
  const columns = useMemo<ColumnDef<UserRow>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Naam",
        cell: ({ row }) => <span>{row.original.name}</span>,
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
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex justify-end">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setUserToDelete(row.original)}
              aria-label={`Verwijder ${row.original.name}`}
            >
              <Trash2 className="size-5" aria-hidden="true" />
            </Button>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={users}
        searchPlaceholder="Zoeken naar gebruikers..."
        emptyLabel="Geen gebruikers gevonden."
        toolbarContent={
          <Button type="button" onClick={() => setIsInviteOpen(true)}>
            <UserPlus className="size-5" aria-hidden="true" />
            Gebruiker uitnodigen
          </Button>
        }
      />
      {isInviteOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md border border-zinc-200 bg-white p-6 shadow-xl">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-zinc-900">
                Gebruiker uitnodigen
              </h2>
              <p className="text-sm text-zinc-500">
                Voeg een e-mailadres toe om een gebruiker toe te voegen.
              </p>
            </div>
            <form
              className="mt-4 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                setIsInviteOpen(false);
                setInviteEmail("");
                setInviteAgents([]);
              }}
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700">
                  E-mailadres
                </label>
                <Input
                  type="email"
                  placeholder="naam@bedrijf.nl"
                  className="placeholder:text-zinc-400"
                  value={inviteEmail}
                  onChange={(event) => setInviteEmail(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-zinc-700">
                  Agenten
                </span>
                <div className="space-y-2 border border-zinc-200 bg-white p-3">
                  <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-zinc-700">
                    <input
                      type="checkbox"
                      className="h-4 w-4 bg-background"
                      checked={allAgentsSelected}
                      onChange={(event) => {
                        setInviteAgents(
                          event.target.checked
                            ? agents.map((agent) => agent.id)
                            : [],
                        );
                      }}
                    />
                    Selecteer alles
                  </label>
                  <div className="h-px bg-zinc-100" />
                  {agents.map((agent) => {
                    const isChecked = inviteAgents.includes(agent.id);
                    return (
                      <label
                        key={agent.id}
                        className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700"
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4"
                          checked={isChecked}
                          onChange={(event) => {
                            setInviteAgents((prev) =>
                              event.target.checked
                                ? [...prev, agent.id]
                                : prev.filter((id) => id !== agent.id),
                            );
                          }}
                        />
                        {agent.label}
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setIsInviteOpen(false);
                    setInviteEmail("");
                    setInviteAgents([]);
                  }}
                >
                  Annuleren
                </Button>
                <Button type="submit" disabled={inviteAgents.length === 0}>
                  Uitnodiging opslaan
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
      {isDeleteOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-xl">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-zinc-900">
                Gebruiker verwijderen
              </h2>
              <p className="text-sm text-zinc-500">
                Weet je zeker dat je{" "}
                <span className="font-semibold text-zinc-900">
                  {userToDelete?.name}
                </span>{" "}
                wilt verwijderen?
              </p>
            </div>
            <div className="mt-4 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setUserToDelete(null)}
              >
                Annuleren
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => setUserToDelete(null)}
              >
                Verwijderen
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
