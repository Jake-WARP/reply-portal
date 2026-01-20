import UserTable from "@/components/user-table";
import { agentLabelById } from "@/data/agents";
import { fallbackUsers, userDataByAgent } from "@/data/users";

interface PageProps {
  params: Promise<{
    agentId: string;
  }>;
}

export default async function UserPage({ params }: PageProps) {
  const { agentId } = await params;
  const users = userDataByAgent[agentId] ?? fallbackUsers;
  const agentLabel = agentLabelById[agentId] ?? agentId;

  return (
    <section className="space-y-2 text-zinc-900">
      <h1 className="text-xl font-bold">Gebruikers</h1>
      <p className="text-sm text-zinc-600">
        Gebruikers voor {agentLabel} - {users.length} gebruikers
      </p>
      <UserTable users={users} />
    </section>
  );
}
