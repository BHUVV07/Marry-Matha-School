"use client";

import React from "react";
import { Shield, Check, X, Lock } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";

const rbacMatrix = [
  { module: "Student Records & Profile", admin: true, principal: true, teacher: "Read / Class", accountant: "Read / Fees", parent: "Own Child", student: "Own Profile" },
  { module: "Attendance Register", admin: true, principal: true, teacher: "Mark / Class", accountant: false, parent: "Read / Ward", student: "Read Only" },
  { module: "Homework & Assignments", admin: true, principal: true, teacher: "Create / Grade", accountant: false, parent: "Read / Status", student: "Submit / View" },
  { module: "Marks & Exam Results", admin: true, principal: true, teacher: "Enter Marks", accountant: false, parent: "Read Report Card", student: "Read Grades" },
  { module: "Fee Payments & Offline Counter", admin: true, principal: "Audit Only", teacher: false, accountant: "Record / Receipts", parent: "Pay / Receipts", student: false },
  { module: "Admissions Pipeline", admin: "Full CRUD", principal: "Approve / Reject", teacher: false, accountant: false, parent: false, student: false },
  { module: "Circulars Broadcast", admin: "All Audiences", principal: "School-Wide", teacher: "Class Only", accountant: false, parent: false, student: false },
  { module: "System Configurations", admin: true, principal: false, teacher: false, accountant: false, parent: false, student: false },
];

export default function AdminRolesPage() {
  return (
    <PortalShell activeRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">Role-Based Access Control (RBAC) Matrix</h1>
          <p className="text-xs text-slate-500 mt-1">
            Data security boundaries and permissions prepared for PostgreSQL Row-Level Security (RLS)
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
                  <th className="py-3 px-4 rounded-l-xl">Ecosystem Module</th>
                  <th className="py-3 px-4">Admin</th>
                  <th className="py-3 px-4">Principal</th>
                  <th className="py-3 px-4">Teacher</th>
                  <th className="py-3 px-4">Accountant</th>
                  <th className="py-3 px-4">Parent</th>
                  <th className="py-3 px-4 rounded-r-xl">Student</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rbacMatrix.map((row) => (
                  <tr key={row.module} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{row.module}</td>
                    <td className="py-3.5 px-4 font-medium text-emerald-700">
                      {typeof row.admin === "boolean" ? (row.admin ? "Full Access" : "No Access") : row.admin}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-amber-700">
                      {typeof row.principal === "boolean" ? (row.principal ? "Full Access" : "No Access") : row.principal}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {typeof row.teacher === "boolean" ? (row.teacher ? "Full Access" : "—") : row.teacher}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {typeof row.accountant === "boolean" ? (row.accountant ? "Full Access" : "—") : row.accountant}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {typeof row.parent === "boolean" ? (row.parent ? "Full Access" : "—") : row.parent}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {typeof row.student === "boolean" ? (row.student ? "Full Access" : "—") : row.student}
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

