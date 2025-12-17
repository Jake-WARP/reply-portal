interface PageProps {
  params: {
    agentId: string;
  };
}

export default function DashboardPage({ params }: PageProps) {
  return (
    <section className="space-y-2 text-zinc-900">
      <h1>Agent {params.agentId} Dashboard</h1>
      <p className="text-sm text-zinc-600">
        Dashboardpagina voor agent {params.agentId}.
      </p>
    </section>
  );
}
