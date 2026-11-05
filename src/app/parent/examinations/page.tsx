"use client";

import React from "react";
import { Calendar, Clock, BookOpen, AlertCircle, Award, CheckCircle2, FileText, MapPin } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";

export default function ParentExaminationsPage() {
  const { selectedChildId } = useAuth();
  const { state } = usePortalData();

  const child = state.students.find((s) => s.id === selectedChildId) || state.students[0];
  const upcomingExam = state.examinations.find((e) => e.status === "Upcoming") || state.examinations[0];
  const schedules = state.examSchedules.filter((s) => s.classId === child?.classId);

  return (
    <PortalShell activeRole="parent">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">Examinations & Routines</h1>
            <p className="text-xs text-slate-500 mt-1">
              Assessment schedule for {child?.fullName} (Class {child?.className}-{child?.section})
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-2 self-start">
            <Calendar className="w-3.5 h-3.5 text-amber-700" />
            <span>Next Assessment: Dec 08 – Dec 16, 2026</span>
          </div>
        </div>

        {/* Examination Highlight Banner */}
        <div className="bg-gradient-to-r from-school-900 via-school-800 to-navy-950 text-white rounded-2xl p-6 shadow-card">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Official Examination Timetable
              </span>
              <h2 className="text-xl font-heading font-bold text-white mt-1">
                {upcomingExam.title}
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                {upcomingExam.term} • Academic Year {upcomingExam.academicYear} • Total {schedules.length} Papers
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-300 block">Assessment Window</span>
              <span className="text-sm font-bold text-amber-300 font-mono">
                {upcomingExam.startDate} to {upcomingExam.endDate}
              </span>
            </div>
          </div>
        </div>

        {/* Exam Schedule Paper-by-Paper Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-base text-slate-900">Subject-wise Routine</h3>
            <span className="text-xs text-slate-400">Class 4-A Hall A</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
                  <th className="py-3 px-4 rounded-l-xl">Date & Day</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Timing</th>
                  <th className="py-3 px-4">Max Marks</th>
                  <th className="py-3 px-4">Pass Marks</th>
                  <th className="py-3 px-4 rounded-r-xl">Syllabus Coverage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {schedules.map((sch) => (
                  <tr key={sch.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-900 whitespace-nowrap">
                      {sch.examDate}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{sch.subject}</td>
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">{sch.timeSlot}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{sch.maxMarks}</td>
                    <td className="py-3.5 px-4 text-slate-600">{sch.passMarks}</td>
                    <td className="py-3.5 px-4 text-slate-600 max-w-xs">{sch.syllabusPortion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Guidelines Card */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <AlertCircle className="w-4 h-4 text-school-700" />
            <span>Important Guidelines for Parents:</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 leading-relaxed">
            <li>Students must arrive at the examination hall strictly by 08:20 AM with their School ID card and pencil pouch.</li>
            <li>No calculators, smart watches, or electronic gadgets are permitted in the exam hall.</li>
            <li>In case of medical emergency on an exam day, please submit an official doctor's certificate within 24 hours.</li>
          </ul>
        </div>
      </div>
    </PortalShell>
  );
}

