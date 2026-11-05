"use client";

import React from "react";
import Link from "next/link";
import {
  Calculator,
  CreditCard,
  Receipt,
  Users,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
  BarChart3,
} from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function AccountantDashboardPage() {
  const { state } = usePortalData();

  const totalBilled = 2200000;
  const totalReceived = 1840000;
  const totalPending = 360000;
  const thisMonth = 325000;

  return (
    <PortalShell activeRole="accountant">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-school-900 via-school-800 to-navy-950 text-white rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-500 text-white flex items-center justify-center font-bold text-2xl shadow-soft">
              JF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30">
                  Bursar & Finance Office
                </span>
                <span className="text-xs text-slate-300">Mr. John Fernandes</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-heading font-bold text-white mt-1">
                Fee Collection & Accounts Desk
              </h1>
              <p className="text-xs text-slate-300 mt-0.5">
                Official cashier register, offline fee settlement, and financial audit reconciliation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
            <Link
              href="/accountant/payments"
              className="px-4 py-2.5 rounded-xl bg-amber-400 text-navy-950 font-bold text-xs hover:bg-amber-300 transition-colors shadow-soft flex items-center gap-1.5"
            >
              <CreditCard className="w-4 h-4" />
              <span>Record Offline Payment</span>
            </Link>
          </div>
        </div>

        {/* 4 Financial KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Annual Billed
              </span>
              <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
                <Calculator className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono">
              ₹{totalBilled.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">480 Students • 4 Terms</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Collections
              </span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-emerald-600 font-mono">
              ₹{totalReceived.toLocaleString()}
            </div>
            <p className="text-xs text-emerald-600 font-medium mt-1">83.6% Collection Realized</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Outstanding Dues
              </span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <AlertCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-amber-600 font-mono">
              ₹{totalPending.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">Term 3 & 4 pending</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Collections This Month
              </span>
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                <Receipt className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono">
              ₹{thisMonth.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">November 2026</p>
          </div>
        </div>

        {/* 2-Column Workspace: Quick Actions & Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8 cols): Recent Settlements */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-heading font-bold text-base text-slate-900">
                    Recent Collections & Counter Settlements
                  </h2>
                  <p className="text-xs text-slate-500">Live transaction stream with receipt codes</p>
                </div>
                <Link
                  href="/accountant/receipts"
                  className="text-xs font-semibold text-school-700 hover:text-school-900 flex items-center gap-1"
                >
                  <span>Receipts Log</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {state.feePayments.map((p) => (
                  <div key={p.id} className="py-3 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{p.studentName}</span>
                        <span className="text-[11px] font-mono text-school-800 bg-school-50 px-2 py-0.5 rounded border border-school-200">
                          {p.receiptNo}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500">
                        {p.className} • {p.paymentMethod} • Ref: {p.transactionRef}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-emerald-600 text-sm font-mono block">
                        ₹{p.amountPaid.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{p.paymentDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Quick Cashier Actions & Defaulters Alert */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <h3 className="font-heading font-bold text-sm text-slate-900 mb-3">Counter Actions</h3>
              <div className="space-y-2 text-xs">
                <Link
                  href="/accountant/payments"
                  className="w-full p-3 rounded-xl bg-school-50 hover:bg-school-100 text-school-900 font-semibold transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-school-700" />
                    <span>Record Offline Payment</span>
                  </div>
                  <Plus className="w-3.5 h-3.5 text-school-600" />
                </Link>

                <Link
                  href="/accountant/student-fees"
                  className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-500" />
                    <span>Student Fee Ledger</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  href="/accountant/reports"
                  className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-slate-500" />
                    <span>Financial Reports</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Overdue Alert Widget */}
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                <span>Term 3 Due Date Alert</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Term 3 fee installment deadline is <strong>December 15, 2026</strong>. 48 students currently have partial or pending invoices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
