"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Clock,
  UserCheck,
  Award,
  Users,
  CheckCircle2,
  ChevronRight,
  Plus,
  Building,
  Bell,
  Sparkles,
  ClipboardList,
} from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function TeacherDashboardPage() {
  const { state, getCurrentPeriodInfo } = usePortalData();

  // Logged in as Mrs. Sunita Sharma
  const teacher = state.teachers.find((t) => t.id === "teacher-001") || state.teachers[0];
  const currentPeriod = getCurrentPeriodInfo("cls-4a");

  const myHomework = state.homework.filter((h) => h.teacherId === teacher.id);
  const myStudents = state.students.filter((s) => s.classId === "cls-4a");

  // Today's attendance for Class 4-A
  const todayRecords = state.attendanceRecords.filter(
    (r) => r.classId === "cls-4a" && r.date === "2026-11-04"
  );
  const presentCount = todayRecords.filter((r) => r.status === "present").length;

  return (
    <PortalShell activeRole="teacher">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-school-900 via-school-800 to-navy-950 text-white rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center font-bold text-2xl border border-white/20 shadow-xs">
              SS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  EMP-0108
                </span>
                <span className="text-xs text-slate-300">Class Teacher: Class 4-A</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-heading font-bold text-white mt-1">
                Welcome back, {teacher.name}! 🍎
              </h1>
              <p className="text-xs text-slate-300 mt-0.5">
                {teacher.designation} • Department: {teacher.department}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
            <Link
              href="/teacher/attendance"
              className="px-4 py-2.5 rounded-xl bg-amber-400 text-navy-950 font-bold text-xs hover:bg-amber-300 transition-colors shadow-soft flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" />
              <span>Mark Today's Attendance</span>
            </Link>
          </div>
        </div>

        {/* 4 Quick Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Class Attendance */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Class 4-A Attendance
              </span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {presentCount || 34} / 36 Present
            </div>
            <p className="text-xs text-emerald-600 mt-1 font-medium">94.4% today's turn-out</p>
          </div>

          {/* Current Teaching Period */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Live Teaching Schedule
              </span>
              <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-base font-bold text-slate-900">{currentPeriod.subject}</div>
            <p className="text-xs text-slate-500 mt-1">
              {currentPeriod.label} • Class 4-A ({currentPeriod.roomNumber})
            </p>
          </div>

          {/* Assigned Homework Active */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Active Assignments
              </span>
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">{myHomework.length} Active</div>
            <p className="text-xs text-slate-500 mt-1">Fractions & Photosynthesis</p>
          </div>

          {/* Enrolled Students */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                My Class Strength
              </span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">36 Students</div>
            <p className="text-xs text-slate-500 mt-1">Class 4 Section A</p>
          </div>
        </div>

        {/* 2-Column Main Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8 cols): Today's Schedule & Quick Action Cards */}
          <div className="lg:col-span-8 space-y-6">
            {/* Quick Action Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/teacher/attendance"
                className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-school-400 hover:shadow-card transition-all flex items-center gap-3 text-xs"
              >
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Mark Attendance</h3>
                  <p className="text-slate-500 text-[11px]">Class 4-A Roster</p>
                </div>
              </Link>

              <Link
                href="/teacher/homework"
                className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-school-400 hover:shadow-card transition-all flex items-center gap-3 text-xs"
              >
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Post Homework</h3>
                  <p className="text-slate-500 text-[11px]">Create & Assign</p>
                </div>
              </Link>

              <Link
                href="/teacher/marks"
                className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-school-400 hover:shadow-card transition-all flex items-center gap-3 text-xs"
              >
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Enter Exam Marks</h3>
                  <p className="text-slate-500 text-[11px]">Subject Gradebook</p>
                </div>
              </Link>
            </div>

            {/* Today's Teaching Schedule */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-heading font-bold text-base text-slate-900">
                    My Teaching Timetable Today (Wednesday)
                  </h2>
                  <p className="text-xs text-slate-500">Periods allocated for Mrs. Sunita Sharma</p>
                </div>
                <Link
                  href="/teacher/timetable"
                  className="text-xs font-semibold text-school-700 hover:text-school-900 flex items-center gap-1"
                >
                  <span>Full Week Routine</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-400 w-16">08:30 AM</span>
                    <div>
                      <span className="font-bold text-slate-900 block">Period 1: Mathematics</span>
                      <span className="text-[11px] text-slate-500">Class 4-A • Room 204</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">Completed</span>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-400 w-16">09:15 AM</span>
                    <div>
                      <span className="font-bold text-slate-900 block">Period 2: General Science</span>
                      <span className="text-[11px] text-slate-500">Class 4-A • Science Lab 1</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">Completed</span>
                </div>

                <div className="py-3 flex items-center justify-between bg-school-50/70 px-2 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-400 w-16">10:20 AM</span>
                    <div>
                      <span className="font-bold text-slate-900 block">Period 3: Environmental Science</span>
                      <span className="text-[11px] text-slate-500">Class 4-B • Science Lab 1</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-school-600 text-white">
                    Live Session
                  </span>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-400 w-16">14:05 PM</span>
                    <div>
                      <span className="font-bold text-slate-900 block">Period 7: Remedial Math Clinic</span>
                      <span className="text-[11px] text-slate-500">Class 4-A • Room 204</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">Upcoming</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Active Homework Tasks & Notices */}
          <div className="lg:col-span-4 space-y-6">
            {/* Active Homework Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-bold text-sm text-slate-900">Homework Submissions</h3>
                <Link href="/teacher/homework" className="text-xs text-school-700 font-semibold hover:underline">
                  Manage
                </Link>
              </div>

              <div className="space-y-3 text-xs">
                {myHomework.map((hw) => (
                  <div key={hw.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 line-clamp-1">{hw.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Due {hw.dueDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                      <span>{hw.subject} • Class {hw.className}</span>
                      <span className="font-bold text-school-700">{hw.submissionCount} Submissions</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Staff Circulars */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-bold text-sm text-slate-900">Staff Circulars</h3>
                <Link href="/teacher/announcements" className="text-xs text-school-700 font-semibold hover:underline">
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
