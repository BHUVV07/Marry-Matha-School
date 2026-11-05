"use client";

import React, { useState } from "react";
import { FolderOpen, FileText, Download, Search, Filter, BookOpen } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function StudentStudyMaterialsPage() {
  const { state } = usePortalData();
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");

  const filtered = state.studyMaterials.filter((m) => {
    const matchSub = subjectFilter === "all" || m.subject.toLowerCase() === subjectFilter.toLowerCase();
    const matchSearch =
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSub && matchSearch;
  });

  const subjects = Array.from(new Set(state.studyMaterials.map((m) => m.subject)));

  const handleDownload = (title: string) => {
    alert(`Downloading study material: "${title}"`);
  };

  return (
    <PortalShell activeRole="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">Digital Study Materials & Notes</h1>
          <p className="text-xs text-slate-500 mt-1">
            Official revision worksheets, textbook guides, and chapter notes curated by faculty
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search guides by title or keyword..."
              className="w-full text-xs outline-none text-slate-800 placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-xl px-3 py-1.5 bg-white text-slate-700 outline-none focus:border-school-600"
            >
              <option value="all">All Subjects</option>
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((mat) => (
            <div
              key={mat.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-school-50 text-school-800 border border-school-200">
                    {mat.subject}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {mat.fileType} • {mat.fileSize}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-sm text-slate-900 leading-snug">
                  {mat.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {mat.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Uploaded by: <strong className="text-slate-600">{mat.uploadedBy}</strong></span>
                  <span>{mat.uploadDate}</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Class {mat.className}</span>
                <button
                  type="button"
                  onClick={() => handleDownload(mat.title)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-school-800 text-white hover:bg-school-900 transition-colors shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resource</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}

