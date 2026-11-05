"use client";

import React from "react";
import { FileText, Download, BarChart3, Users, CreditCard } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";

const reports = [
  {
    title: "Consolidated Annual Student Strength Report",
    category: "Enrollment & Demographics",
    desc: "Class-wise and wing-wise enrollment numbers, gender distribution, and category statistics.",
    format: "PDF / CSV",
  },
  {
    title: "Fee Realization & Outstanding Receivables Ledger",
    category: "Financial Reconciliation",
    desc: "Comprehensive collection figures vs billed amounts, term dues breakdown, and defaulter lists.",
    format: "Excel / PDF",
  },
  {
    title: "Campus-Wide Cumulative Attendance Register",
    category: "Academic & Compliance",
    desc: "Term-level attendance averages for CBSE/State compliance and punctuality benchmarks.",
    format: "CSV",
  },
  {
    title: "Admissions Conversion Funnel Audit",
    category: "Admissions & Strategy",
    desc: "Inquiry to enrollment conversion rates by grade, source, and interview clearance velocity.",
    format: "PDF",
  },
];

export default function AdminReportsPage() {
  const handleExport = (name: string) => {
    alert(`Generating export for "${name}"... In production, verified data downloads as CSV/PDF.`);
  };

  return (
    <PortalShell activeRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">Institutional Analytics & Reports</h1>
          <p className="text-xs text-slate-500 mt-1">
            Official executive exports for auditing, compliance, and academic review
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((rep) => (
            <div
              key={rep.title}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-school-50 text-school-800 border border-school-200">
                  {rep.category}
                </span>
                <h3 className="font-heading font-bold text-base text-slate-900 mt-2">{rep.title}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{rep.desc}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">{rep.format}</span>
                <button
                  type="button"
                  onClick={() => handleExport(rep.title)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-school-800 text-white hover:bg-school-900 transition-colors shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Generate Report</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}

