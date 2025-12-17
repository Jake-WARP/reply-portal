interface PageProps {
  params: {
    agentId: string;
  };
}

export default function UserPage({ params }: PageProps) {
  return (
    <section className="space-y-2 text-zinc-900">
      <h1>Agent {params.agentId} User</h1>
      <p className="text-sm text-zinc-600">
        Gebruikerspagina voor agent {params.agentId}.
      </p>
    </section>
  );
}
