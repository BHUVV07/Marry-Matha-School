"use client";

import React, { useState } from "react";
import { Award, Save, CheckCircle2, Filter, AlertCircle, BookOpen, Users } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function TeacherMarksPage() {
  const { state, saveExamMarks } = usePortalData();

  const [selectedExam, setSelectedExam] = useState("exam-002");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [savedBanner, setSavedBanner] = useState(false);

  const students = state.students.filter((s) => s.classId === "cls-4a");

  // Local state for marks input
  const [marksMap, setMarksMap] = useState<Record<string, { marks: number; remarks: string }>>(() => {
    const map: Record<string, { marks: number; remarks: string }> = {};
    students.forEach((s) => {
      const existing = state.examResults.find(
        (r) => r.studentId === s.id && r.subject === selectedSubject
      );
      map[s.id] = {
        marks: existing ? existing.marksObtained : 85,
        remarks: existing ? existing.remarks : "Diligent class participation and good problem solving.",
      };
    });
    return map;
  });

  const getGrade = (marks: number) => {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B+";
    if (marks >= 60) return "B";
    if (marks >= 50) return "C";
    return "D";
  };

  const handleMarksChange = (studentId: string, val: number) => {
    setMarksMap((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        marks: Math.min(100, Math.max(0, val)),
      },
    }));
  };

  const handleRemarkChange = (studentId: string, remarks: string) => {
    setMarksMap((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        remarks,
      },
    }));
  };

  const handleSaveMarks = () => {
    const list = Object.entries(marksMap).map(([studentId, data]) => ({
      studentId,
      marksObtained: data.marks,
      remarks: data.remarks,
    }));
    saveExamMarks(selectedExam, selectedSubject, list);
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 4000);
  };

  return (
    <PortalShell activeRole="teacher">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">
              Exam Marks Entry & Gradebook
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Class 4-A • Enter and publish official assessment scores
            </p>
          </div>

          <button
            type="button"
            onClick={handleSaveMarks}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-school-800 text-white hover:bg-school-900 shadow-soft self-start"
          >
            <Save className="w-4 h-4" />
            <span>Save & Publish Marks</span>
          </button>
        </div>

        {savedBanner && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Subject marks recorded successfully! Report cards for Class 4-A students and parents updated.
            </span>
          </div>
        )}

        {/* Selection Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-wrap items-center gap-4 text-xs">
          <div>
            <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">
              Assessment Term
            </label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 outline-none focus:border-school-600"
            >
              <option value="exam-002">Term 1 Final Examination (2026–27)</option>
              <option value="exam-001">Mid-Term Assessment 2 (2026–27)</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 outline-none focus:border-school-600"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="General Science">General Science</option>
              <option value="Environmental Science">Environmental Science</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Class</label>
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 font-bold text-slate-700 block">
              Class 4 — Section A
            </span>
          </div>
        </div>

        {/* Gradebook Marks Sheet Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-base text-slate-900">
              Class Roster Marks Sheet ({students.length} Students)
            </h2>
            <span className="text-xs text-slate-400">Maximum Marks: 100</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
                  <th className="py-3 px-4 rounded-l-xl">Roll No</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Marks (Out of 100)</th>
                  <th className="py-3 px-4">Calculated Grade</th>
                  <th className="py-3 px-4 rounded-r-xl">Teacher Evaluation Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((stu) => {
                  const m = marksMap[stu.id]?.marks ?? 85;
                  const rem = marksMap[stu.id]?.remarks ?? "Consistent effort.";
                  const grade = getGrade(m);
                  const isRohan = stu.id === "rohan-patel";

                  return (
                    <tr
                      key={stu.id}
                      className={`hover:bg-slate-50/50 transition-colors ${
                        isRohan ? "bg-sky-50/40" : ""
                      }`}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800">#{stu.rollNo}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{stu.fullName}</span>
                          {isRohan && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-sky-100 text-sky-800">
                              Demo Child
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">Adm: {stu.admissionNo}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <input
                          type="number"
                          value={m}
                          min={0}
                          max={100}
                          onChange={(e) => handleMarksChange(stu.id, Number(e.target.value))}
                          className="w-20 px-2.5 py-1.5 rounded-lg border border-slate-200 font-bold text-slate-900 text-center outline-none focus:border-school-600"
                        />
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {grade}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <input
                          type="text"
                          value={rem}
                          onChange={(e) => handleRemarkChange(stu.id, e.target.value)}
                          className="w-full max-w-sm px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 outline-none focus:border-school-600 text-[11px]"
                        />
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

