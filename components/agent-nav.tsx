"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

type PageLink = {
  slug: string;
  label: string;
};

interface AgentNavProps {
  currentAgent: string;
  pageLinks: PageLink[];
}

export default function AgentNav({ currentAgent, pageLinks }: AgentNavProps) {
  const segment = useSelectedLayoutSegment();
  const activeSlug = segment ?? "dashboard";

  return (
    <nav className="flex self-stretch items-stretch gap-4 text-sm font-semibold text-zinc-700">
      {pageLinks.map((page) => {
        const isActive = page.slug === activeSlug;

        return (
          <Link
            key={page.slug}
            href={`/${currentAgent}/${page.slug}`}
            aria-current={isActive ? "page" : undefined}
            className={`flex items-center border-b-2 px-2 transition ${
              isActive
                ? "border-zinc-900 text-zinc-950"
                : "border-transparent text-zinc-500 hover:text-zinc-900 focus-visible:text-zinc-900"
            }`}
          >
            {page.label}
          </Link>
        );
      })}
    </nav>
  );
}
