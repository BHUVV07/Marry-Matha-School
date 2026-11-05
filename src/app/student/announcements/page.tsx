"use client";

import React from "react";
import { Bell, Calendar, Tag } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function StudentAnnouncementsPage() {
  const { state } = usePortalData();

  const studentAnnouncements = state.announcements.filter((ann) => {
    if (ann.targetAudience === "all") return true;
    return ann.targetAudience.includes("student");
  });

  return (
    <PortalShell activeRole="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">Morning Assembly Circulars & House Notices</h1>
          <p className="text-xs text-slate-500 mt-1">
            Student activities, house competitions, sports events, and club announcements
          </p>
        </div>

        <div className="space-y-4">
          {studentAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:border-slate-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-school-50 text-school-800 border border-school-200 self-start">
                  {ann.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">{ann.date}</span>
              </div>

              <h2 className="text-base font-heading font-bold text-slate-900 mb-2">{ann.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{ann.content}</p>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                Issued by: <strong className="text-slate-600">{ann.author}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}

