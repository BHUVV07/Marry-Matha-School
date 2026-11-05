"use client";

import React, { useState } from "react";
import {
  UserCheck,
  Calendar,
  Save,
  CheckCircle2,
  Clock,
  AlertCircle,
  Users,
  RotateCcw,
} from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";
import { AttendanceStatus } from "@/lib/portalTypes";
import { cn } from "@/lib/utils";

export default function TeacherAttendancePage() {
  const { state, markAttendance } = usePortalData();

  const [selectedClass, setSelectedClass] = useState("cls-4a");
  const [selectedDate, setSelectedDate] = useState("2026-11-04");
  const [savedBanner, setSavedBanner] = useState(false);

  const studentsInClass = state.students.filter((s) => s.classId === selectedClass);

  // Initialize roster state from existing records or default to present
  const [rosterStatus, setRosterStatus] = useState<Record<string, AttendanceStatus>>(() => {
    const map: Record<string, AttendanceStatus> = {};
    studentsInClass.forEach((s) => {
      const rec = state.attendanceRecords.find(
        (r) => r.studentId === s.id && r.date === selectedDate
      );
      map[s.id] = rec ? rec.status : "present";
    });
    return map;
  });

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setRosterStatus((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleMarkAllPresent = () => {
    const updated: Record<string, AttendanceStatus> = {};
    studentsInClass.forEach((s) => {
      updated[s.id] = "present";
    });
    setRosterStatus(updated);
  };

  const handleSaveAttendance = () => {
    const records = studentsInClass.map((s) => ({
      studentId: s.id,
      studentName: s.fullName,
      status: rosterStatus[s.id] || "present",
      remarks:
        rosterStatus[s.id] === "absent"
          ? "Unexcused absence"
          : rosterStatus[s.id] === "late"
          ? "Bus route delay"
          : "Punctual regular check-in",
    }));

    markAttendance(selectedClass, selectedDate, records);
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 4000);
  };

  const presentCount = Object.values(rosterStatus).filter((s) => s === "present").length;
  const lateCount = Object.values(rosterStatus).filter((s) => s === "late").length;
  const absentCount = Object.values(rosterStatus).filter((s) => s === "absent").length;

  return (
    <PortalShell activeRole="teacher">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">
              Interactive Daily Attendance Register
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Mark attendance for assigned class students. Changes immediately synchronize across Parent and Student portals.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSaveAttendance}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-school-800 text-white hover:bg-school-900 shadow-soft self-start transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save & Synchronize Attendance</span>
          </button>
        </div>

        {savedBanner && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Attendance register for {selectedDate} saved successfully! Rohan Patel and all class records updated across the ecosystem.
            </span>
          </div>
        )}

        {/* Filters and Stats Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div>
              <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">
                Assigned Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 outline-none focus:border-school-600"
              >
                <option value="cls-4a">Class 4 — Section A (Class Teacher)</option>
                <option value="cls-4b">Class 4 — Section B (Subject Teacher)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 font-mono text-slate-800 outline-none focus:border-school-600"
              >
              </input>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-emerald-600 text-sm">{presentCount}</span>
              <span className="text-slate-500">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-600 text-sm">{lateCount}</span>
              <span className="text-slate-500">Late</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-rose-600 text-sm">{absentCount}</span>
              <span className="text-slate-500">Absent</span>
            </div>

            <div className="border-l border-slate-200 pl-4">
              <button
                type="button"
                onClick={handleMarkAllPresent}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
              >
                Mark All Present
              </button>
            </div>
          </div>
        </div>

        {/* Student Attendance Roster Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-base text-slate-900">
              Student Attendance Roster ({studentsInClass.length} Students)
            </h2>
            <span className="text-xs text-slate-400">Toggle status for each student</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
                  <th className="py-3 px-4 rounded-l-xl">Roll No</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Admission No</th>
                  <th className="py-3 px-4">House</th>
                  <th className="py-3 px-4 rounded-r-xl">Mark Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {studentsInClass.map((student) => {
                  const currentStatus = rosterStatus[student.id] || "present";
                  const isRohan = student.id === "rohan-patel";

                  return (
                    <tr
                      key={student.id}
                      className={cn(
                        "hover:bg-slate-50/50 transition-colors",
                        isRohan && "bg-sky-50/40"
                      )}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                        #{student.rollNo}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{student.fullName}</span>
                          {isRohan && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-sky-100 text-sky-800">
                              Demo Child
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">Parent: {student.parentName}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-500">{student.admissionNo}</td>
                      <td className="py-3.5 px-4 text-slate-600">{student.house}</td>
                      <td className="py-3.5 px-4">
                        <div className="inline-flex rounded-xl border border-slate-200 p-0.5 bg-slate-50 gap-0.5">
                          {(["present", "late", "absent", "excused"] as const).map((st) => (
                            <button
                              key={st}
                              type="button"
                              onClick={() => handleStatusChange(student.id, st)}
                              className={cn(
                                "px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition-all",
                                currentStatus === st
                                  ? st === "present"
                                    ? "bg-emerald-600 text-white shadow-2xs"
                                    : st === "late"
                                    ? "bg-amber-500 text-white shadow-2xs"
                                    : st === "absent"
                                    ? "bg-rose-600 text-white shadow-2xs"
                                    : "bg-indigo-600 text-white shadow-2xs"
                                  : "text-slate-600 hover:text-slate-900"
                              )}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

