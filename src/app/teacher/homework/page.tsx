"use client";

import React, { useState } from "react";
import { BookOpen, Plus, Calendar, Clock, CheckCircle2, Users, FileText, X } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";
import { HomeworkItem } from "@/lib/portalTypes";

export default function TeacherHomeworkPage() {
  const { state, createHomework } = usePortalData();

  const teacher = state.teachers.find((t) => t.id === "teacher-001") || state.teachers[0];
  const homeworkList = state.homework.filter((h) => h.teacherId === teacher.id);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Mathematics");
  const [classId, setClassId] = useState("cls-4a");
  const [dueDate, setDueDate] = useState("2026-11-10");
  const [description, setDescription] = useState("");
  const [attachmentName, setAttachmentName] = useState("");
  const [successBanner, setSuccessBanner] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    createHomework({
      title,
      subject,
      classId,
      className: classId === "cls-4a" ? "Class 4" : "Class 4",
      section: classId === "cls-4a" ? "A" : "B",
      assignedDate: new Date().toISOString().split("T")[0],
      dueDate,
      description,
      teacherId: teacher.id,
      teacherName: teacher.name,
      attachmentName: attachmentName ? `${attachmentName}.pdf` : undefined,
    });

    setShowCreateModal(false);
    setTitle("");
    setDescription("");
    setAttachmentName("");
    setSuccessBanner(true);
    setTimeout(() => setSuccessBanner(false), 4000);
  };

  return (
    <PortalShell activeRole="teacher">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">
              Homework & Assignment Manager
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Create, schedule, and evaluate homework tasks for your assigned classes
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-school-800 text-white hover:bg-school-900 shadow-soft self-start"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Homework</span>
          </button>
        </div>

        {successBanner && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>New homework assignment posted successfully! Students and parents have been notified.</span>
          </div>
        )}

        {/* Homework List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {homeworkList.map((hw) => (
            <div
              key={hw.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {hw.subject} • Class {hw.className}-{hw.section}
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">Due: {hw.dueDate}</span>
                </div>

                <h3 className="font-heading font-bold text-sm text-slate-900 leading-snug">
                  {hw.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {hw.description}
                </p>

                {hw.attachmentName && (
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-school-700 font-medium">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{hw.attachmentName}</span>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Submissions</span>
                  <span className="font-bold text-slate-900 text-xs">
                    {hw.submissionCount} / {hw.totalStudents} Turned In
                  </span>
                </div>

                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active in Portal
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Create Homework Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-heading font-bold text-base text-slate-900">
                  Assign New Class Homework
                </h3>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Homework Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="e.g. Geometry: Angles and Triangles Worksheet"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-school-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Class</label>
                    <select
                      value={classId}
                      onChange={(e) => setClassId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 outline-none focus:border-school-600"
                    >
                      <option value="cls-4a">Class 4 — Section A</option>
                      <option value="cls-4b">Class 4 — Section B</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 outline-none focus:border-school-600"
                    >
                      <option value="Mathematics">Mathematics</option>
                      <option value="Environmental Science">Environmental Science</option>
                      <option value="General Science">General Science</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Due Date</label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-slate-900 outline-none focus:border-school-600"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Attachment Name</label>
                    <input
                      type="text"
                      value={attachmentName}
                      onChange={(e) => setAttachmentName(e.target.value)}
                      placeholder="e.g. Geometry_Exercises_4_3"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-school-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Detailed Instructions for Students
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Describe problems, pages, and presentation guidelines..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-school-600 resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl font-semibold bg-school-800 text-white hover:bg-school-900 shadow-soft"
                  >
                    Publish to Students
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

