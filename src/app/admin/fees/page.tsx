"use client";

import React from "react";
import { CreditCard, Layers, Plus, CheckCircle2 } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function AdminFeesPage() {
  const { state } = usePortalData();

  return (
    <PortalShell activeRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">
              Master Fee Structures & Configuration
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Annual fee schedules, term installments, and laboratory fee allocations for Academic Year 2026–2027
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {state.feeStructures.map((fs) => (
            <div
              key={fs.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-school-50 text-school-800 border border-school-200">
                      {fs.wing} Wing
                    </span>
                    <h2 className="text-lg font-heading font-bold text-slate-900">{fs.className}</h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Session: {fs.academicYear}</p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Annual Fee</span>
                  <span className="text-xl font-bold text-slate-900 font-mono">
                    ₹{fs.totalAnnualFee.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Fee Component Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs my-4">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Tuition Fee</span>
                  <span className="font-bold text-slate-900 text-sm">₹{fs.tuitionFee.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Computer Lab</span>
                  <span className="font-bold text-slate-900 text-sm">₹{fs.computerLabFee.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Library & Media</span>
                  <span className="font-bold text-slate-900 text-sm">₹{fs.libraryFee.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Sports Annual</span>
                  <span className="font-bold text-slate-900 text-sm">₹{fs.sportsAnnualFee.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Co-Curricular</span>
                  <span className="font-bold text-slate-900 text-sm">₹{fs.activityFee.toLocaleString()}</span>
                </div>
              </div>

              {/* Installment Breakdown */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
                  Installment Due Dates ({fs.installments.length} Terms)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                  {fs.installments.map((ins) => (
                    <div key={ins.installmentNo} className="p-2.5 rounded-lg bg-slate-50/70 border border-slate-100 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-slate-800 block">{ins.title.split(" ")[0]} {ins.title.split(" ")[1]}</span>
                        <span className="text-[10px] text-slate-400 font-mono">Due: {ins.dueDate}</span>
                      </div>
                      <span className="font-bold text-slate-900 font-mono">₹{ins.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}

