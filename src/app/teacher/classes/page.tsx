"use client";

import React from "react";
import Link from "next/link";
import { Building, Users, BookOpen, Clock, ChevronRight } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function TeacherClassesPage() {
  const { state } = usePortalData();

  const myClasses = [
    {
      id: "cls-4a",
      name: "Class 4 — Section A",
      role: "Class Teacher & Math Faculty",
      room: "Room 204",
      studentsCount: 36,
      attendanceToday: "94.4%",
      subjects: ["Mathematics", "General Science", "Environmental Science"],
    },
    {
      id: "cls-4b",
      name: "Class 4 — Section B",
      role: "Subject Faculty",
      room: "Room 205",
      studentsCount: 35,
      attendanceToday: "92.0%",
      subjects: ["Mathematics"],
    },
    {
      id: "cls-5a",
      name: "Class 5 — Section A",
      role: "Subject Faculty",
      room: "Room 208",
      studentsCount: 38,
      attendanceToday: "96.5%",
      subjects: ["Mathematics (Advanced)"],
    },
  ];

  return (
    <PortalShell activeRole="teacher">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">My Assigned Classes</h1>
          <p className="text-xs text-slate-500 mt-1">
            Classes and subjects allocated to Mrs. Sunita Sharma for Academic Year 2026–2027
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {myClasses.map((cls) => (
            <div
              key={cls.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-school-50 text-school-800 border border-school-200">
                    {cls.room}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600">
                    {cls.attendanceToday} Present
                  </span>
                </div>

                <h2 className="text-base font-heading font-bold text-slate-900">{cls.name}</h2>
                <p className="text-xs font-medium text-school-700 mt-0.5">{cls.role}</p>

                <div className="my-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Enrolled Strength:</span>
                    <strong className="text-slate-800">{cls.studentsCount} Students</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold mb-1">
                      Teaching Subjects
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cls.subjects.map((sub) => (
                        <span key={sub} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/teacher/attendance"
                  className="text-xs font-semibold text-school-700 hover:text-school-900 flex items-center gap-1"
                >
                  <span>Attendance Roster &rarr;</span>
                </Link>
                <Link
                  href="/teacher/students"
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Student List
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}

