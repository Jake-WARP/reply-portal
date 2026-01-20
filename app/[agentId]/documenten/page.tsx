import DocumentTable from "@/components/document-table";
import { agentLabelById } from "@/data/agents";
import { documentDataByAgent, fallbackDocuments } from "@/data/documents";

interface PageProps {
  params: Promise<{
    agentId: string;
  }>;
}

export default async function DocumentPage({ params }: PageProps) {
  const { agentId } = await params;
  const documents = documentDataByAgent[agentId] ?? fallbackDocuments;
  const agentLabel = agentLabelById[agentId] ?? agentId;

  return (
    <section className="space-y-2 text-zinc-900">
      <h1 className="text-xl font-bold">Documenten</h1>
      <p className="text-sm text-zinc-600">
        Documenten voor {agentLabel} - {documents.length} documenten.
      </p>
      <DocumentTable documents={documents} />
    </section>
  );
}
