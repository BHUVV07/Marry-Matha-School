"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CreditCard, CheckCircle2, Receipt, ArrowRight, ShieldCheck, Download, X } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { FeePayment } from "@/lib/portalTypes";

export default function ParentPaymentsPage() {
  const { selectedChildId } = useAuth();
  const { state, recordFeePayment } = usePortalData();

  const [showPayModal, setShowPayModal] = useState(false);
  const [payAmount, setPayAmount] = useState("4000");
  const [payMethod, setPayMethod] = useState<FeePayment["paymentMethod"]>("UPI");
  const [recentReceipt, setRecentReceipt] = useState<FeePayment | null>(null);

  const child = state.students.find((s) => s.id === selectedChildId) || state.students[0];
  const payments = state.feePayments.filter((p) => p.studentId === child?.id);
  const dueInvoice = state.feeInvoices.find((i) => i.studentId === child?.id && i.balanceDue > 0);

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dueInvoice) return;

    const recorded = recordFeePayment({
      invoiceId: dueInvoice.id,
      studentId: child.id,
      studentName: child.fullName,
      className: `${child.className}-${child.section}`,
      amountPaid: Number(payAmount),
      paymentMethod: payMethod,
      transactionRef: `ONLINE-UPI-${Math.floor(100000 + Math.random() * 900000)}`,
      cashierName: "Online Payment Gateway (HDFC)",
      notes: "Online parent settlement",
    });

    setRecentReceipt(recorded);
    setShowPayModal(false);
  };

  return (
    <PortalShell activeRole="parent">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">Payment Transactions</h1>
            <p className="text-xs text-slate-500 mt-1">
              Payment history and digital fee receipts for {child?.fullName}
            </p>
          </div>

          {dueInvoice && (
            <button
              type="button"
              onClick={() => setShowPayModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-school-800 text-white hover:bg-school-900 shadow-soft self-start"
            >
              <CreditCard className="w-4 h-4" />
              <span>Pay Outstanding Dues (₹{dueInvoice.balanceDue.toLocaleString()})</span>
            </button>
          )}
        </div>

        {/* Success Banner if recently paid */}
        {recentReceipt && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold">Payment of ₹{recentReceipt.amountPaid.toLocaleString()} Recorded Successfully!</p>
                <p className="text-[11px] text-emerald-700">Receipt No: {recentReceipt.receiptNo} • Invoice updated to Paid.</p>
              </div>
            </div>
            <Link
              href="/parent/receipts"
              className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 text-xs"
            >
              View Receipt
            </Link>
          </div>
        )}

        {/* Payments Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <h2 className="font-heading font-bold text-base text-slate-900">Transaction History</h2>
            <span className="text-xs text-slate-400">Total {payments.length} Payments Recorded</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
                  <th className="py-3 px-4 rounded-l-xl">Receipt No</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Mode / Method</th>
                  <th className="py-3 px-4">Reference / Txn ID</th>
                  <th className="py-3 px-4">Amount Paid</th>
                  <th className="py-3 px-4">Authorized By</th>
                  <th className="py-3 px-4 rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-school-800">{p.receiptNo}</td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono">{p.paymentDate}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{p.paymentMethod}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">{p.transactionRef}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600 text-sm">
                      ₹{p.amountPaid.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{p.cashierName}</td>
                    <td className="py-3.5 px-4">
                      <Link
                        href="/parent/receipts"
                        className="font-semibold text-school-700 hover:text-school-900 flex items-center gap-1"
                      >
                        <Receipt className="w-3.5 h-3.5" />
                        <span>Receipt</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Online Payment Simulator Modal */}
        {showPayModal && dueInvoice && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-heading font-bold text-base text-slate-900">
                  Online School Fee Payment
                </h3>
                <button
                  type="button"
                  onClick={() => setShowPayModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSimulatePayment} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Invoice Selected</label>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="font-bold text-slate-900">{dueInvoice.termTitle}</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Invoice: {dueInvoice.invoiceNo} • Pending Balance: ₹{dueInvoice.balanceDue.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Amount to Pay (₹)</label>
                  <input
                    type="number"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    max={dueInvoice.balanceDue}
                    min="500"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 outline-none focus:border-school-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["UPI", "Bank Transfer (NEFT/RTGS)", "Cash"] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPayMethod(method)}
                        className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                          payMethod === method
                            ? "bg-school-50 border-school-600 text-school-900 shadow-2xs"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {method.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPayModal(false)}
                    className="px-4 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl font-semibold bg-school-800 text-white hover:bg-school-900 shadow-soft"
                  >
                    Confirm & Settle ₹{Number(payAmount).toLocaleString()}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PortalShell>
  );
}

