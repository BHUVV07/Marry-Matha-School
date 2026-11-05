"use client";

import React from "react";
import { CheckSquare, Calendar, Users, Award, Plus } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";

export default function TeacherAssignmentsPage() {
  const assignments = [
    {
      id: "asg-01",
      title: "Science Expo 2026: Working Hydraulic Crane Model",
      class: "Class 4-A",
      dueDate: "2026-11-25",
      submissions: "22 / 36 Submitted",
      marks: "25 Marks",
    },
    {
      id: "asg-02",
      title: "Fractions In Everyday Life: Practical Household Project",
      class: "Class 4-A",
      dueDate: "2026-11-20",
      submissions: "34 / 36 Submitted",
      marks: "20 Marks",
    },
  ];

  return (
    <PortalShell activeRole="teacher">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">Term Projects & Assignments</h1>
            <p className="text-xs text-slate-500 mt-1">
              Practical assessments and continuous evaluation projects for Class 4
            </p>
          </div>

          <button
            type="button"
            onClick={() => alert("Creating term assignment...")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-school-800 text-white hover:bg-school-900 shadow-soft self-start"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Term Assignment</span>
          </button>
        </div>

        <div className="space-y-4">
          {assignments.map((asg) => (
            <div
              key={asg.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                  {asg.class} • {asg.marks}
                </span>
                <h3 className="font-heading font-bold text-base text-slate-900 mt-1">{asg.title}</h3>
                <span className="text-xs text-slate-400 mt-0.5 block">Due Date: {asg.dueDate}</span>
              </div>
              <div className="sm:text-right">
                <span className="font-bold text-slate-800 text-xs block">{asg.submissions}</span>
                <button
                  type="button"
                  onClick={() => alert(`Reviewing submissions for ${asg.title}`)}
                  className="mt-2 text-xs font-semibold text-school-700 hover:underline"
                >
                  Evaluate Submissions &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}

