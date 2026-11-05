"use client";

import React from "react";
import { Layers, Building, Users, UserCheck } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function AdminSectionsPage() {
  const { state } = usePortalData();

  return (
    <PortalShell activeRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">Section Allocation & Classrooms</h1>
          <p className="text-xs text-slate-500 mt-1">
            Section divisions, assigned rooms, and class teachers across all campus wings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {state.classes.map((cls) => (
            <div
              key={cls.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-school-800 bg-school-50 px-2 py-0.5 rounded border border-school-200">
                    {cls.roomNumber}
                  </span>
                  <span className="text-xs text-slate-400">{cls.wing}</span>
                </div>

                <h3 className="font-heading font-bold text-base text-slate-900">
                  {cls.className} — Section {cls.section}
                </h3>
                <p className="text-xs text-school-700 font-semibold mt-0.5">
                  Class Teacher: {cls.classTeacherName}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Student Enrollment:</span>
                  <strong className="text-emerald-700 font-bold">
                    {cls.enrolledCount} / {cls.capacity} Enrolled
                  </strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}

