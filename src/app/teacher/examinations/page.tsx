"use client";

import React from "react";
import { Calendar, Clock, Award, Users, AlertCircle } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function TeacherExaminationsPage() {
  const { state } = usePortalData();
  const schedules = state.examSchedules.filter((s) => s.classId === "cls-4a");

  return (
    <PortalShell activeRole="teacher">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">
            Examination Schedule & Invigilation Duties
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Mid-Term Assessment 2 (2026–27) • Class 4-A Coordinator Duties
          </p>
        </div>

        {/* Invigilation Schedule Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <h2 className="font-heading font-bold text-base text-slate-900 mb-4">Paper Schedule & Room Allocation</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
                  <th className="py-3 px-4 rounded-l-xl">Date</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Timing</th>
                  <th className="py-3 px-4">Invigilation Venue</th>
                  <th className="py-3 px-4 rounded-r-xl">Max Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {schedules.map((sch) => (
                  <tr key={sch.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-900">{sch.examDate}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{sch.subject}</td>
                    <td className="py-3.5 px-4 text-slate-600">{sch.timeSlot}</td>
                    <td className="py-3.5 px-4 text-slate-600">{sch.roomNumber}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{sch.maxMarks}</td>
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

