"use client";

import React from "react";
import { CreditCard, Layers, Plus } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function AccountantFeesPage() {
  const { state } = usePortalData();

  return (
    <PortalShell activeRole="accountant">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">Master Fee Schedules & Structures</h1>
          <p className="text-xs text-slate-500 mt-1">
            Grade-wise fee breakups and installment schedules • Financial Session 2026–2027
          </p>
        </div>

        <div className="space-y-4">
          {state.feeStructures.map((fs) => (
            <div
              key={fs.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                      {fs.wing} Wing
                    </span>
                    <h2 className="text-base font-heading font-bold text-slate-900">{fs.className}</h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Session: {fs.academicYear}</p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Annual Fee</span>
                  <span className="text-lg font-bold text-slate-900 font-mono">
                    ₹{fs.totalAnnualFee.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs my-4">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Tuition</span>
                  <span className="font-bold text-slate-900 font-mono">₹{fs.tuitionFee.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Computer Lab</span>
                  <span className="font-bold text-slate-900 font-mono">₹{fs.computerLabFee.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Library</span>
                  <span className="font-bold text-slate-900 font-mono">₹{fs.libraryFee.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Sports</span>
                  <span className="font-bold text-slate-900 font-mono">₹{fs.sportsAnnualFee.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Activity</span>
                  <span className="font-bold text-slate-900 font-mono">₹{fs.activityFee.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}

