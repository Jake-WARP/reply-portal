"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent } from "react";

type AgentOption = {
  id: string;
  label: string;
};

interface AgentDropdownProps {
  agents: AgentOption[];
  currentAgent: string;
}

export default function AgentDropdown({
  agents,
  currentAgent,
}: AgentDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextAgent = event.target.value;

    if (nextAgent === currentAgent) {
      return;
    }

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) {
      router.push(`/${nextAgent}`);
      return;
    }

    segments[0] = nextAgent;
    const destination = `/${segments.join("/")}`;

    router.push(destination);
  };

  return (
    <div className="flex items-center gap-3">
      <select
        aria-label="Selecteer agent"
        value={currentAgent}
        onChange={handleChange}
        className="rounded-none border border-zinc-200 bg-white px-3 py-2 font-semibold text-zinc-900  transition focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400/30"
      >
        {agents.map((agent) => (
          <option key={agent.id} value={agent.id}>
            {agent.label}
          </option>
        ))}
      </select>
    </div>
  );
}
