"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Filter,
  AlertCircle,
  Tag,
  CheckCircle2,
  X,
  Bell,
  Sparkles,
  CalendarDays,
} from "lucide-react";
import { HeroSection } from "@/components/common/HeroSection";
import { SectionHeading } from "@/components/common/SectionHeading";
import { eventsData } from "@/data/eventsData";
import { SchoolEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

const eventCategories = [
  "All Categories",
  "Academic",
  "Sports",
  "Cultural",
  "Parent-Teacher",
];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [activeEventModal, setActiveEventModal] = useState<SchoolEvent | null>(null);

  const filteredEvents = eventsData.filter((event) => {
    const matchesTab = activeTab === "upcoming" ? !event.isPast : event.isPast;
    const matchesCategory =
      selectedCategory === "All Categories" ||
      event.category === selectedCategory;
    return matchesTab && matchesCategory;
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveEventModal(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection
        badge="School Calendar & Activities"
        title="Events & Academic Happenings"
        subtitle="Explore upcoming sports meets, science exhibitions, parent-teacher consultations, and cultural festivals at Mary Matha Primary School."
        breadcrumbs={[{ label: "Events" }]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-amber-400 text-school-950 hover:bg-amber-300 transition-colors shadow-soft"
            >
              <span>Admissions Process</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
            >
              <span>Contact Academic Office</span>
            </Link>
          </div>
        }
      />

      {/* Demonstration Content Notice */}
      <section className="py-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 text-xs text-slate-600">
            <AlertCircle className="w-4 h-4 text-school-700 shrink-0 mt-0.5" />
            <p>
              <strong>Demonstration Calendar Notice: </strong>
              The events scheduled below illustrate our annual extracurricular and academic cadence. Final calendar circulars, holiday lists, and examination dates are published at the commencement of each academic session.
            </p>
          </div>
        </div>
      </section>

      {/* Main Events Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Institutional Rhythm"
            title="School Schedule & Engagements"
            subtitle="Keeping parents, teachers, and students closely connected with academic milestones and co-curricular celebrations."
          />

          {/* Tab Switcher: Upcoming vs Past */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab("upcoming")}
                className={cn(
                  "px-5 py-2 rounded-xl text-xs font-bold transition-all",
                  activeTab === "upcoming"
                    ? "bg-white text-school-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                Upcoming Events ({eventsData.filter((e) => !e.isPast).length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("past")}
                className={cn(
                  "px-5 py-2 rounded-xl text-xs font-bold transition-all",
                  activeTab === "past"
                    ? "bg-white text-school-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                Past Events Archive ({eventsData.filter((e) => e.isPast).length})
              </button>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {eventCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all",
                    selectedCategory === cat
                      ? "bg-school-800 text-white shadow-soft"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-soft hover:shadow-card hover:border-school-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badge & Category */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-school-800 bg-school-50 px-3 py-1 rounded-full border border-school-100">
                      <Calendar className="w-3.5 h-3.5 text-school-600" />
                      <span>{event.date}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {event.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-school-800 transition-colors mb-2">
                    {event.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
                    {event.summary}
                  </p>

                  <div className="space-y-2 text-xs text-slate-500 mb-6 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-school-600 shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-school-600 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveEventModal(event)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-school-700 hover:text-school-900 group/btn"
                  >
                    <span>View Event Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                  {event.isPast && (
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      Concluded
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200">
              <CalendarDays className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-700">
                No events match the selected criteria.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All Categories");
                  setActiveTab("upcoming");
                }}
                className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-school-700 text-white"
              >
                Reset Event Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Event Details Modal */}
      {activeEventModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveEventModal(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-school-50 text-school-800 border border-school-100">
                  {activeEventModal.category}
                </span>
                {activeEventModal.isPast && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                    Concluded
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActiveEventModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
              {activeEventModal.title}
            </h3>

            {/* Event Timing & Venue Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 uppercase font-bold text-[10px]">
                  Date
                </span>
                <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-school-600" />
                  {activeEventModal.date}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 uppercase font-bold text-[10px]">
                  Timing
                </span>
                <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-school-600" />
                  {activeEventModal.time}
                </p>
              </div>

              <div className="sm:col-span-2 space-y-1 pt-2 border-t border-slate-200/60">
                <span className="text-slate-400 uppercase font-bold text-[10px]">
                  Venue / Location
                </span>
                <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-school-600" />
                  {activeEventModal.location}
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Event Description & Participation
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeEventModal.details}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-school-50 border border-school-100 text-xs text-school-800 space-y-1 mb-6">
              <p className="font-bold flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-school-600" />
                <span>Parent & Attendee Advisory</span>
              </p>
              <p className="text-slate-600">
                Please ensure students arrive in prescribed school uniforms. Visitors are requested to carry parent ID badges for security clearance.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <Link
                href="/contact"
                className="text-xs font-bold text-school-700 hover:text-school-900"
              >
                Inquire with School Office
              </Link>
              <button
                type="button"
                onClick={() => setActiveEventModal(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Annual Calendar Overview Card */}
      <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Digital Ecosystem Integration
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Real-Time Event Notifications in Portals
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                Parents, students, and teachers will receive automated SMS reminders and in-portal calendar sync upon release of the Mary Matha Digital Ecosystem Phase 2.
              </p>
            </div>
            <Link
              href="/parent"
              className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-school-700 text-white hover:bg-school-800 shadow-soft transition-colors shrink-0"
            >
              Explore Parent Portal Preview
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

