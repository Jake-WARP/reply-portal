interface PageProps {
  params: {
    agentId: string;
  };
}

export default async function DashboardPage({ params }: PageProps) {
  const { agentId } = await params;

  return (
    <section className="space-y-2 text-zinc-900">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <p className="text-sm text-zinc-600">
        Overzicht voor agent {agentId}.
      </p>
    </section>
  );
}
