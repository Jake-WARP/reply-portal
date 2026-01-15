"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import type { DocumentRow } from "@/data/documents";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

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
          <span className="font-medium">{row.original.title}</span>
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

  const steps = ["Uploaden", "Scannen", "Beoordelen", "Goedgekeurd"];

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
            owner: "Jake Doe",
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
            />
            <Button
              type="button"
              className="gap-2 text-sm font-semibold text-white"
              onClick={handleUploadClick}
            >
              <Upload className="h-4 w-4" aria-hidden="true" />
              Uploaden
            </Button>
          </>
        }
      />
      {isProcessing && (
        <div className="fixed bottom-6 left-6 z-50 w-[320px] rounded-lg border border-zinc-200 bg-white p-4 shadow-lg">
          <p className="text-sm font-semibold text-zinc-900">
            {currentFile ?? "Nieuw document"}
          </p>
          <div className="mt-3 space-y-2 text-sm">
            {steps.map((stepLabel, index) => (
              <div key={stepLabel} className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    index <= activeStep ? "bg-emerald-500" : "bg-zinc-200"
                  }`}
                />
                <span
                  className={
                    index <= activeStep ? "text-zinc-900" : "text-zinc-500"
                  }
                >
                  {stepLabel}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 h-1.5 w-full rounded-full bg-zinc-100">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{
                width: `${((activeStep + 1) / steps.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
