"use client";

import React, { useState } from "react";
import { Clock, Calendar, Building, User } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function AdminTimetablePage() {
  const { state } = usePortalData();
  const [selectedClass, setSelectedClass] = useState("cls-4a");

  const timetable = state.timetable.filter((t) => t.classId === selectedClass && t.dayOfWeek === "Wednesday");

  return (
    <PortalShell activeRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">Master Academic Timetable</h1>
            <p className="text-xs text-slate-500 mt-1">
              Class period schedules and room allocation matrix • Wednesday
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700">Select Class:</span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-800 outline-none focus:border-school-600"
            >
              <option value="cls-4a">Class 4 — Section A</option>
              <option value="cls-1b">Class 1 — Section B</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <h2 className="font-heading font-bold text-base text-slate-900 mb-4 pb-3 border-b border-slate-100">
            Wednesday Period Schedule
          </h2>

          <div className="space-y-3 text-xs">
            {timetable.map((slot) => {
              if (slot.isBreak) {
                return (
                  <div
                    key={slot.id}
                    className="p-2.5 rounded-xl bg-slate-100/70 border border-dashed border-slate-300 flex items-center justify-between text-slate-500"
                  >
                    <span className="font-semibold">{slot.subject}</span>
                    <span className="font-mono text-[11px]">{slot.startTime} — {slot.endTime}</span>
                  </div>
                );
              }

              return (
                <div
                  key={slot.id}
                  className="p-4 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-school-50 text-school-800 font-bold text-sm flex items-center justify-center shrink-0">
                      P{slot.periodNumber}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">{slot.subject}</span>
                      <span className="text-[11px] text-slate-500">{slot.teacherName} • {slot.roomNumber}</span>
                    </div>
                  </div>

                  <span className="font-mono font-medium text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 sm:text-right">
                    {slot.startTime} — {slot.endTime}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

