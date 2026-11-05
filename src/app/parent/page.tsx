"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  Calendar,
  Clock,
  BookOpen,
  Award,
  CreditCard,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  FileText,
  MapPin,
  Bell,
  ArrowUpRight,
  ShieldAlert,
} from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { cn } from "@/lib/utils";

export default function ParentDashboardPage() {
  const { selectedChildId, setSelectedChildId } = useAuth();
  const { state, getCurrentPeriodInfo } = usePortalData();

  const child = state.students.find((s) => s.id === selectedChildId) || state.students[0];
  const currentPeriod = getCurrentPeriodInfo(child?.classId);

  // Filter child specific data
  const todayAttendance = state.attendanceRecords.find(
    (r) => r.studentId === child?.id && r.date === "2026-11-04"
  );

  const childHomework = state.homework.filter((h) => h.classId === child?.classId);
  const childInvoices = state.feeInvoices.filter((i) => i.studentId === child?.id);
  const totalDue = childInvoices.reduce((acc, curr) => acc + curr.balanceDue, 0);
  const totalPaid = childInvoices.reduce((acc, curr) => acc + curr.paidAmount, 0);

  const timetableToday = state.timetable.filter(
    (t) => t.classId === child?.classId && t.dayOfWeek === "Wednesday" && !t.isBreak
  );

  return (
    <PortalShell activeRole="parent">
      <div className="space-y-6">
        {/* Child Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-xl border border-sky-200 shadow-2xs">
              {child?.firstName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-heading font-bold text-slate-900">{child?.fullName}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                  {child?.className} — Section {child?.section}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                <span>Roll No: <strong className="text-slate-700">{child?.rollNo}</strong></span>
                <span>•</span>
                <span>Adm No: <strong className="text-slate-700">{child?.admissionNo}</strong></span>
                <span>•</span>
                <span>House: <strong className="text-slate-700">{child?.house}</strong></span>
                <span>•</span>
                <span>Bus: <strong className="text-slate-700">{child?.busRoute}</strong></span>
              </div>
            </div>
          </div>

          {/* Child Switcher Pills */}
          <div className="flex items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
            <span className="text-xs text-slate-400 font-medium mr-1">Switch Child:</span>
            {state.parentProfile.childrenIds.map((cid) => {
              const c = state.students.find((s) => s.id === cid);
              if (!c) return null;
              const isSelected = selectedChildId === cid;
              return (
                <button
                  key={cid}
                  type="button"
                  onClick={() => setSelectedChildId(cid)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border",
                    isSelected
                      ? "bg-school-800 text-white border-school-800 shadow-xs"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  )}
                >
                  {c.firstName} ({c.className})
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Quick Stat Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Attendance Status Today */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Today's Attendance
              </span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span
                className={cn(
                  "text-lg font-bold capitalize",
                  todayAttendance?.status === "present"
                    ? "text-emerald-600"
                    : todayAttendance?.status === "late"
                    ? "text-amber-600"
                    : "text-rose-600"
                )}
              >
                {todayAttendance?.status || "Present"}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                ({child?.attendancePercentage}% Term Overall)
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all"
                style={{ width: `${child?.attendancePercentage}%` }}
              />
            </div>
          </div>

          {/* Current Live Period */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Live Period Status
              </span>
              <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-base font-bold text-slate-900 leading-snug">
              {currentPeriod.subject}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {currentPeriod.label} • {currentPeriod.teacherName} ({currentPeriod.roomNumber})
            </p>
          </div>

          {/* Pending Homework */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Active Homework
              </span>
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">{childHomework.length} Tasks</div>
            <p className="text-xs text-slate-500 mt-1">Due within the next 4 days</p>
          </div>

          {/* Fee Balance Due */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Fee Dues (Term 3)
              </span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {totalDue > 0 ? `₹${totalDue.toLocaleString()}` : "Settled"}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {totalDue > 0 ? "Due on Dec 15, 2026" : "All terms paid in full"}
            </p>
          </div>
        </div>

        {/* 2-Column Main Layout: Daily Timetable & Active Homework */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8 cols): Today's Schedule & Academic Modules */}
          <div className="lg:col-span-8 space-y-6">
            {/* Daily Schedule Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-heading font-bold text-base text-slate-900">
                    Today's Class Schedule (Wednesday)
                  </h2>
                  <p className="text-xs text-slate-500">Live period sequence and subject faculty</p>
                </div>
                <Link
                  href="/parent/timetable"
                  className="text-xs font-semibold text-school-700 hover:text-school-900 flex items-center gap-1"
                >
                  <span>Full Week</span>
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
                        isCurrent ? "bg-school-50/80 font-medium" : "hover:bg-slate-50/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-slate-400 w-16">{period.startTime}</span>
                        <div>
                          <div className="font-semibold text-slate-900 flex items-center gap-2">
                            <span>{period.subject}</span>
                            {isCurrent && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-school-600 text-white">
                                Live Now
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

            {/* Upcoming Homework */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-heading font-bold text-base text-slate-900">
                    Assigned Homework & Exercises
                  </h2>
                  <p className="text-xs text-slate-500">Work due from subject teachers</p>
                </div>
                <Link
                  href="/parent/homework"
                  className="text-xs font-semibold text-school-700 hover:text-school-900 flex items-center gap-1"
                >
                  <span>View All ({childHomework.length})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {childHomework.map((hw) => (
                  <div
                    key={hw.id}
                    className="p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-slate-50/40"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{hw.title}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700">
                          {hw.subject}
                        </span>
                      </div>
                      <p className="text-slate-600 line-clamp-2 text-[11px] leading-relaxed">
                        {hw.description}
                      </p>
                      <div className="text-[11px] text-slate-400">
                        Teacher: {hw.teacherName} • Assigned: {hw.assignedDate}
                      </div>
                    </div>
                    <div className="sm:text-right shrink-0">
                      <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        Due: {hw.dueDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Exam Alerts, Fee Card, Announcements */}
          <div className="lg:col-span-4 space-y-6">
            {/* Upcoming Examination Countdown */}
            <div className="bg-gradient-to-br from-school-900 to-navy-950 text-white rounded-2xl p-5 shadow-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Upcoming Exam
                </span>
                <Calendar className="w-4 h-4 text-slate-300" />
              </div>
              <h3 className="font-heading font-bold text-base text-white">
                Mid-Term Assessment 2 (2026–27)
              </h3>
              <p className="text-xs text-slate-300 mt-1">Commencing from December 08, 2026</p>
              <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
                <span className="text-slate-300">5 Exam Subjects</span>
                <Link
                  href="/parent/examinations"
                  className="font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <span>Syllabus & Routine &rarr;</span>
                </Link>
              </div>
            </div>

            {/* Quick Fee Snapshot */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-bold text-sm text-slate-900">Fee Invoices Summary</h3>
                <Link href="/parent/fees" className="text-xs text-school-700 font-semibold hover:underline">
                  Details
                </Link>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Term 1 & 2 Dues</span>
                  <span className="font-bold text-emerald-600">Fully Paid</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Term 3 Installment</span>
                  <span className="font-bold text-amber-700">₹4,000 Pending</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Next Due Date</span>
                  <span className="font-medium text-slate-800">15 Dec 2026</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100">
                <Link
                  href="/parent/payments"
                  className="w-full py-2 px-3 rounded-xl bg-school-50 text-school-800 text-xs font-semibold hover:bg-school-100 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>View Receipts & Invoices</span>
                </Link>
              </div>
            </div>

            {/* Recent School Circulars */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-bold text-sm text-slate-900">Recent Notices</h3>
                <Link href="/parent/announcements" className="text-xs text-school-700 font-semibold hover:underline">
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
