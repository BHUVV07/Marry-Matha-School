"use client";

import React from "react";
import { Award, FileText, CheckCircle2, Download, Printer } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function StudentResultsPage() {
  const { state } = usePortalData();

  const student = state.students.find((s) => s.id === "rohan-patel") || state.students[0];
  const results = state.examResults.filter((r) => r.studentId === student.id);

  const totalObtained = results.reduce((acc, curr) => acc + curr.marksObtained, 0);
  const totalMax = results.reduce((acc, curr) => acc + curr.maxMarks, 0);
  const percentage = totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(1) : "0.0";

  return (
    <PortalShell activeRole="student">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">My Exam Scores & Gradecard</h1>
            <p className="text-xs text-slate-500 mt-1">
              Term 1 Final Examination (2026–2027) • Class 4-A
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs self-start"
          >
            <Printer className="w-3.5 h-3.5 text-school-600" />
            <span>Print Report Card</span>
          </button>
        </div>

        {/* Highlight Score Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Total Score
            </span>
            <div className="text-2xl font-bold text-slate-900">{totalObtained} / {totalMax}</div>
            <span className="text-[11px] text-slate-400">All 6 core subjects</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Term Percentage
            </span>
            <div className="text-2xl font-bold text-emerald-600">{percentage}%</div>
            <span className="text-[11px] text-emerald-600 font-semibold">Grade: A+ (Distinction)</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Class Standing
            </span>
            <div className="text-2xl font-bold text-amber-600">Rank #2</div>
            <span className="text-[11px] text-slate-400">Class 4-A (36 Students)</span>
          </div>
        </div>

        {/* Marks Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <h2 className="font-heading font-bold text-base text-slate-900 mb-4">Subject Marks Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
                  <th className="py-3 px-4 rounded-l-xl">Subject</th>
                  <th className="py-3 px-4">Marks Obtained</th>
                  <th className="py-3 px-4">Maximum Marks</th>
                  <th className="py-3 px-4">Grade</th>
                  <th className="py-3 px-4 rounded-r-xl">Teacher Feedback</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {results.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{res.subject}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{res.marksObtained}</td>
                    <td className="py-3.5 px-4 text-slate-500">{res.maxMarks}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {res.grade}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 italic">{res.remarks}</td>
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

