"use client";

import React from "react";
import { User, Calendar, MapPin, Bus, Heart, BookOpen, ShieldCheck } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function StudentProfilePage() {
  const { state } = usePortalData();
  const student = state.students.find((s) => s.id === "rohan-patel") || state.students[0];

  return (
    <PortalShell activeRole="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">Student Profile & Biodata</h1>
          <p className="text-xs text-slate-500 mt-1">
            Enrolled student academic registration details • Mary Matha Primary School
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-school-800 text-white flex items-center justify-center font-bold text-2xl shadow-soft">
                RP
              </div>
              <div>
                <h2 className="text-lg font-heading font-bold text-slate-900">{student.fullName}</h2>
                <p className="text-xs text-school-700 font-semibold">
                  Class {student.className} — Section {student.section} • Roll #{student.rollNo}
                </p>
                <span className="inline-block mt-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {student.house}
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Admission Number</span>
              <span className="font-mono font-bold text-slate-800 text-sm">{student.admissionNo}</span>
              <span className="text-xs text-slate-400 block mt-0.5">Enrolled: {student.enrolledDate}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs pt-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-semibold block mb-1">Date of Birth</span>
              <span className="font-bold text-slate-900">{student.dateOfBirth} (Age 10)</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-semibold block mb-1">Blood Group</span>
              <span className="font-bold text-rose-600">{student.bloodGroup}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-semibold block mb-1">Gender</span>
              <span className="font-bold text-slate-900">{student.gender}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-semibold block mb-1">Guardian / Father</span>
              <span className="font-bold text-slate-900">{student.parentName}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-semibold block mb-1">Emergency Phone</span>
              <span className="font-mono text-slate-900">{student.emergencyContact}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-semibold block mb-1">School Transport</span>
              <span className="font-bold text-slate-900">{student.busRoute}</span>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{student.address}</span>
            </div>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Active Student Record</span>
            </span>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

