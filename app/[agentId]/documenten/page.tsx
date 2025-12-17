interface PageProps {
  params: {
    agentId: string;
  };
}


export default function DocumentPage({ params }: PageProps) {
  return (
    <section className="space-y-2 text-zinc-900">
      <h1>Agent {params.agentId} Document</h1>
      <p className="text-sm text-zinc-600">
        Documentenpagina voor agent {params.agentId}.
      </p>
    </section>
  );
}
