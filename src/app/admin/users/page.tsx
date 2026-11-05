"use client";

import React from "react";
import { Users, Shield, UserCheck, Mail, Phone, Lock } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { DEMO_ACCOUNTS } from "@/context/AuthContext";
import { Role } from "@/lib/portalTypes";

export default function AdminUsersPage() {
  const users = Object.values(DEMO_ACCOUNTS);

  return (
    <PortalShell activeRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">Portal User Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Active demonstration accounts and role permissions • Mary Matha ERP Platform
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
                  <th className="py-3 px-4 rounded-l-xl">User Name</th>
                  <th className="py-3 px-4">Email / Login ID</th>
                  <th className="py-3 px-4">Role Assigned</th>
                  <th className="py-3 px-4">Designation</th>
                  <th className="py-3 px-4 rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{u.name}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">{u.email}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-school-50 text-school-800 border border-school-200">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">{u.designation || u.department || "User"}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                        Active Verified
                      </span>
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

