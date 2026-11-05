"use client";

import React from "react";
import Link from "next/link";
import { Building, Users, UserCheck, Layers, ChevronRight, Plus } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function AdminClassesPage() {
  const { state } = usePortalData();

  const wings = [
    {
      name: "Pre-Primary Wing",
      grades: "Nursery, LKG, UKG",
      sections: 6,
      students: 110,
      coordinator: "Ms. Sneha Deshmukh",
    },
    {
      name: "Primary Wing",
      grades: "Class 1 to Class 5",
      sections: 10,
      students: 235,
      coordinator: "Mrs. Sunita Sharma",
    },
    {
      name: "Middle School Wing",
      grades: "Class 6 to Class 8",
      sections: 6,
      students: 135,
      coordinator: "Mrs. Mary Joseph",
    },
  ];

  return (
    <PortalShell activeRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">Class Wings & Academic Structure</h1>
            <p className="text-xs text-slate-500 mt-1">
              Grade wings, section allocations, and division strength for Academic Year 2026–2027
            </p>
          </div>

          <Link
            href="/admin/sections"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-school-800 text-white hover:bg-school-900 shadow-soft self-start"
          >
            Manage Sections & Rooms &rarr;
          </Link>
        </div>

        {/* Wings Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {wings.map((w) => (
            <div
              key={w.name}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-school-700 bg-school-50 px-2.5 py-0.5 rounded-full border border-school-200">
                  Academic Wing
                </span>
                <h2 className="text-base font-heading font-bold text-slate-900 mt-2">{w.name}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{w.grades}</p>

                <div className="my-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Active Sections:</span>
                    <strong className="text-slate-800">{w.sections} Divisions</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Enrolled:</span>
                    <strong className="text-slate-800">{w.students} Students</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Wing Coordinator:</span>
                    <strong className="text-slate-800">{w.coordinator}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <Link
                  href="/admin/sections"
                  className="text-xs font-semibold text-school-700 hover:text-school-900 flex items-center justify-between"
                >
                  <span>View Sections & Classrooms</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Master Class List Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <h2 className="font-heading font-bold text-base text-slate-900 mb-4">
            Active Classes & Assigned Class Teachers
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
                  <th className="py-3 px-4 rounded-l-xl">Class & Sec</th>
                  <th className="py-3 px-4">Academic Wing</th>
                  <th className="py-3 px-4">Classroom</th>
                  <th className="py-3 px-4">Class Teacher</th>
                  <th className="py-3 px-4">Capacity</th>
                  <th className="py-3 px-4 rounded-r-xl">Enrollment Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {state.classes.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{c.className} — Sec {c.section}</td>
                    <td className="py-3.5 px-4 text-slate-600">{c.wing}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">{c.roomNumber}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{c.classTeacherName}</td>
                    <td className="py-3.5 px-4 text-slate-600">{c.capacity} Max</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-600">{c.enrolledCount} / {c.capacity}</span>
                        <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full"
                            style={{ width: `${(c.enrolledCount / c.capacity) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
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

