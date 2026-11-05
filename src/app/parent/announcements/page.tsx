"use client";

import React, { useState } from "react";
import { Bell, Calendar, Tag, Filter, Search, Sparkles } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";
import { cn } from "@/lib/utils";

export default function ParentAnnouncementsPage() {
  const { state } = usePortalData();
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const parentAnnouncements = state.announcements.filter((ann) => {
    if (ann.targetAudience === "all") return true;
    return ann.targetAudience.includes("parent");
  });

  const filtered = parentAnnouncements.filter((ann) => {
    const matchCat = categoryFilter === "all" || ann.category === categoryFilter;
    const matchSearch =
      ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ann.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <PortalShell activeRole="parent">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">Official School Circulars & Notices</h1>
          <p className="text-xs text-slate-500 mt-1">
            Important broadcasts from Mary Matha administration, principal, and faculty coordinators
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search circulars by keyword..."
              className="w-full text-xs outline-none text-slate-800 placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-xl px-3 py-1.5 bg-white text-slate-700 outline-none focus:border-school-600"
            >
              <option value="all">All Categories</option>
              <option value="Academic">Academic</option>
              <option value="Administrative">Administrative</option>
              <option value="Events">Events</option>
              <option value="Holiday">Holiday</option>
            </select>
          </div>
        </div>

        {/* Notices Cards List */}
        <div className="space-y-4">
          {filtered.map((ann) => (
            <div
              key={ann.id}
              className={cn(
                "bg-white rounded-2xl border p-5 sm:p-6 shadow-xs transition-all",
                ann.priority === "High"
                  ? "border-amber-300 ring-2 ring-amber-300/20"
                  : "border-slate-200/90"
              )}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-school-50 text-school-800 border border-school-200">
                    {ann.category}
                  </span>
                  {ann.priority === "High" && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      Priority High
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400 font-mono">{ann.date}</span>
              </div>

              <h2 className="text-base font-heading font-bold text-slate-900 mb-2">{ann.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{ann.content}</p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Issued by: <strong className="text-slate-600">{ann.author}</strong></span>
                <span>Mary Matha Administrative Board</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}

