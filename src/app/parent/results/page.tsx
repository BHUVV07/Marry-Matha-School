"use client";

import React from "react";
import { Award, FileText, CheckCircle2, Download, Printer, User, Sparkles } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";

export default function ParentResultsPage() {
  const { selectedChildId } = useAuth();
  const { state } = usePortalData();

  const child = state.students.find((s) => s.id === selectedChildId) || state.students[0];
  const results = state.examResults.filter((r) => r.studentId === child?.id);

  const totalMarksObtained = results.reduce((acc, curr) => acc + curr.marksObtained, 0);
  const totalMaxMarks = results.reduce((acc, curr) => acc + curr.maxMarks, 0);
  const percentage = totalMaxMarks > 0 ? ((totalMarksObtained / totalMaxMarks) * 100).toFixed(1) : "0.0";

  const handlePrint = () => {
    window.print();
  };

  return (
    <PortalShell activeRole="parent">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">Academic Progress & Report Card</h1>
            <p className="text-xs text-slate-500 mt-1">
              Assessment metrics for {child?.fullName} • Class {child?.className}-{child?.section}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-school-600" />
              <span>Print Report Card</span>
            </button>
          </div>
        </div>

        {/* Report Card Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-school-700">
                Official Term Assessment
              </span>
              <h2 className="text-lg font-heading font-bold text-slate-900 mt-0.5">
                Term 1 Final Examination (2026–2027)
              </h2>
              <p className="text-xs text-slate-500">
                Student: <strong className="text-slate-800">{child?.fullName}</strong> (Roll #{child?.rollNo})
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Score</span>
                <span className="text-xl font-bold text-slate-900">
                  {totalMarksObtained} <span className="text-xs text-slate-400 font-normal">/ {totalMaxMarks}</span>
                </span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Cumulative Grade</span>
                <span className="text-xl font-bold text-emerald-600">{percentage}% (A+)</span>
              </div>
            </div>
          </div>

          {/* Subject-by-Subject Marks Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
                  <th className="py-3 px-4 rounded-l-xl">Subject</th>
                  <th className="py-3 px-4">Marks Scored</th>
                  <th className="py-3 px-4">Max Marks</th>
                  <th className="py-3 px-4">Grade</th>
                  <th className="py-3 px-4 rounded-r-xl">Teacher Evaluation & Remarks</th>
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

          {/* Teacher Signature & Remarks Footer */}
          <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Class Teacher's Cumulative Remarks
              </span>
              <p className="text-slate-700 leading-relaxed italic">
                "{child?.firstName} is a polite, inquisitive, and diligent learner with commendable problem-solving skills in Mathematics and hands-on science experiments. Promoted to Term 2 with Distinction."
              </p>
              <span className="block mt-2 font-semibold text-slate-900">— Mrs. Sunita Sharma, Class Teacher</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Principal's Endorsement
                </span>
                <p className="text-slate-700 text-xs italic">
                  "Exemplary conduct and strong academic foundation. Keep aiming higher."
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>Rev. Fr. Mathew Thomas, Principal</span>
                <span className="text-emerald-700 font-semibold">School Seal Affixed ✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

