"use client";

import React, { useState } from "react";
import { BookOpen, CheckCircle2, Clock, Upload, FileText, X, AlertCircle } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";
import { HomeworkItem } from "@/lib/portalTypes";
import { cn } from "@/lib/utils";

export default function StudentHomeworkPage() {
  const { state, submitHomework } = usePortalData();

  const student = state.students.find((s) => s.id === "rohan-patel") || state.students[0];
  const homeworkList = state.homework.filter((h) => h.classId === student.classId);

  const [activeHw, setActiveHw] = useState<HomeworkItem | null>(null);
  const [submissionNotes, setSubmissionNotes] = useState("");
  const [successBanner, setSuccessBanner] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeHw) return;

    submitHomework(activeHw.id, student.id, submissionNotes, `${student.firstName}_${activeHw.subject}_Work.pdf`);
    setActiveHw(null);
    setSubmissionNotes("");
    setSuccessBanner(true);
    setTimeout(() => setSuccessBanner(false), 4000);
  };

  return (
    <PortalShell activeRole="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">My Homework & Submissions</h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete daily exercises and turn in your solutions online for teacher review
          </p>
        </div>

        {successBanner && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Homework turned in successfully! Your class teacher will review your submission.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {homeworkList.map((hw) => {
            const sub = state.homeworkSubmissions.find(
              (s) => s.homeworkId === hw.id && s.studentId === student.id
            );

            return (
              <div
                key={hw.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {hw.subject}
                    </span>
                    {sub ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Submitted ({sub.submissionDate})</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Due {hw.dueDate}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-sm text-slate-900 leading-snug">
                    {hw.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {hw.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Teacher: {hw.teacherName}</span>
                    <span>Due: {hw.dueDate}</span>
                  </div>

                  {sub?.teacherFeedback && (
                    <div className="mt-3 p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-[11px] text-emerald-800">
                      <strong className="block font-semibold">Teacher Remark ({sub.marksAwarded}/{sub.maxMarks} Marks):</strong>
                      {sub.teacherFeedback}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Class {hw.className}</span>
                  {sub ? (
                    <button
                      type="button"
                      onClick={() => setActiveHw(hw)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200"
                    >
                      Resubmit / Edit Note
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveHw(hw)}
                      className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-school-800 text-white hover:bg-school-900 shadow-soft"
                    >
                      Turn In Work &rarr;
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Turn-in Modal */}
        {activeHw && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-school-700">{activeHw.subject}</span>
                  <h3 className="font-heading font-bold text-base text-slate-900 leading-tight">
                    Submit: {activeHw.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveHw(null)}
                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Student Notes / Answer Summary
                  </label>
                  <textarea
                    rows={4}
                    value={submissionNotes}
                    onChange={(e) => setSubmissionNotes(e.target.value)}
                    required
                    placeholder="Enter exercise answers or notes for your teacher..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 outline-none focus:border-school-600 resize-none"
                  />
                </div>

                <div className="p-4 rounded-xl border border-dashed border-slate-300 text-center bg-slate-50">
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                  <span className="font-semibold text-slate-700 block">Attach Notebook Scan / PDF</span>
                  <span className="text-[10px] text-slate-400">PDF, JPG up to 10MB</span>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveHw(null)}
                    className="px-4 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl font-semibold bg-school-800 text-white hover:bg-school-900 shadow-soft"
                  >
                    Confirm & Turn In
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PortalShell>
  );
}

