"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutGrid,
  BookOpen,
  FlaskConical,
  Monitor,
  Trophy,
  Music,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  MapPin,
  ExternalLink,
  X,
} from "lucide-react";
import { HeroSection } from "@/components/common/HeroSection";
import { SectionHeading } from "@/components/common/SectionHeading";
import { facilitiesData } from "@/data/facilitiesData";
import { Facility } from "@/lib/types";
import { cn } from "@/lib/utils";

const facilityIcons: Record<string, React.ReactNode> = {
  LayoutGrid: <LayoutGrid className="w-5 h-5 text-sky-600" />,
  BookOpen: <BookOpen className="w-5 h-5 text-indigo-600" />,
  FlaskConical: <FlaskConical className="w-5 h-5 text-teal-600" />,
  Monitor: <Monitor className="w-5 h-5 text-blue-600" />,
  Trophy: <Trophy className="w-5 h-5 text-amber-600" />,
  Music: <Music className="w-5 h-5 text-rose-600" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
};

const categories = [
  "All Facilities",
  "Academic Infrastructure",
  "Learning Resources",
  "Practical Learning",
  "Technology",
  "Sports & Athletics",
  "Creative Arts",
  "Student Well-being",
];

export default function FacilitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Facilities");
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  const filteredFacilities =
    selectedCategory === "All Facilities"
      ? facilitiesData
      : facilitiesData.filter((item) => item.category === selectedCategory);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedFacility(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection
        badge="Campus Infrastructure"
        title="Modern, Child-Friendly School Facilities"
        subtitle="Creating safe, stimulating, and well-equipped physical spaces that empower young minds to explore, experiment, read, and play."
        breadcrumbs={[{ label: "Facilities" }]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-amber-400 text-school-950 hover:bg-amber-300 transition-colors shadow-soft"
            >
              <span>Schedule a Campus Tour</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
            >
              <span>View Photo Gallery</span>
            </Link>
          </div>
        }
      />

      {/* Verification Transparency Notice */}
      <section className="py-5 bg-school-50 border-b border-school-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 text-xs text-school-900 leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-school-600 shrink-0 mt-0.5" />
            <p>
              <strong>Campus Facility Overview: </strong>
              Mary Matha School campus at Barve, Ripponpet features 4 core academic classrooms with a personalized 15:1 student-teacher ratio, expansive tree-shaded assembly and sports grounds, supervised boarding facilities under Sister Gracelin&apos;s administration, and foundational library and science practical learning spaces.
            </p>
          </div>
        </div>
      </section>

      {/* Main Facilities Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Campus Tour"
            title="Explore Our Learning Spaces"
            subtitle="Thoughtfully structured facilities designed to inspire curiosity and nurture the all-round growth of every child."
          />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-school-600",
                  selectedCategory === cat
                    ? "bg-school-700 text-white shadow-soft"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Facility Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFacilities.map((facility) => (
              <div
                key={facility.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-soft hover:shadow-card hover:border-school-300 transition-all duration-300 flex flex-col group"
              >
                {/* Facility Image with overlay badge */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={facility.imageUrl}
                    alt={facility.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 text-school-900 shadow-sm backdrop-blur-xs">
                      {facility.category}
                    </span>
                  </div>
                </div>

                {/* Facility Details */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-school-50 border border-school-100 shrink-0">
                        {facilityIcons[facility.icon] || (
                          <Sparkles className="w-5 h-5 text-school-600" />
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-school-800 transition-colors">
                        {facility.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                      {facility.shortDesc}
                    </p>

                    {/* Key Highlights */}
                    <div className="space-y-2 mb-6">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Key Features:
                      </p>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {facility.highlights.slice(0, 3).map((hl, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-school-600 shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Read More Trigger */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedFacility(facility)}
                      className="text-xs font-bold text-school-700 hover:text-school-900 inline-flex items-center gap-1 group/btn"
                    >
                      <span>Read Full Overview</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Campus Wing
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFacilities.length === 0 && (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200">
              <p className="text-sm font-semibold text-slate-700">
                No facilities found in this category.
              </p>
              <button
                type="button"
                onClick={() => setSelectedCategory("All Facilities")}
                className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-school-700 text-white"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Facility Detail Modal */}
      {selectedFacility && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="facility-modal-title"
          onClick={() => setSelectedFacility(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedFacility(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 shadow-sm transition-colors"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-slate-100">
              <Image
                src={selectedFacility.imageUrl}
                alt={selectedFacility.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-school-900 shadow">
                  {selectedFacility.category}
                </span>
              </div>
            </div>

            <h3
              id="facility-modal-title"
              className="text-2xl font-extrabold text-slate-900 mb-2"
            >
              {selectedFacility.title}
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {selectedFacility.fullDesc}
            </p>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-6 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Specifications & Highlights
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {selectedFacility.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-school-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <Link
                href="/admissions"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-school-700 text-white hover:bg-school-800 transition-colors shadow-soft"
              >
                Schedule Tour
              </Link>
              <button
                type="button"
                onClick={() => setSelectedFacility(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Safety & Hygiene Protocol Callout */}
      <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Child Safety Standards</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                A Secure, Hygienic and Monitored Campus Ecosystem
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                From regulated entry points and complete CCTV coverage to regular emergency fire drills and sanitized washrooms, student safety is built directly into every operational procedure.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                href="/contact"
                className="w-full text-center px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-school-700 text-white hover:bg-school-800 shadow-soft transition-colors"
              >
                Enquire About Campus Visit
              </Link>
              <Link
                href="/admissions"
                className="w-full text-center px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                Admissions Information
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

