"use client";

import React from "react";
import Link from "next/link";
import {
  Shield,
  Users,
  UserCheck,
  CreditCard,
  Inbox,
  Calendar,
  Building,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Plus,
  Bell,
  Clock,
  Sparkles,
  BarChart3,
  Layers,
} from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function AdminDashboardPage() {
  const { state } = usePortalData();

  const totalStudents = 480; // Total institutional strength
  const totalFaculty = 34;
  const newAdmissions = state.admissions.filter((a) => a.status === "New").length;
  const approvedAdmissions = state.admissions.filter((a) => a.status === "Approved").length;

  return (
    <PortalShell activeRole="admin">
      <div className="space-y-6">
        {/* Header Greeting */}
        <div className="bg-gradient-to-r from-school-900 via-school-800 to-navy-950 text-white rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center font-bold text-2xl border border-white/20 shadow-xs">
              AD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30">
                  System Administration
                </span>
                <span className="text-xs text-slate-300">Sister Agnes D'Souza</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-heading font-bold text-white mt-1">
                School Operations & Admin Center
              </h1>
              <p className="text-xs text-slate-300 mt-0.5">
                Mary Matha Primary School Digital Ecosystem • Academic Year 2026–2027
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
            <Link
              href="/admin/students"
              className="px-3.5 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Student</span>
            </Link>
            <Link
              href="/admin/admissions"
              className="px-4 py-2 rounded-xl bg-amber-400 text-navy-950 hover:bg-amber-300 text-xs font-bold transition-colors shadow-soft flex items-center gap-1.5"
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>Admissions Funnel ({state.admissions.length})</span>
            </Link>
          </div>
        </div>

        {/* 5 Core School KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Enrolled
              </span>
              <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">{totalStudents} Students</div>
            <p className="text-xs text-slate-500 mt-1">Pre-Primary to Class 8</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Faculty Strength
              </span>
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">{totalFaculty} Teachers</div>
            <p className="text-xs text-emerald-600 font-medium mt-1">32 on duty today</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Daily Attendance
              </span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <BarChart3 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-emerald-600">94.2%</div>
            <p className="text-xs text-slate-500 mt-1">452 / 480 Attended today</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Fee Collection
              </span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">₹18.4L / ₹22L</div>
            <p className="text-xs text-emerald-600 font-medium mt-1">83.6% Realization</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Admissions Pipeline
              </span>
              <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                <Inbox className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">{state.admissions.length} Inquiries</div>
            <p className="text-xs text-amber-700 font-medium mt-1">{approvedAdmissions} Ready to enroll</p>
          </div>
        </div>

        {/* 2-Column Main Workspace: Admissions Pipeline & Payment Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8 cols): Recent Admissions & Quick Actions */}
          <div className="lg:col-span-8 space-y-6">
            {/* Admissions Pipeline Preview */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-heading font-bold text-base text-slate-900">
                    Active Admissions Pipeline
                  </h2>
                  <p className="text-xs text-slate-500">Applicant status from initial query to final enrollment</p>
                </div>
                <Link
                  href="/admin/admissions"
                  className="text-xs font-semibold text-school-700 hover:text-school-900 flex items-center gap-1"
                >
                  <span>Open Full Funnel</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {state.admissions.slice(0, 5).map((adm) => (
                  <div key={adm.id} className="py-3 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{adm.applicantName}</span>
                        <span className="text-slate-400 font-mono text-[11px]">{adm.applicationNo}</span>
                      </div>
                      <span className="text-[11px] text-slate-500">
                        Applying for: <strong>{adm.appliedClass}</strong> • Parent: {adm.parentName} ({adm.parentPhone})
                      </span>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-school-50 text-school-800 border border-school-200 whitespace-nowrap">
                      {adm.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Fee Collections */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-heading font-bold text-base text-slate-900">Recent Collections</h2>
                  <p className="text-xs text-slate-500">Settlements recorded by accounts desk</p>
                </div>
                <Link
                  href="/admin/payments"
                  className="text-xs font-semibold text-school-700 hover:text-school-900 flex items-center gap-1"
                >
                  <span>View Ledger</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {state.feePayments.slice(0, 4).map((pay) => (
                  <div key={pay.id} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">{pay.studentName} ({pay.className})</span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {pay.receiptNo} • {pay.paymentMethod}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-600 text-sm block">
                        ₹{pay.amountPaid.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{pay.paymentDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Quick Operations & School Calendar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Actions Panel */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <h3 className="font-heading font-bold text-sm text-slate-900 mb-3">Quick Actions</h3>
              <div className="space-y-2 text-xs">
                <Link
                  href="/admin/students"
                  className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-slate-700 font-semibold transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-school-700" />
                    <span>Register New Student</span>
                  </div>
                  <Plus className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  href="/admin/teachers"
                  className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-slate-700 font-semibold transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <UserCheck className="w-4 h-4 text-indigo-700" />
                    <span>Add Faculty Member</span>
                  </div>
                  <Plus className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  href="/admin/announcements"
                  className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-slate-700 font-semibold transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Bell className="w-4 h-4 text-amber-700" />
                    <span>Post School Circular</span>
                  </div>
                  <Plus className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* School Logistics Snapshot */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs text-xs space-y-3">
              <h3 className="font-heading font-bold text-sm text-slate-900">Campus Status</h3>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">School Buses</span>
                <span className="font-bold text-emerald-600">6 / 6 Operational</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Active Classrooms</span>
                <span className="font-bold text-slate-800">18 Rooms Occupied</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Science & Comp Labs</span>
                <span className="font-bold text-slate-800">Operational</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Campus Security & CCTV</span>
                <span className="font-bold text-emerald-600">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
