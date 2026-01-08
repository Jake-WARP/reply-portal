import AgentDropdown from "@/components/agent-dropdown";
import AgentNav from "@/components/agent-nav";
import Link from "next/link";

const agents = [
  { id: "bumperbuddy", label: "BumperBuddy" },
  { id: "fietsfix", label: "FietsFix" },
];

const pageLinks = [
  { slug: "dashboard", label: "Dashboard" },
  { slug: "documenten", label: "Documenten" },
  { slug: "gebruikers", label: "Gebruikers" },
];

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    agentId: string;
  }>;
}

export default async function AgentLayout({ children, params }: LayoutProps) {
  const { agentId: currentAgent } = await params;

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <Link
              href={`/${currentAgent}/dashboard`}
              className="text-2xl font-semibold text-zinc-900"
            >
              Reply
            </Link>
            <AgentDropdown agents={agents} currentAgent={currentAgent} />
            <AgentNav pageLinks={pageLinks} currentAgent={currentAgent} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[90rem] px-6 py-8">{children}</main>
    </div>
  );
}
