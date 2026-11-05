"use client";

import React from "react";
import { UserCheck, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";
import { cn } from "@/lib/utils";

export default function StudentAttendancePage() {
  const { state } = usePortalData();

  const student = state.students.find((s) => s.id === "rohan-patel") || state.students[0];
  const records = state.attendanceRecords.filter((r) => r.studentId === student.id);

  return (
    <PortalShell activeRole="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">My Attendance & Punctuality</h1>
          <p className="text-xs text-slate-500 mt-1">
            Official check-in record for Class 4-A • St. Gabriel House
          </p>
        </div>

        {/* Attendance Percentage Meter */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl border border-emerald-100">
              <UserCheck className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                Cumulative Attendance
              </span>
              <div className="text-2xl font-bold text-slate-900">{student.attendancePercentage}%</div>
              <p className="text-xs text-emerald-700 font-medium">Eligible for annual 100% Punctuality Award</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="text-center p-3 rounded-xl bg-slate-50 border border-slate-100 min-w-20">
              <span className="font-bold text-slate-900 text-lg block">128</span>
              <span className="text-slate-400 text-[10px] uppercase">Days Present</span>
            </div>
            <div className="text-center p-3 rounded-xl bg-slate-50 border border-slate-100 min-w-20">
              <span className="font-bold text-amber-600 text-lg block">3</span>
              <span className="text-slate-400 text-[10px] uppercase">Late Days</span>
            </div>
            <div className="text-center p-3 rounded-xl bg-slate-50 border border-slate-100 min-w-20">
              <span className="font-bold text-rose-600 text-lg block">4</span>
              <span className="text-slate-400 text-[10px] uppercase">Excused Days</span>
            </div>
          </div>
        </div>

        {/* Daily Log Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <h2 className="font-heading font-bold text-base text-slate-900 mb-4">Daily Attendance History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
                  <th className="py-3 px-4 rounded-l-xl">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Arrival Time</th>
                  <th className="py-3 px-4 rounded-r-xl">Teacher Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-800">{r.date}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={cn(
                          "px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize inline-flex items-center gap-1",
                          r.status === "present"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : r.status === "late"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        )}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{r.timestamp || "08:30 AM"}</td>
                    <td className="py-3.5 px-4 text-slate-500 italic">{r.remarks || "Regular session"}</td>
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

