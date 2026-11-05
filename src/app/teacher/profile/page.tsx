"use client";

import React from "react";
import { User, Mail, Phone, BookOpen, Award, CheckCircle2, ShieldCheck } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function TeacherProfilePage() {
  const { state } = usePortalData();
  const teacher = state.teachers.find((t) => t.id === "teacher-001") || state.teachers[0];

  return (
    <PortalShell activeRole="teacher">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">Faculty Credentials & Profile</h1>
          <p className="text-xs text-slate-500 mt-1">
            Institutional faculty record and subject allocations • Mary Matha Primary School
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-700 text-white flex items-center justify-center font-bold text-2xl shadow-soft">
                SS
              </div>
              <div>
                <h2 className="text-lg font-heading font-bold text-slate-900">{teacher.name}</h2>
                <p className="text-xs text-indigo-700 font-semibold">{teacher.designation}</p>
                <span className="inline-block mt-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {teacher.status} Faculty
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Employee Code</span>
              <span className="font-mono font-bold text-slate-800 text-sm">{teacher.employeeId}</span>
              <span className="text-xs text-slate-400 block mt-0.5">Exp: {teacher.experienceYears} Years</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs pt-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-semibold block mb-1">Department</span>
              <span className="font-bold text-slate-900">{teacher.department}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-semibold block mb-1">Academic Degree</span>
              <span className="font-bold text-slate-900">{teacher.qualification}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-semibold block mb-1">Class Teacher Duties</span>
              <span className="font-bold text-school-800">{teacher.isClassTeacherOf || "Class 4-A"}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-semibold block mb-1">Official Email</span>
              <span className="font-mono text-slate-800">{teacher.email}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-semibold block mb-1">Contact Phone</span>
              <span className="font-mono text-slate-800">{teacher.phone}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-semibold block mb-1">Assigned Classes</span>
              <span className="font-bold text-slate-900">{teacher.assignedClasses.join(", ")}</span>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

