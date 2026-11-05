"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Calendar,
  Clock,
  BookOpen,
  Award,
  UserCheck,
  CheckCircle2,
  ChevronRight,
  FolderOpen,
  Bell,
  Sparkles,
  CheckSquare,
  FileText,
} from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { cn } from "@/lib/utils";

export default function StudentDashboardPage() {
  const { state, getCurrentPeriodInfo } = usePortalData();

  // Student portal is logged in as Rohan Patel
  const student = state.students.find((s) => s.id === "rohan-patel") || state.students[0];
  const currentPeriod = getCurrentPeriodInfo(student?.classId);

  const todayAttendance = state.attendanceRecords.find(
    (r) => r.studentId === student?.id && r.date === "2026-11-04"
  );

  const studentHomework = state.homework.filter((h) => h.classId === student?.classId);
  const timetableToday = state.timetable.filter(
    (t) => t.classId === student?.classId && t.dayOfWeek === "Wednesday" && !t.isBreak
  );
  const exam = state.examinations.find((e) => e.status === "Upcoming") || state.examinations[0];

  return (
    <PortalShell activeRole="student">
      <div className="space-y-6">
        {/* Welcome Greeting Banner */}
        <div className="bg-gradient-to-r from-school-900 via-school-800 to-navy-950 text-white rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center font-bold text-2xl border border-white/20 shadow-xs">
              RP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {student.house}
                </span>
                <span className="text-xs text-slate-300">Roll #{student.rollNo}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-heading font-bold text-white mt-1">
                Good day, {student.firstName}! 📚
              </h1>
              <p className="text-xs text-slate-300 mt-0.5">
                Class {student.className} — Section {student.section} • Class Teacher: Mrs. Sunita Sharma
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
            <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/10 text-xs">
              <span className="text-slate-300 block text-[10px] uppercase">Attendance Streak</span>
              <span className="font-bold text-emerald-400 text-sm">94.8% Present</span>
            </div>
            <Link
              href="/student/homework"
              className="px-4 py-2.5 rounded-xl bg-amber-400 text-navy-950 font-bold text-xs hover:bg-amber-300 transition-colors shadow-soft"
            >
              My Homework ({studentHomework.length})
            </Link>
          </div>
        </div>

        {/* 4 Quick Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Current Period */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Current Class
              </span>
              <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-base font-bold text-slate-900">{currentPeriod.subject}</div>
            <p className="text-xs text-slate-500 mt-1">
              {currentPeriod.label} • {currentPeriod.teacherName} ({currentPeriod.roomNumber})
            </p>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Homework Due
              </span>
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">{studentHomework.length} Tasks</div>
            <p className="text-xs text-slate-500 mt-1">Maths & Science due this week</p>
          </div>

          {/* Next Exam */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Upcoming Exam
              </span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="text-base font-bold text-slate-900">Mid-Term 2</div>
            <p className="text-xs text-slate-500 mt-1">Starting Dec 08, 2026 (6 Papers)</p>
          </div>

          {/* Study Materials */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Digital Resources
              </span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <FolderOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">{state.studyMaterials.length} Guides</div>
            <p className="text-xs text-slate-500 mt-1">Worksheets & class notes available</p>
          </div>
        </div>

        {/* 2-Column Schedule & Homework */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8 cols): Today's Schedule */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-heading font-bold text-base text-slate-900">
                    Today's Schedule (Wednesday)
                  </h2>
                  <p className="text-xs text-slate-500">Class 4-A daily period lineup</p>
                </div>
                <Link
                  href="/student/timetable"
                  className="text-xs font-semibold text-school-700 hover:text-school-900 flex items-center gap-1"
                >
                  <span>Full Week Routine</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-slate-100">
                {timetableToday.slice(0, 5).map((period) => {
                  const isCurrent = currentPeriod.periodNumber === period.periodNumber;
                  return (
                    <div
                      key={period.id}
                      className={cn(
                        "py-3 flex items-center justify-between gap-3 text-xs transition-colors rounded-xl px-2",
                        isCurrent ? "bg-school-50 font-medium" : "hover:bg-slate-50/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-slate-400 w-16">{period.startTime}</span>
                        <div>
                          <div className="font-semibold text-slate-900 flex items-center gap-2">
                            <span>{period.subject}</span>
                            {isCurrent && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-school-600 text-white">
                                Active Period
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500">{period.teacherName}</span>
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                        {period.roomNumber}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Homework */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-heading font-bold text-base text-slate-900">Homework To-Do</h2>
                  <p className="text-xs text-slate-500">Tasks assigned by your subject teachers</p>
                </div>
                <Link
                  href="/student/homework"
                  className="text-xs font-semibold text-school-700 hover:text-school-900 flex items-center gap-1"
                >
                  <span>Submit Work</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {studentHomework.map((hw) => {
                  const submission = state.homeworkSubmissions.find(
                    (s) => s.homeworkId === hw.id && s.studentId === student.id
                  );
                  return (
                    <div
                      key={hw.id}
                      className="p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-slate-50/40"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-slate-900 text-sm">{hw.title}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700">
                            {hw.subject}
                          </span>
                        </div>
                        <p className="text-slate-600 text-[11px] line-clamp-2">{hw.description}</p>
                      </div>
                      <div className="flex items-center gap-2 sm:text-right shrink-0">
                        {submission ? (
                          <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Submitted</span>
                          </span>
                        ) : (
                          <Link
                            href="/student/homework"
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-school-800 text-white hover:bg-school-900"
                          >
                            Submit &rarr;
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Study Materials & School Circulars */}
          <div className="lg:col-span-4 space-y-6">
            {/* Study Guides Widget */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-bold text-sm text-slate-900">Study Notes & Guides</h3>
                <Link href="/student/study-materials" className="text-xs text-school-700 font-semibold hover:underline">
                  All
                </Link>
              </div>
              <div className="space-y-2.5 text-xs">
                {state.studyMaterials.slice(0, 3).map((mat) => (
                  <div key={mat.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-semibold text-slate-900 block line-clamp-1">{mat.title}</span>
                    <span className="text-[11px] text-slate-500 mt-0.5 block">{mat.subject} • {mat.fileSize}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Notices */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-bold text-sm text-slate-900">School Notices</h3>
                <Link href="/student/announcements" className="text-xs text-school-700 font-semibold hover:underline">
                  All
                </Link>
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                {state.announcements.slice(0, 3).map((ann) => (
                  <div key={ann.id} className="py-2.5 first:pt-0 last:pb-0">
                    <span className="font-semibold text-slate-800 line-clamp-1">{ann.title}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">{ann.date} • {ann.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
