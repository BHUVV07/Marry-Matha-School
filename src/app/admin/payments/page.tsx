"use client";

import React, { useState } from "react";
import { Receipt, Search, Download, CheckCircle2, Filter } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function AdminPaymentsPage() {
  const { state } = usePortalData();
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = state.feePayments.filter(
    (p) =>
      p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.receiptNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.className.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCollected = filtered.reduce((acc, curr) => acc + curr.amountPaid, 0);

  return (
    <PortalShell activeRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">
              Institutional Payment Ledger & Collections
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Audit trail of all online and counter fee collections recorded by the accounts desk
            </p>
          </div>

          <button
            type="button"
            onClick={() => alert("Exporting collections CSV ledger...")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs self-start"
          >
            <Download className="w-3.5 h-3.5 text-school-600" />
            <span>Export Financial Ledger</span>
          </button>
        </div>

        {/* Search & Total Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student, receipt, or class..."
              className="w-full text-xs outline-none text-slate-800 placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-500">Filtered Total:</span>
            <span className="font-bold text-slate-900 font-mono text-base">
              ₹{totalCollected.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
                  <th className="py-3 px-4 rounded-l-xl">Receipt No</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4">Txn Reference</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Amount Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-school-800">{p.receiptNo}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{p.studentName}</td>
                    <td className="py-3.5 px-4 text-slate-700">{p.className}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">{p.paymentDate}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{p.paymentMethod}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">{p.transactionRef}</td>
                    <td className="py-3.5 px-4 text-right font-bold text-emerald-600 text-sm">
                      ₹{p.amountPaid.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

