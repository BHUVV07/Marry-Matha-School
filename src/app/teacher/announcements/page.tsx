"use client";

import React, { useState } from "react";
import { Bell, Plus, Send, CheckCircle2 } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function TeacherAnnouncementsPage() {
  const { state, addAnnouncement } = usePortalData();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<"Academic" | "Events" | "Holiday">("Academic");
  const [successBanner, setSuccessBanner] = useState(false);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addAnnouncement({
      title,
      content,
      category,
      targetAudience: ["student", "parent"],
      date: new Date().toISOString().split("T")[0],
      author: "Mrs. Sunita Sharma (Class Teacher 4-A)",
      priority: "Normal",
    });

    setTitle("");
    setContent("");
    setSuccessBanner(true);
    setTimeout(() => setSuccessBanner(false), 4000);
  };

  return (
    <PortalShell activeRole="teacher">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">Broadcast Class Circulars</h1>
          <p className="text-xs text-slate-500 mt-1">
            Post announcements and homework reminders to Class 4-A parents and students
          </p>
        </div>

        {successBanner && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Class announcement broadcast successfully to parents and students.</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
            <h2 className="font-heading font-bold text-base text-slate-900 mb-1">Compose New Notice</h2>
            <p className="text-xs text-slate-500 mb-4">Broadcast directly to student and parent feeds</p>

            <form onSubmit={handlePost} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notice Headline</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g. Science Fair Presentation Chart Submissions"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 outline-none focus:border-school-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as "Academic" | "Events" | "Holiday")}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 outline-none focus:border-school-600"
                >
                  <option value="Academic">Academic Notice</option>
                  <option value="Events">School Event</option>
                  <option value="Holiday">Holiday Reminder</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed Message</label>
                <textarea
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  placeholder="Write clear instructions for students and parents..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 outline-none focus:border-school-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-school-800 text-white font-semibold hover:bg-school-900 transition-all shadow-soft flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Broadcast</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
            <h2 className="font-heading font-bold text-base text-slate-900 mb-4">Recent School Notices</h2>
            <div className="space-y-3 text-xs">
              {state.announcements.map((ann) => (
                <div key={ann.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{ann.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{ann.date}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

