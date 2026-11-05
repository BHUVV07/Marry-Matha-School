"use client";

import React, { useState } from "react";
import { UserCheck, Calendar, Clock, AlertCircle, CheckCircle2, Filter, FileText, Download } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { cn } from "@/lib/utils";

export default function ParentAttendancePage() {
  const { selectedChildId } = useAuth();
  const { state } = usePortalData();

  const [filterStatus, setFilterStatus] = useState<string>("all");

  const child = state.students.find((s) => s.id === selectedChildId) || state.students[0];
  const records = state.attendanceRecords.filter((r) => r.studentId === child?.id);

  const filteredRecords = records.filter((r) => {
    if (filterStatus === "all") return true;
    return r.status === filterStatus;
  });

  const presentCount = records.filter((r) => r.status === "present").length;
  const lateCount = records.filter((r) => r.status === "late").length;
  const absentCount = records.filter((r) => r.status === "absent").length;

  return (
    <PortalShell activeRole="parent">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">
              Attendance Register: {child?.fullName}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Class {child?.className}-{child?.section} • Academic Year 2026–2027
            </p>
          </div>

          <button
            type="button"
            onClick={() => alert(`Attendance Certificate generated for ${child?.fullName}`)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs self-start"
          >
            <Download className="w-3.5 h-3.5 text-school-600" />
            <span>Download Monthly Report</span>
          </button>
        </div>

        {/* 4 Attendance Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Term Percentage
            </span>
            <div className="text-2xl font-bold text-emerald-600">{child?.attendancePercentage}%</div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${child?.attendancePercentage}%` }} />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Days Present
            </span>
            <div className="text-2xl font-bold text-slate-900">{presentCount || 128}</div>
            <span className="text-[11px] text-slate-400">Punctual arrivals</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Late Arrivals
            </span>
            <div className="text-2xl font-bold text-amber-600">{lateCount || 3}</div>
            <span className="text-[11px] text-slate-400">Within grace period</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Days Absent
            </span>
            <div className="text-2xl font-bold text-rose-600">{absentCount || 4}</div>
            <span className="text-[11px] text-slate-400">Leave applications filed</span>
          </div>
        </div>

        {/* Attendance Log Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="font-heading font-bold text-base text-slate-900">Day-by-Day Log</h2>
              <p className="text-xs text-slate-500">Recorded by Class Teacher Mrs. Sunita Sharma</p>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="text-xs border border-slate-200 rounded-xl px-3 py-1.5 bg-white text-slate-700 outline-none focus:border-school-600"
              >
                <option value="all">All Statuses</option>
                <option value="present">Present Only</option>
                <option value="late">Late Only</option>
                <option value="absent">Absent Only</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
                  <th className="py-3 px-4 rounded-l-xl">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Check-in Time</th>
                  <th className="py-3 px-4">Marked By</th>
                  <th className="py-3 px-4 rounded-r-xl">Teacher Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-slate-800">{r.date}</td>
                      <td className="py-3 px-4">
                        <span
                          className={cn(
                            "px-2.5 py-1 rounded-full text-[11px] font-bold capitalize inline-flex items-center gap-1.5",
                            r.status === "present"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : r.status === "late"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          )}
                        >
                          <span
                            className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              r.status === "present" ? "bg-emerald-500" : r.status === "late" ? "bg-amber-500" : "bg-rose-500"
                            )}
                          />
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{r.timestamp || "08:30 AM"}</td>
                      <td className="py-3 px-4 text-slate-600">Mrs. Sunita Sharma</td>
                      <td className="py-3 px-4 text-slate-500 italic">
                        {r.remarks || "Regular session"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      No records match the selected filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

