"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import type { DocumentRow } from "@/data/documents";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Check, Clock, Eye, Upload } from "lucide-react";

type DocumentTableProps = {
  documents: DocumentRow[];
};

export default function DocumentTable({ documents }: DocumentTableProps) {
  const [localDocuments, setLocalDocuments] = useState<DocumentRow[]>(documents);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setLocalDocuments(documents);
  }, [documents]);
  const columns = useMemo<ColumnDef<DocumentRow>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Naam",
        cell: ({ row }) => (
          <span>{row.original.title}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "owner",
        header: "Bewerker",
      },
      {
        accessorKey: "lastUpdatedRaw",
        header: "Laatst bewerkt",
        cell: ({ row }) => row.original.lastUpdatedLabel,
        sortingFn: "datetime",
      },
    ],
    []
  );

  const steps = [
    { label: "Uploaden", icon: Upload },
    { label: "Scannen", icon: Eye },
    { label: "Beoordelen", icon: Clock },
    { label: "Goedgekeurd", icon: Check },
  ];
  const progressWidths = ["w-1/4", "w-1/2", "w-3/4", "w-full"];

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setCurrentFile(file.name);
    setIsProcessing(true);
    setActiveStep(0);

    let step = 0;
    const interval = window.setInterval(() => {
      step += 1;
      if (step >= steps.length) {
        window.clearInterval(interval);
        const now = new Date();
        setLocalDocuments((prev) => [
          {
            id: `upload-${now.getTime()}`,
            title: file.name,
            status: "Actief",
            owner: "John Doe",
            lastUpdatedLabel: "Zojuist",
            lastUpdatedRaw: now.toISOString(),
          },
          ...prev,
        ]);
        setTimeout(() => {
          setIsProcessing(false);
          setCurrentFile(null);
          setActiveStep(0);
        }, 1200);
        return;
      }
      setActiveStep(step);
    }, 900);

    event.target.value = "";
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={localDocuments}
        searchPlaceholder="Zoeken naar documenten..."
        emptyLabel="Geen documenten gevonden."
        toolbarContent={
          <>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              aria-label="Document uploaden"
            />
            <Button
              type="button"
              className="gap-2 text-sm font-semibold text-white"
              onClick={handleUploadClick}
            >
              <Upload className="size-5" aria-hidden="true" />
              Uploaden
            </Button>
          </>
        }
      />
      {isProcessing && (
        <div className="fixed bottom-6 left-6 z-50 w-[340px] rounded-xl border border-zinc-200 bg-white p-5 shadow-lg">
          <p className="text-sm text-zinc-500">Verwerken van document(en)</p>
          <p className="mt-1 text-sm font-semibold text-zinc-900">
            {currentFile ?? "Nieuw document"}
          </p>
          <div className="mt-4 space-y-3 text-sm">
            {steps.map((step, index) => {
              const isDone = index < activeStep;
              const isActive = index === activeStep;
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      isDone
                        ? "bg-emerald-500 text-white"
                        : isActive
                        ? "bg-blue-500 text-white"
                        : "bg-zinc-100 text-zinc-400"
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span
                    className={`flex-1 ${
                      isDone || isActive ? "text-zinc-900" : "text-zinc-400"
                    }`}
                  >
                    {step.label}
                  </span>
                  {isDone ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500 text-emerald-500">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="mt-4 h-2 w-full rounded-full bg-zinc-100">
            <div
              className={`h-full rounded-full bg-blue-500 transition-all ${
                progressWidths[Math.min(activeStep, progressWidths.length - 1)]
              }`}
            />
          </div>
        </div>
      )}
    </>
  );
}
