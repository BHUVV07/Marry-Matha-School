"use client";

import React from "react";
import { BarChart3, Download, FileText, CreditCard, PieChart } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";

const finReports = [
  {
    title: "Quarterly Fee Realization & Collection Reconciliation",
    period: "Term 1 & Term 2 (June – Nov 2026)",
    collected: "₹18,40,000",
    outstanding: "₹3,60,000",
    realization: "83.6%",
  },
  {
    title: "Counter Cash & Daily Bank Deposit Log",
    period: "Daily Closing • November 04, 2026",
    collected: "₹18,000",
    outstanding: "₹0",
    realization: "100%",
  },
  {
    title: "Annual Laboratory & Activity Fund Audit",
    period: "Academic Year 2026–2027",
    collected: "₹3,80,000",
    outstanding: "₹45,000",
    realization: "89.4%",
  },
];

export default function AccountantReportsPage() {
  const handleExport = (title: string) => {
    alert(`Exporting "${title}" audit report...`);
  };

  return (
    <PortalShell activeRole="accountant">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">Financial Reports & Reconciliation</h1>
            <p className="text-xs text-slate-500 mt-1">
              Audit reports, realization summaries, and bank deposit reconciliations
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {finReports.map((r) => (
            <div
              key={r.title}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <span className="text-xs text-slate-400 font-mono block">{r.period}</span>
                <h3 className="font-heading font-bold text-base text-slate-900 mt-1">{r.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-2">
                  <span>Collected: <strong className="text-emerald-600">{r.collected}</strong></span>
                  <span>•</span>
                  <span>Outstanding: <strong className="text-amber-700">{r.outstanding}</strong></span>
                  <span>•</span>
                  <span>Realization Rate: <strong className="text-slate-900">{r.realization}</strong></span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleExport(r.title)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-school-800 text-white hover:bg-school-900 transition-colors shadow-2xs self-start"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Audit</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}

