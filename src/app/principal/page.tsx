"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  Users,
  UserCheck,
  CreditCard,
  Inbox,
  BarChart3,
  Calendar,
  Building,
  ArrowUpRight,
  CheckCircle2,
  Bell,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function PrincipalDashboardPage() {
  const { state } = usePortalData();

  const totalStudents = 480;
  const totalFaculty = 34;

  const wingData = [
    { name: "Pre-Primary Wing (Nursery - UKG)", students: 110, percentage: 23, color: "bg-amber-500" },
    { name: "Primary Wing (Class 1 - Class 5)", students: 235, percentage: 49, color: "bg-school-600" },
    { name: "Middle School Wing (Class 6 - Class 8)", students: 135, percentage: 28, color: "bg-indigo-600" },
  ];

  const attendanceWeekTrend = [
    { day: "Mon", rate: 95.8, count: 460 },
    { day: "Tue", rate: 94.6, count: 454 },
    { day: "Wed (Today)", rate: 94.2, count: 452 },
    { day: "Thu (Projected)", rate: 95.0, count: 456 },
    { day: "Fri (Projected)", rate: 93.8, count: 450 },
  ];

  const subjectPerformance = [
    { subject: "Mathematics", avgScore: 84.6, distinctionRate: "46%" },
    { subject: "General Science", avgScore: 88.2, distinctionRate: "52%" },
    { subject: "English Language & Lit", avgScore: 86.4, distinctionRate: "48%" },
    { subject: "Social Studies", avgScore: 82.5, distinctionRate: "39%" },
    { subject: "Computer Studies", avgScore: 92.1, distinctionRate: "68%" },
  ];

  return (
    <PortalShell activeRole="principal">
      <div className="space-y-6">
        {/* Principal Welcome Banner */}
        <div className="bg-gradient-to-r from-school-900 via-school-800 to-navy-950 text-white rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-400 text-navy-950 flex items-center justify-center font-bold text-2xl shadow-soft">
              MT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Institutional Leadership
                </span>
                <span className="text-xs text-slate-300">Rev. Fr. Mathew Thomas</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-heading font-bold text-white mt-1">
                Principal's Executive Overview
              </h1>
              <p className="text-xs text-slate-300 mt-0.5">
                Strategic metrics, academic excellence benchmarks, and administrative oversight
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
            <Link
              href="/admin/announcements"
              className="px-4 py-2.5 rounded-xl bg-amber-400 text-navy-950 font-bold text-xs hover:bg-amber-300 transition-colors shadow-soft flex items-center gap-1.5"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Broadcast Notice</span>
            </Link>
          </div>
        </div>

        {/* 5 High-Level Strategic KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Total Student Body
            </span>
            <div className="text-2xl font-bold text-slate-900">{totalStudents}</div>
            <p className="text-xs text-slate-500 mt-1">100% capacity utilization</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Overall Attendance Today
            </span>
            <div className="text-2xl font-bold text-emerald-600">94.2%</div>
            <p className="text-xs text-slate-500 mt-1">452 Present / 28 Absent</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Revenue Realization
            </span>
            <div className="text-2xl font-bold text-slate-900">83.6%</div>
            <p className="text-xs text-emerald-600 font-medium mt-1">₹18.4L collected</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Faculty on Duty
            </span>
            <div className="text-2xl font-bold text-slate-900">32 / 34</div>
            <p className="text-xs text-slate-500 mt-1">94.1% teaching turnout</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Admissions Demand
            </span>
            <div className="text-2xl font-bold text-amber-600">42 Inquiries</div>
            <p className="text-xs text-slate-500 mt-1">2026–27 intake queue</p>
          </div>
        </div>

        {/* 2-Column Main Layout: Student Strength & Attendance Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (7 cols): Wing Breakdown & Academic Health */}
          <div className="lg:col-span-7 space-y-6">
            {/* Student Strength by Wing */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-heading font-bold text-base text-slate-900">
                    Student Strength Distribution
                  </h2>
                  <p className="text-xs text-slate-500">Enrollment proportion across academic wings</p>
                </div>
                <span className="text-xs font-mono font-bold text-slate-800">480 Total</span>
              </div>

              {/* Progress bar visual */}
              <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-100 mb-4">
                {wingData.map((w) => (
                  <div key={w.name} className={`${w.color} h-full`} style={{ width: `${w.percentage}%` }} />
                ))}
              </div>

              <div className="space-y-3 text-xs">
                {wingData.map((w) => (
                  <div key={w.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-3 h-3 rounded-full ${w.color}`} />
                      <span className="font-semibold text-slate-800">{w.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 block">{w.students} Students</span>
                      <span className="text-[11px] text-slate-400 font-mono">{w.percentage}% of campus</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Performance Overview */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-heading font-bold text-base text-slate-900">
                    Term 1 Subject Performance Averages
                  </h2>
                  <p className="text-xs text-slate-500">School-wide academic achievement metrics</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  86.7% Overall Avg
                </span>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {subjectPerformance.map((sp) => (
                  <div key={sp.subject} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">{sp.subject}</span>
                      <span className="text-[11px] text-slate-400">Class 1 to Class 8 Combined</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 block">{sp.avgScore}% Average</span>
                      <span className="text-[11px] text-emerald-600 font-medium">{sp.distinctionRate} Distinction</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Attendance Week Trend & Admissions Funnel */}
          <div className="lg:col-span-5 space-y-6">
            {/* Weekly Attendance Trend */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-sm text-slate-900">Weekly Attendance Trend</h3>
                <span className="text-xs text-slate-400 font-mono">Week 44</span>
              </div>

              <div className="space-y-3 text-xs">
                {attendanceWeekTrend.map((item) => (
                  <div key={item.day} className="space-y-1">
                    <div className="flex justify-between text-slate-700">
                      <span className="font-semibold">{item.day}</span>
                      <span className="font-mono font-bold text-slate-900">{item.rate}% ({item.count})</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${item.rate}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Admissions Pipeline Conversion */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-bold text-sm text-slate-900">Admissions Pipeline</h3>
                <Link href="/admin/admissions" className="text-xs text-school-700 font-semibold hover:underline">
                  Manage &rarr;
                </Link>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-600">New Inquiries</span>
                  <span className="font-bold text-slate-900">18 Pending Initial Contact</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-600">Interviews Scheduled</span>
                  <span className="font-bold text-indigo-700">8 This Week</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-600">Approved by Principal</span>
                  <span className="font-bold text-emerald-700">6 Ready for Enrollment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
