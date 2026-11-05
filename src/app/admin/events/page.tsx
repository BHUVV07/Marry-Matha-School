"use client";

import React, { useState } from "react";
import { Calendar, Plus, MapPin, Clock, Tag } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";

const schoolEvents = [
  {
    id: "evt-01",
    title: "Annual Athletic & Sports Meet 2026",
    date: "December 18–19, 2026",
    time: "08:30 AM – 03:30 PM",
    venue: "School Sports Pavilion & Track",
    category: "Sports",
    desc: "32nd Inter-House track & field championship, march-past, and relay finals with parents attending.",
  },
  {
    id: "evt-02",
    title: "Term 2 Parent-Teacher Consultation Day",
    date: "November 21, 2026",
    time: "09:00 AM – 01:30 PM",
    venue: "Respective Classrooms",
    category: "Academic",
    desc: "15-minute scheduled consultations between parents and subject coordinators.",
  },
  {
    id: "evt-03",
    title: "Science Fair & Environmental Innovation Day",
    date: "December 02, 2026",
    time: "10:00 AM – 02:00 PM",
    venue: "School Auditorium",
    category: "Exhibition",
    desc: "Student project displays covering robotics, clean energy, and environmental biology.",
  },
];

export default function AdminEventsPage() {
  return (
    <PortalShell activeRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">School Events Calendar</h1>
            <p className="text-xs text-slate-500 mt-1">
              Institutional academic schedule, sports meets, and parent-teacher meetings
            </p>
          </div>

          <button
            type="button"
            onClick={() => alert("Creating event...")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-school-800 text-white hover:bg-school-900 shadow-soft self-start"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule New Event</span>
          </button>
        </div>

        <div className="space-y-4">
          {schoolEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  {evt.category}
                </span>
                <h3 className="font-heading font-bold text-base text-slate-900 mt-1">{evt.title}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-2xl">{evt.desc}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-3 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {evt.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {evt.time}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {evt.venue}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalShell>
  );
}

