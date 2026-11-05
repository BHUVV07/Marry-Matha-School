"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CreditCard, CheckCircle2, Receipt, ArrowRight, Printer, AlertCircle, Sparkles } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";
import { FeePayment } from "@/lib/portalTypes";

export default function AccountantPaymentsPage() {
  const { state, recordFeePayment } = usePortalData();

  const [selectedStudentId, setSelectedStudentId] = useState("rohan-patel");
  const [payAmount, setPayAmount] = useState("4000");
  const [payMethod, setPayMethod] = useState<FeePayment["paymentMethod"]>("Cash");
  const [chequeRef, setChequeRef] = useState(`OFFLINE-CSH-${Math.floor(100 + Math.random() * 900)}`);
  const [notes, setNotes] = useState("Term 3 Balance settlement at school fee counter");
  const [generatedReceipt, setGeneratedReceipt] = useState<FeePayment | null>(null);

  const student = state.students.find((s) => s.id === selectedStudentId) || state.students[0];
  const pendingInvoices = state.feeInvoices.filter(
    (i) => i.studentId === student.id && i.balanceDue > 0
  );
  const targetInvoice = pendingInvoices[0] || state.feeInvoices.find((i) => i.studentId === student.id);

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetInvoice) {
      alert("No pending invoice found for this student.");
      return;
    }

    const recorded = recordFeePayment({
      invoiceId: targetInvoice.id,
      studentId: student.id,
      studentName: student.fullName,
      className: `${student.className}-${student.section}`,
      amountPaid: Number(payAmount),
      paymentMethod: payMethod,
      transactionRef: chequeRef || `OFFLINE-${Math.floor(100000 + Math.random() * 900000)}`,
      cashierName: "Mr. John Fernandes (Chief Accounts Officer)",
      notes,
    });

    setGeneratedReceipt(recorded);
  };

  return (
    <PortalShell activeRole="accountant">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">
            Offline Counter Fee Payment Register
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Record physical cash, cheque, bank transfer, or counter payments. Generates official digital receipts and updates parent accounts in real-time.
          </p>
        </div>

        {/* Success Banner when payment recorded */}
        {generatedReceipt && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Payment Recorded & Official Receipt Generated!</span>
              </div>
              <span className="font-mono font-bold text-school-900 bg-white px-3 py-1 rounded-lg border border-emerald-200">
                {generatedReceipt.receiptNo}
              </span>
            </div>
            <p className="text-emerald-700 leading-relaxed">
              Amount of <strong>₹{generatedReceipt.amountPaid.toLocaleString()}</strong> received via{" "}
              <strong>{generatedReceipt.paymentMethod}</strong> for <strong>{generatedReceipt.studentName}</strong> ({generatedReceipt.className}). The parent portal fee ledger and receipts repository have been synchronized immediately.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/accountant/receipts"
                className="px-3.5 py-1.5 rounded-lg bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition-colors"
              >
                View in Verified Receipts
              </Link>
              <button
                type="button"
                onClick={() => setGeneratedReceipt(null)}
                className="text-emerald-700 font-semibold hover:underline"
              >
                Record Another Settlement
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Payment Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
            <h2 className="font-heading font-bold text-base text-slate-900 mb-4 pb-3 border-b border-slate-100">
              Counter Transaction Entry
            </h2>

            <form onSubmit={handleRecordPayment} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Student</label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => {
                    setSelectedStudentId(e.target.value);
                    const s = state.students.find((stu) => stu.id === e.target.value);
                    const inv = state.feeInvoices.find((i) => i.studentId === e.target.value && i.balanceDue > 0);
                    if (inv) setPayAmount(String(inv.balanceDue));
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-900 outline-none focus:border-school-600"
                >
                  {state.students.map((stu) => (
                    <option key={stu.id} value={stu.id}>
                      {stu.fullName} — {stu.className}-{stu.section} (Roll #{stu.rollNo} • Adm: {stu.admissionNo})
                    </option>
                  ))}
                </select>
              </div>

              {/* Outstanding Invoices Info Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Pending Invoice Target</span>
                {targetInvoice ? (
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">{targetInvoice.termTitle}</span>
                      <span className="text-slate-500 font-mono text-[11px]">{targetInvoice.invoiceNo}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase block">Balance Due</span>
                      <span className="font-bold text-amber-700 text-sm font-mono">
                        ₹{targetInvoice.balanceDue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="text-emerald-600 font-semibold">No pending balance on record!</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Amount Received (₹)</label>
                  <input
                    type="number"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    required
                    min={100}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 font-bold text-sm outline-none focus:border-school-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Payment Method</label>
                  <select
                    value={payMethod}
                    onChange={(e) => setPayMethod(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-900 outline-none focus:border-school-600"
                  >
                    <option value="Cash">Cash (Counter)</option>
                    <option value="Cheque">Bank Cheque</option>
                    <option value="Demand Draft (DD)">Demand Draft (DD)</option>
                    <option value="Bank Transfer (NEFT/RTGS)">NEFT / RTGS</option>
                    <option value="UPI">Counter UPI QR Code</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Cheque / Reference Number</label>
                <input
                  type="text"
                  value={chequeRef}
                  onChange={(e) => setChequeRef(e.target.value)}
                  required
                  placeholder="e.g. CHQ-889124 or UPI/Ref ID"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-slate-900 outline-none focus:border-school-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Cashier Remarks & Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-school-600"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-school-800 text-white font-semibold hover:bg-school-900 transition-all shadow-soft flex items-center justify-center gap-2"
                >
                  <Receipt className="w-4 h-4" />
                  <span>Record Payment & Issue Official Receipt</span>
                </button>
              </div>
            </form>
          </div>

          {/* Student Account Summary Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-sm text-slate-900">Student Account Ledger</h3>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Student:</span>
                <strong className="text-slate-900">{student.fullName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Class & Section:</span>
                <span className="text-slate-800">{student.className}-{student.section}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Admission No:</span>
                <span className="font-mono text-slate-800">{student.admissionNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Guardian Name:</span>
                <span className="text-slate-800">{student.parentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Guardian Phone:</span>
                <span className="font-mono text-slate-800">{student.parentPhone}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
              Upon submitting, the student invoice is updated, receipt number is permanently stamped, and the parent can immediately view and download the official receipt from their portal.
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

