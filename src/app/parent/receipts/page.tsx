"use client";

import React, { useState } from "react";
import { Receipt, Printer, Download, Eye, X, CheckCircle2, Building, ShieldCheck } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { FeePayment } from "@/lib/portalTypes";

export default function ParentReceiptsPage() {
  const { selectedChildId } = useAuth();
  const { state } = usePortalData();

  const [activeReceipt, setActiveReceipt] = useState<FeePayment | null>(null);

  const child = state.students.find((s) => s.id === selectedChildId) || state.students[0];
  const receipts = state.feePayments.filter((p) => p.studentId === child?.id);

  const handlePrint = () => {
    window.print();
  };

  return (
    <PortalShell activeRole="parent">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">Official Fee Receipts</h1>
            <p className="text-xs text-slate-500 mt-1">
              Verified tax-compliant receipts for {child?.fullName} (Class {child?.className}-{child?.section})
            </p>
          </div>
        </div>

        {/* Receipts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {receipts.map((rec) => (
            <div
              key={rec.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-school-800 bg-school-50 px-2 py-0.5 rounded border border-school-200">
                    {rec.receiptNo}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                </div>

                <div className="space-y-1 mb-4">
                  <span className="text-xs text-slate-400 block font-medium">Amount Received</span>
                  <div className="text-2xl font-bold text-slate-900">₹{rec.amountPaid.toLocaleString()}</div>
                  <p className="text-xs text-slate-600 italic mt-1">{rec.notes || "Term installment fee"}</p>
                </div>

                <div className="space-y-1 text-xs text-slate-500 pt-3 border-t border-slate-100">
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-mono text-slate-800">{rec.paymentDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Mode:</span>
                    <span className="text-slate-800 font-medium">{rec.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Authorized Cashier:</span>
                    <span className="text-slate-800">{rec.cashierName}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveReceipt(rec)}
                  className="w-full py-2 rounded-xl text-xs font-semibold bg-school-50 text-school-800 hover:bg-school-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Official Receipt</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Printable Official Receipt Modal */}
        {activeReceipt && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 text-xs text-slate-700">
              {/* Receipt Header */}
              <div className="flex items-start justify-between pb-4 border-b-2 border-slate-900 mb-4">
                <div>
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    Mary Matha Primary School
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Affiliated Institution • Wardha Road, Civil Lines, Nagpur
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Official Fee E-Receipt & Acknowledgement
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Receipt No</span>
                  <span className="font-mono font-bold text-school-900 text-sm">
                    {activeReceipt.receiptNo}
                  </span>
                </div>
              </div>

              {/* Student & Payment Summary */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 mb-4">
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-medium">Student Name</span>
                  <span className="font-bold text-slate-900">{activeReceipt.studentName}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-medium">Class & Section</span>
                  <span className="font-bold text-slate-900">{activeReceipt.className}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-medium">Payment Date</span>
                  <span className="font-mono text-slate-800">{activeReceipt.paymentDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-medium">Payment Method</span>
                  <span className="font-medium text-slate-800">{activeReceipt.paymentMethod}</span>
                </div>
              </div>

              {/* Amount Breakdown */}
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

              {/* Authorized Seal & Signature */}
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

              {/* Action Buttons */}
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
                  onClick={handlePrint}
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

