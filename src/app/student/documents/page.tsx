"use client";

import React from "react";
import { FolderOpen, FileText, Download, ShieldCheck, CreditCard } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function StudentDocumentsPage() {
  const { state } = usePortalData();
  const student = state.students.find((s) => s.id === "rohan-patel") || state.students[0];

  const studentDocs = [
    {
      id: "std-01",
      title: "Digital Student Identity Card (2026–2027)",
      category: "Identification",
      format: "PDF",
      size: "420 KB",
      desc: `Authorized ID credential for ${student.fullName} (Adm No: ${student.admissionNo}). Valid across school campus, sports pavilion, and library.`,
    },
    {
      id: "std-02",
      title: "Mid-Term 2 Examination Admit Card & Hall Ticket",
      category: "Admit Card",
      format: "PDF",
      size: "350 KB",
      desc: "Verified hall ticket with roll allocation (Roll #12, Exam Hall A) for December 2026 assessments.",
    },
    {
      id: "std-03",
      title: "Class 4 Annual Curriculum Syllabus Booklet",
      category: "Curriculum",
      format: "PDF",
      size: "2.8 MB",
      desc: "Complete syllabus coverage for Mathematics, General Science, English, Hindi, and Social Studies.",
    },
  ];

  return (
    <PortalShell activeRole="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">My Student Credentials & Documents</h1>
          <p className="text-xs text-slate-500 mt-1">
            Digital student identification, exam hall tickets, and syllabus booklets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studentDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-school-50 text-school-800 border border-school-200">
                    {doc.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {doc.format} • {doc.size}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-sm text-slate-900 leading-snug">
                  {doc.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {doc.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Official Record</span>
                </span>
                <button
                  type="button"
                  onClick={() => alert(`Downloading ${doc.title}`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-school-800 text-white hover:bg-school-900 transition-colors shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}

