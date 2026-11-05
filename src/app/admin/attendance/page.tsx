"use client";

import React from "react";
import { UserCheck, BarChart3, Clock, AlertCircle, Building } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function AdminAttendancePage() {
  const { state } = usePortalData();

  const classAttendanceSummary = [
    { className: "Class 1 — Section B", teacher: "Ms. Sneha Deshmukh", enrolled: 32, present: 31, rate: 96.8 },
    { className: "Class 4 — Section A", teacher: "Mrs. Sunita Sharma", enrolled: 36, present: 34, rate: 94.4 },
    { className: "Class 4 — Section B", teacher: "Mr. Rajesh Verma", enrolled: 35, present: 32, rate: 91.4 },
    { className: "Class 5 — Section A", teacher: "Mr. David Pinto", enrolled: 38, present: 36, rate: 94.7 },
    { className: "Class 8 — Section A", teacher: "Mrs. Mary Joseph", enrolled: 42, present: 40, rate: 95.2 },
  ];

  return (
    <PortalShell activeRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">
            Institutional Attendance Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Campus-wide student and faculty attendance metrics for Wednesday, November 04, 2026
          </p>
        </div>

        {/* 3 Overview Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Overall Student Attendance
            </span>
            <div className="text-2xl font-bold text-emerald-600">94.2%</div>
            <span className="text-[11px] text-slate-400">452 out of 480 Students in Attendance</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Faculty Attendance
            </span>
            <div className="text-2xl font-bold text-slate-900">32 / 34 Active</div>
            <span className="text-[11px] text-slate-400">2 on sanctioned medical leave</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Late Arrivals
            </span>
            <div className="text-2xl font-bold text-amber-600">14 Students</div>
            <span className="text-[11px] text-slate-400">Recorded between 08:35 and 08:45 AM</span>
          </div>
        </div>

        {/* Class-by-Class Attendance Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <h2 className="font-heading font-bold text-base text-slate-900 mb-4">
            Class-wise Morning Turn-out Breakdown
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
                  <th className="py-3 px-4 rounded-l-xl">Class & Division</th>
                  <th className="py-3 px-4">Class Teacher</th>
                  <th className="py-3 px-4">Enrolled</th>
                  <th className="py-3 px-4">Present Today</th>
                  <th className="py-3 px-4 rounded-r-xl">Turn-out Percentage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {classAttendanceSummary.map((c) => (
                  <tr key={c.className} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{c.className}</td>
                    <td className="py-3.5 px-4 text-slate-700">{c.teacher}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{c.enrolled}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600">{c.present}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{c.rate}%</span>
                        <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${c.rate}%` }} />
                        </div>
                      </div>
                    </td>
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

