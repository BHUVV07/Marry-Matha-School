"use client";

import React from "react";
import Link from "next/link";
import { CreditCard, CheckCircle2, Clock, AlertCircle, FileText, ArrowRight, ShieldCheck } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { cn } from "@/lib/utils";

export default function ParentFeesPage() {
  const { selectedChildId } = useAuth();
  const { state } = usePortalData();

  const child = state.students.find((s) => s.id === selectedChildId) || state.students[0];
  const invoices = state.feeInvoices.filter((i) => i.studentId === child?.id);
  const feeStructure = state.feeStructures.find((f) => f.className === child?.className) || state.feeStructures[0];

  const totalBilled = invoices.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalPaid = invoices.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const totalDue = invoices.reduce((acc, curr) => acc + curr.balanceDue, 0);

  return (
    <PortalShell activeRole="parent">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">Fee Invoices & Dues</h1>
            <p className="text-xs text-slate-500 mt-1">
              Annual fee structure and installment tracking for {child?.fullName} (Class {child?.className})
            </p>
          </div>

          <Link
            href="/parent/payments"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-school-800 text-white hover:bg-school-900 shadow-soft self-start"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay Online / View Ledger</span>
          </Link>
        </div>

        {/* 3 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Total Annual Billed
            </span>
            <div className="text-2xl font-bold text-slate-900">₹{totalBilled.toLocaleString()}</div>
            <span className="text-[11px] text-slate-400">4 Terms (2026–27)</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Total Amount Paid
            </span>
            <div className="text-2xl font-bold text-emerald-600">₹{totalPaid.toLocaleString()}</div>
            <span className="text-[11px] text-emerald-600/80 font-medium">Verified by Bursar</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Outstanding Dues
            </span>
            <div className="text-2xl font-bold text-amber-600">
              {totalDue > 0 ? `₹${totalDue.toLocaleString()}` : "Settled (₹0)"}
            </div>
            <span className="text-[11px] text-slate-400">
              {totalDue > 0 ? "Next Due: 15 Dec 2026" : "All terms cleared"}
            </span>
          </div>
        </div>

        {/* Installment Invoices Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 className="font-heading font-bold text-base text-slate-900">Term Installments</h2>
              <p className="text-xs text-slate-500">Scheduled fee payments for the current academic session</p>
            </div>
            <Link href="/parent/receipts" className="text-xs font-semibold text-school-700 hover:underline">
              Download Receipts &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
                  <th className="py-3 px-4 rounded-l-xl">Invoice No</th>
                  <th className="py-3 px-4">Term Description</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Total Amount</th>
                  <th className="py-3 px-4">Paid</th>
                  <th className="py-3 px-4">Balance</th>
                  <th className="py-3 px-4 rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-900">{inv.invoiceNo}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{inv.termTitle}</td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono">{inv.dueDate}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">₹{inv.totalAmount.toLocaleString()}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600">₹{inv.paidAmount.toLocaleString()}</td>
                    <td className="py-3.5 px-4 font-bold text-amber-700">₹{inv.balanceDue.toLocaleString()}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1",
                          inv.status === "Paid"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : inv.status === "Partial"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-slate-100 text-slate-700"
                        )}
                      >
                        {inv.status === "Paid" && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        {inv.status === "Partial" && <Clock className="w-3 h-3 text-amber-600" />}
                        <span>{inv.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Master Fee Breakdown Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <h2 className="font-heading font-bold text-base text-slate-900 mb-3">
            Annual Fee Structure Breakdown: {feeStructure.className}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Tuition Fee</span>
              <span className="font-bold text-slate-900 text-sm">₹{feeStructure.tuitionFee.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Computer Lab</span>
              <span className="font-bold text-slate-900 text-sm">₹{feeStructure.computerLabFee.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Library & Media</span>
              <span className="font-bold text-slate-900 text-sm">₹{feeStructure.libraryFee.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Sports & Physical</span>
              <span className="font-bold text-slate-900 text-sm">₹{feeStructure.sportsAnnualFee.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Co-Curricular</span>
              <span className="font-bold text-slate-900 text-sm">₹{feeStructure.activityFee.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

