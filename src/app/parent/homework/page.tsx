"use client";

import React, { useState } from "react";
import { BookOpen, Calendar, Clock, CheckCircle2, AlertCircle, FileText, Download, X, User } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { HomeworkItem } from "@/lib/portalTypes";
import { cn } from "@/lib/utils";

export default function ParentHomeworkPage() {
  const { selectedChildId } = useAuth();
  const { state } = usePortalData();

  const [selectedHw, setSelectedHw] = useState<HomeworkItem | null>(null);
  const [subjectFilter, setSubjectFilter] = useState("all");

  const child = state.students.find((s) => s.id === selectedChildId) || state.students[0];
  const homeworkList = state.homework.filter((h) => h.classId === child?.classId);

  const filtered = homeworkList.filter((h) => {
    if (subjectFilter === "all") return true;
    return h.subject.toLowerCase() === subjectFilter.toLowerCase();
  });

  const subjects = Array.from(new Set(homeworkList.map((h) => h.subject)));

  return (
    <PortalShell activeRole="parent">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">Homework & Assignments</h1>
            <p className="text-xs text-slate-500 mt-1">
              Class {child?.className}-{child?.section} • Daily exercises assigned by subject teachers
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Filter Subject:</span>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-xl px-3 py-1.5 bg-white text-slate-700 outline-none focus:border-school-600"
            >
              <option value="all">All Subjects ({homeworkList.length})</option>
              {subjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Homework Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((hw) => {
            const submission = state.homeworkSubmissions.find(
              (s) => s.homeworkId === hw.id && s.studentId === child?.id
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
                    {submission ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{submission.status}</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Pending</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-sm text-slate-900 leading-snug">
                    {hw.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {hw.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" />
                      {hw.teacherName}
                    </span>
                    <span>•</span>
                    <span>Assigned: {hw.assignedDate}</span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Submission Deadline</span>
                    <span className="font-bold text-amber-800">{hw.dueDate}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedHw(hw)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-school-50 text-school-800 hover:bg-school-100 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Homework Detail Modal */}
        {selectedHw && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
                  {selectedHw.subject}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedHw(null)}
                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2 className="text-base font-heading font-bold text-slate-900 mb-2">
                {selectedHw.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                <span>Teacher: {selectedHw.teacherName}</span>
                <span>•</span>
                <span>Due: {selectedHw.dueDate}</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4 text-xs text-slate-700 leading-relaxed">
                <h4 className="font-bold text-slate-900 mb-1">Teacher Instructions:</h4>
                <p>{selectedHw.description}</p>
              </div>

              {selectedHw.attachmentName && (
                <div className="p-3 rounded-xl bg-school-50/70 border border-school-200 text-xs text-school-900 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-school-600" />
                    <span className="font-medium">{selectedHw.attachmentName}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert(`Downloading ${selectedHw.attachmentName}`)}
                    className="font-semibold text-school-700 hover:underline flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              )}

              <div className="flex justify-end pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedHw(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalShell>
  );
}

