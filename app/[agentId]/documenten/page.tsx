import DocumentTable from "@/components/document-table";
import { documentDataByAgent, fallbackDocuments } from "@/data/documents";

interface PageProps {
  params: Promise<{
    agentId: string;
  }>;
}

export default async function DocumentPage({ params }: PageProps) {
  const { agentId } = await params;
  const documents = documentDataByAgent[agentId] ?? fallbackDocuments;

  return (
    <section className="space-y-6 text-zinc-900">
      <h1 className="text-xl font-bold">Documenten</h1>
      <p className="text-sm text-zinc-600">Documenten voor {agentId}.</p>
      <DocumentTable documents={documents} />
    </section>
  );
}
