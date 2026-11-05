"use client";

import React from "react";
import { FolderOpen, FileText, Download, Calendar, ShieldCheck, CheckCircle2 } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";

const docs = [
  {
    id: "doc-1",
    title: "Annual Academic Calendar & Holiday List 2026–2027",
    category: "Academic",
    size: "1.4 MB",
    format: "PDF",
    description: "Term schedules, parent-teacher meeting dates, seasonal vacation periods, and annual examinations schedule.",
  },
  {
    id: "doc-2",
    title: "School Diary & Parent Handbook Guidelines",
    category: "Policy",
    size: "2.1 MB",
    format: "PDF",
    description: "Code of student conduct, uniform codes, attendance regulations, and disciplinary guidelines.",
  },
  {
    id: "doc-3",
    title: "Student Medical Emergency & Fitness Form",
    category: "Health & Safety",
    size: "540 KB",
    format: "PDF",
    description: "Required annual fitness disclosure for physical education and school excursion participation.",
  },
  {
    id: "doc-4",
    title: "Bonafide & Character Certificate Request Form",
    category: "Administrative",
    size: "380 KB",
    format: "PDF",
    description: "Application template for passport, visa, or educational scholarship verification.",
  },
  {
    id: "doc-5",
    title: "School Bus Transport Route & Pick-up Timing Schedule",
    category: "Logistics",
    size: "890 KB",
    format: "PDF",
    description: "Detailed bus stops, driver contact directory, and GPS tracking helpline numbers for Wardha Road routes.",
  },
];

export default function ParentDocumentsPage() {
  const handleDownload = (title: string) => {
    alert(`Downloading "${title}"... In production, verified PDF opens from Cloud Storage.`);
  };

  return (
    <PortalShell activeRole="parent">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">Institutional Documents & Downloads</h1>
          <p className="text-xs text-slate-500 mt-1">
            Official forms, policy handbooks, and academic schedules from Mary Matha Primary School
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-school-50 text-school-800 border border-school-200">
                    {doc.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {doc.format} • {doc.size}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-sm text-slate-900 leading-snug">
                  {doc.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {doc.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified 2026–27</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleDownload(doc.title)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-school-800 text-white hover:bg-school-900 transition-colors shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}

