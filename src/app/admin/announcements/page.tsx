"use client";

import React, { useState } from "react";
import { Bell, Plus, Send, CheckCircle2, Trash2 } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";
import { Role } from "@/lib/portalTypes";

export default function AdminAnnouncementsPage() {
  const { state, addAnnouncement } = usePortalData();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<"Academic" | "Administrative" | "Events" | "Holiday" | "Urgent">("Administrative");
  const [targetAudience, setTargetAudience] = useState<"all" | Role[]>("all");
  const [priority, setPriority] = useState<"Normal" | "High" | "Urgent">("Normal");
  const [successBanner, setSuccessBanner] = useState(false);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addAnnouncement({
      title,
      content,
      category,
      targetAudience,
      date: new Date().toISOString().split("T")[0],
      author: "Sister Agnes, Head of Administration",
      priority,
    });

    setTitle("");
    setContent("");
    setSuccessBanner(true);
    setTimeout(() => setSuccessBanner(false), 4000);
  };

  return (
    <PortalShell activeRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">Broadcast Circulars & Announcements</h1>
          <p className="text-xs text-slate-500 mt-1">
            Publish institutional notices to parents, teachers, students, or entire school community
          </p>
        </div>

        {successBanner && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Circular published successfully across all selected user portals!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
            <h2 className="font-heading font-bold text-base text-slate-900 mb-1">Compose New Broadcast</h2>
            <p className="text-xs text-slate-500 mb-4">Official communication signed by administration</p>

            <form onSubmit={handlePost} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Circular Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g. Schedule for Annual Exhibition 2026"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-school-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none focus:border-school-600"
                  >
                    <option value="Administrative">Administrative</option>
                    <option value="Academic">Academic</option>
                    <option value="Events">Events</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Audience</label>
                  <select
                    value={targetAudience === "all" ? "all" : "parents"}
                    onChange={(e) => setTargetAudience(e.target.value === "all" ? "all" : ["parent"])}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none focus:border-school-600"
                  >
                    <option value="all">Everyone (All Portals)</option>
                    <option value="parents">Parents Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Message Body</label>
                <textarea
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  placeholder="Enter full institutional circular text..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-school-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-school-800 text-white font-semibold hover:bg-school-900 transition-all shadow-soft flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Notice Immediately</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
            <h2 className="font-heading font-bold text-base text-slate-900 mb-4">
              Published Circulars ({state.announcements.length})
            </h2>

            <div className="space-y-3 text-xs">
              {state.announcements.map((ann) => (
                <div key={ann.id} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{ann.title}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-school-50 text-school-800 border border-school-200">
                        {ann.category}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{ann.date}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">{ann.content}</p>
                  <div className="text-[10px] text-slate-400 pt-1">
                    Author: {ann.author}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

