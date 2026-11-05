"use client";

import React from "react";
import { CheckSquare, Calendar, User, Award, FileText } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";

const assignments = [
  {
    id: "asg-01",
    title: "Science Expo 2026: Working Hydraulic Crane Model",
    subject: "General Science & Robotics",
    dueDate: "2026-11-25",
    assignedBy: "Mrs. Sunita Sharma",
    marks: "25 Marks (Internal Assessment)",
    description: "Construct a simple hydraulic syringe-driven robotic arm using cardboard, plastic tubing, and water pistons. Prepare a 1-page chart explaining Pascal's principle.",
    status: "In Progress",
  },
  {
    id: "asg-02",
    title: "Social Studies Heritage Album: Monuments of Maharashtra",
    subject: "Social Studies",
    dueDate: "2026-11-18",
    assignedBy: "Mr. Vinod Pandey",
    marks: "20 Marks",
    description: "Collect 5 photographs or drawings of prominent forts and cave architectures in Maharashtra (e.g. Ajanta, Raigad, Deogiri) with a 50-word historical profile for each.",
    status: "Completed",
  },
  {
    id: "asg-03",
    title: "English Creative Writing Portfolio: Nature Poetry",
    subject: "English Literature",
    dueDate: "2026-11-30",
    assignedBy: "Mr. Rajesh Verma",
    marks: "15 Marks",
    description: "Compose two original four-stanza poems celebrating morning dawn or monsoons using alliteration, rhyming couplets, and sensory metaphors.",
    status: "In Progress",
  },
];

export default function StudentAssignmentsPage() {
  return (
    <PortalShell activeRole="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">Project Assignments & Practicals</h1>
          <p className="text-xs text-slate-500 mt-1">
            Long-term co-curricular and continuous assessment projects for Class 4-A
          </p>
        </div>

        <div className="space-y-4">
          {assignments.map((asg) => (
            <div
              key={asg.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {asg.subject}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    {asg.marks}
                  </span>
                </div>

                <h2 className="text-base font-heading font-bold text-slate-900">{asg.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{asg.description}</p>

                <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                  <span>Assigned By: <strong className="text-slate-600">{asg.assignedBy}</strong></span>
                  <span>•</span>
                  <span>Final Submission: <strong className="text-slate-700">{asg.dueDate}</strong></span>
                </div>
              </div>

              <div className="sm:text-right shrink-0">
                <span className="inline-block px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Status: {asg.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}

