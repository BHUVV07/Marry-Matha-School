"use client";

import React, { useState } from "react";
import { Clock, Calendar, MapPin, UserCheck } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";
import { cn } from "@/lib/utils";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

export default function TeacherTimetablePage() {
  const { state, getCurrentPeriodInfo } = usePortalData();
  const [activeDay, setActiveDay] = useState<typeof DAYS[number]>("Wednesday");

  const currentPeriod = getCurrentPeriodInfo("cls-4a");

  // Filter periods where teacher is Mrs. Sunita Sharma
  const teacherPeriods = state.timetable.filter(
    (t) => t.dayOfWeek === activeDay && (t.teacherName.includes("Sunita") || t.isBreak)
  );

  return (
    <PortalShell activeRole="teacher">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">Teaching Timetable</h1>
            <p className="text-xs text-slate-500 mt-1">
              Faculty Schedule • Mrs. Sunita Sharma (Mathematics & Science)
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-school-50 border border-school-200 text-school-900 text-xs font-semibold flex items-center gap-2 self-start">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active Period: {currentPeriod.label} ({currentPeriod.subject})</span>
          </div>
        </div>

        {/* Days Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {DAYS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setActiveDay(d)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0",
                activeDay === d
                  ? "bg-school-800 text-white shadow-soft"
                  : "bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50"
              )}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Teaching Schedule List */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <h2 className="font-heading font-bold text-base text-slate-900 mb-4 pb-3 border-b border-slate-100">
            {activeDay}'s Teaching Allocations
          </h2>

          <div className="space-y-3 text-xs">
            {teacherPeriods.map((slot) => {
              const isCurrent =
                activeDay === "Wednesday" && currentPeriod.periodNumber === slot.periodNumber && !slot.isBreak;

              if (slot.isBreak) {
                return (
                  <div
                    key={slot.id}
                    className="py-2 px-4 rounded-xl bg-slate-100/70 border border-dashed border-slate-300 flex items-center justify-between text-slate-500"
                  >
                    <span className="font-semibold">{slot.subject}</span>
                    <span className="font-mono text-[11px]">{slot.startTime} — {slot.endTime}</span>
                  </div>
                );
              }

              return (
                <div
                  key={slot.id}
                  className={cn(
                    "p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                    isCurrent
                      ? "bg-school-50/80 border-school-400 ring-2 ring-school-400/20 shadow-2xs"
                      : "bg-white border-slate-200/80 hover:border-slate-300"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0",
                        isCurrent ? "bg-school-800 text-white" : "bg-slate-100 text-slate-700"
                      )}
                    >
                      P{slot.periodNumber}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{slot.subject}</span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-school-600 text-white">
                            Current Period
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500">
                        Class 4-A • {slot.roomNumber}
                      </span>
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

