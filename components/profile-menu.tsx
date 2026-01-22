"use client";

import { User } from "lucide-react";

export default function ProfileMenu() {
  return (
    <details className="relative">
      <summary className="flex cursor-pointer list-none items-center rounded-none border border-zinc-200 bg-white px-4 py-2 text-left transition hover:border-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/40">
        <span className="leading-tight">
          <span className="block text-sm font-semibold text-zinc-900">
            John Doe
          </span>
          <span className="block text-xs text-zinc-500">Eigenaar</span>
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-none text-zinc-700">
          <User className="size-6" aria-hidden="true" />
        </span>
      </summary>
      <div className="absolute right-0 mt-3 w-56 rounded-none border border-zinc-200 bg-white p-1 text-sm shadow-lg">
        <button
          type="button"
          className="w-full rounded-none px-3 py-2 text-left text-zinc-700 transition hover:bg-zinc-50 hover:text-zinc-900"
        >
          Mijn account
        </button>
        <div className="my-1 h-px bg-zinc-100" />
        <button
          type="button"
          className="w-full rounded-none px-3 py-2 text-left text-zinc-700 transition hover:bg-zinc-50 hover:text-zinc-900"
        >
          Log uit
        </button>
      </div>
    </details>
  );
}
