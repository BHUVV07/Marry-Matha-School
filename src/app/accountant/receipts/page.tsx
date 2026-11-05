"use client";

import React, { useState } from "react";
import { Receipt, Search, Printer, Eye, X, CheckCircle2 } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";
import { FeePayment } from "@/lib/portalTypes";

export default function AccountantReceiptsPage() {
  const { state } = usePortalData();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeReceipt, setActiveReceipt] = useState<FeePayment | null>(null);

  const filtered = state.feePayments.filter(
    (p) =>
      p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.receiptNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.className.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PortalShell activeRole="accountant">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">Verified Official Fee Receipts</h1>
          <p className="text-xs text-slate-500 mt-1">
            Official receipt repository with digital counter seals and transaction verification
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by receipt number, student name, or class..."
            className="w-full text-xs outline-none text-slate-800 placeholder:text-slate-400"
          />
        </div>

        {/* Receipts Table */}
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
                  <th className="py-3 px-4">Amount Paid</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-school-800">{r.receiptNo}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{r.studentName}</td>
                    <td className="py-3.5 px-4 text-slate-700">{r.className}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">{r.paymentDate}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{r.paymentMethod}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-600 text-sm">
                      ₹{r.amountPaid.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setActiveReceipt(r)}
                        className="font-semibold text-school-700 hover:text-school-900 flex items-center gap-1 justify-end"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Receipt Modal */}
        {activeReceipt && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 text-xs text-slate-700">
              <div className="flex items-start justify-between pb-4 border-b-2 border-slate-900 mb-4">
                <div>
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    Mary Matha Primary School
                  </h2>
                  <p className="text-[11px] text-slate-500">Wardha Road, Civil Lines, Nagpur</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Official Fee E-Receipt & Acknowledgement
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Receipt No</span>
                  <span className="font-mono font-bold text-school-900 text-sm">{activeReceipt.receiptNo}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 mb-4">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Student</span>
                  <strong className="text-slate-900">{activeReceipt.studentName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Class</span>
                  <strong className="text-slate-900">{activeReceipt.className}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Date</span>
                  <span className="font-mono text-slate-800">{activeReceipt.paymentDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Payment Mode</span>
                  <span className="font-medium text-slate-800">{activeReceipt.paymentMethod}</span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden mb-4">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-[11px] text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-3">Description</th>
                      <th className="py-2 px-3 text-right">Amount (INR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-2 px-3">{activeReceipt.notes || "School Term Installment Fee"}</td>
                      <td className="py-2 px-3 text-right font-mono">₹{activeReceipt.amountPaid.toLocaleString()}</td>
                    </tr>
                    <tr className="bg-slate-50 font-bold text-slate-900">
                      <td className="py-2.5 px-3">Total Amount Paid</td>
                      <td className="py-2.5 px-3 text-right font-mono text-emerald-600 text-sm">
                        ₹{activeReceipt.amountPaid.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200 mb-5">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Txn Reference</span>
                  <span className="font-mono text-[11px] text-slate-600">{activeReceipt.transactionRef}</span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-700 font-bold block">Authorized Digital Seal</span>
                  <span className="text-[10px] text-slate-400">{activeReceipt.cashierName}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveReceipt(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-school-800 text-white hover:bg-school-900 shadow-soft"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalShell>
  );
}

