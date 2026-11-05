"use client";

import React from "react";
import { Calendar, Clock, BookOpen, AlertCircle, FileText, Download } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function StudentExaminationsPage() {
  const { state } = usePortalData();

  const student = state.students.find((s) => s.id === "rohan-patel") || state.students[0];
  const upcomingExam = state.examinations.find((e) => e.status === "Upcoming") || state.examinations[0];
  const schedules = state.examSchedules.filter((s) => s.classId === student.classId);

  return (
    <PortalShell activeRole="student">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">Examination Timetable & Hall Ticket</h1>
            <p className="text-xs text-slate-500 mt-1">
              Class {student.className}-{student.section} • Roll #{student.rollNo}
            </p>
          </div>

          <button
            type="button"
            onClick={() => alert(`Downloading Hall Ticket for ${student.fullName}`)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs self-start"
          >
            <Download className="w-3.5 h-3.5 text-school-600" />
            <span>Download Digital Hall Ticket</span>
          </button>
        </div>

        {/* Exam Banner */}
        <div className="bg-gradient-to-r from-school-900 via-school-800 to-navy-950 text-white rounded-2xl p-6 shadow-card">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
            Official Exam Timetable
          </span>
          <h2 className="text-xl font-heading font-bold text-white mt-1">{upcomingExam.title}</h2>
          <p className="text-xs text-slate-300 mt-1">
            Exam Hall A • Starting December 08, 2026 • Reporting Time: 08:20 AM
          </p>
        </div>

        {/* Schedule Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
                  <th className="py-3 px-4 rounded-l-xl">Date</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Timings</th>
                  <th className="py-3 px-4">Max Marks</th>
                  <th className="py-3 px-4 rounded-r-xl">Syllabus Portion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {schedules.map((sch) => (
                  <tr key={sch.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-900">{sch.examDate}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{sch.subject}</td>
                    <td className="py-3.5 px-4 text-slate-600">{sch.timeSlot}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{sch.maxMarks}</td>
                    <td className="py-3.5 px-4 text-slate-600">{sch.syllabusPortion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

