"use client";

import React, { useState } from "react";
import { Clock, Calendar, MapPin, User, Sparkles } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { cn } from "@/lib/utils";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

export default function ParentTimetablePage() {
  const { selectedChildId } = useAuth();
  const { state, getCurrentPeriodInfo } = usePortalData();

  const [activeDay, setActiveDay] = useState<typeof DAYS[number]>("Wednesday");

  const child = state.students.find((s) => s.id === selectedChildId) || state.students[0];
  const currentPeriod = getCurrentPeriodInfo(child?.classId);

  const daySchedule = state.timetable.filter(
    (t) => t.classId === child?.classId && t.dayOfWeek === activeDay
  );

  return (
    <PortalShell activeRole="parent">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">
              Weekly Academic Schedule
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Class {child?.className}-{child?.section} • Daily Periods & Subject Allocations
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-school-50 border border-school-200 text-school-900 text-xs font-semibold flex items-center gap-2 self-start">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Currently: {currentPeriod.label} ({currentPeriod.subject})</span>
          </div>
        </div>

        {/* Day Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {DAYS.map((day) => {
            const isSelected = activeDay === day;
            return (
              <button
                key={day}
                type="button"
                onClick={() => setActiveDay(day)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0",
                  isSelected
                    ? "bg-school-800 text-white shadow-soft"
                    : "bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50"
                )}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Timetable Period Grid / List */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <h2 className="font-heading font-bold text-base text-slate-900">
              {activeDay}'s Timetable
            </h2>
            <span className="text-xs text-slate-400 font-mono">08:30 AM — 02:50 PM</span>
          </div>

          <div className="space-y-3">
            {daySchedule.length > 0 ? (
              daySchedule.map((slot) => {
                const isCurrent =
                  activeDay === "Wednesday" && currentPeriod.periodNumber === slot.periodNumber && !slot.isBreak;

                if (slot.isBreak) {
                  return (
                    <div
                      key={slot.id}
                      className="py-2 px-4 rounded-xl bg-slate-100/70 border border-dashed border-slate-300 flex items-center justify-between text-xs text-slate-500"
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
                      "p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs",
                      isCurrent
                        ? "bg-school-50/80 border-school-400 ring-2 ring-school-400/20 shadow-2xs"
                        : "bg-white border-slate-200/80 hover:border-slate-300"
                    )}
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0",
                          isCurrent
                            ? "bg-school-800 text-white"
                            : "bg-slate-100 text-slate-700"
                        )}
                      >
                        P{slot.periodNumber}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-sm">{slot.subject}</h3>
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-school-600 text-white">
                              Live Now
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-slate-500 text-[11px] mt-0.5">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3 text-slate-400" />
                            {slot.teacherName}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {slot.roomNumber}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="sm:text-right shrink-0">
                      <span className="font-mono font-medium text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                        {slot.startTime} — {slot.endTime}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10 text-slate-400 text-xs">
                No classes scheduled for this day.
              </div>
            )}
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

