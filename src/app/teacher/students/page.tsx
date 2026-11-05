"use client";

import React, { useState } from "react";
import { Users, Search, Phone, Mail, MapPin, UserCheck } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function TeacherStudentsPage() {
  const { state } = usePortalData();
  const [searchTerm, setSearchTerm] = useState("");

  const classStudents = state.students.filter((s) => s.classId === "cls-4a");

  const filtered = classStudents.filter(
    (s) =>
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.includes(searchTerm) ||
      s.admissionNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PortalShell activeRole="teacher">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">Class 4-A Student Directory</h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete student roster, attendance metrics, and registered guardian contact details
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search students by name, roll number, or admission number..."
            className="w-full text-xs outline-none text-slate-800 placeholder:text-slate-400"
          />
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-base text-slate-900">
              Students Enrolled ({filtered.length})
            </h2>
            <span className="text-xs text-slate-400">Class Teacher: Mrs. Sunita Sharma</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
                  <th className="py-3 px-4 rounded-l-xl">Roll No</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">House & Blood</th>
                  <th className="py-3 px-4">Attendance</th>
                  <th className="py-3 px-4">Guardian Name</th>
                  <th className="py-3 px-4 rounded-r-xl">Emergency Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">#{s.rollNo}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block">{s.fullName}</span>
                      <span className="text-[11px] text-slate-400 font-mono">Adm: {s.admissionNo}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div>{s.house.split(" ")[0]}</div>
                      <span className="text-[11px] text-rose-600 font-medium">{s.bloodGroup}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-emerald-600">{s.attendancePercentage}%</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">{s.parentName}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-800">{s.emergencyContact}</td>
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

