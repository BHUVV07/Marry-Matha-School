"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Award,
  Sparkles,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Heart,
  Users,
  Compass,
  X,
} from "lucide-react";
import { HeroSection } from "@/components/common/HeroSection";
import { SectionHeading } from "@/components/common/SectionHeading";
import { facultyData } from "@/data/facultyData";
import { FacultyMember } from "@/lib/types";
import { cn } from "@/lib/utils";

const departments = [
  "All Departments",
  "Mathematics",
  "Science",
  "Languages",
  "Primary Wing",
  "Computer Science",
  "Social Sciences",
  "Sports & Athletics",
  "Creative Arts",
];

export default function FacultyPage() {
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);

  const filteredFaculty = facultyData.filter((member) => {
    const matchesDept =
      selectedDept === "All Departments" || member.department === selectedDept;
    const matchesSearch =
      searchQuery.trim() === "" ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.subjects.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesDept && matchesSearch;
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedFaculty(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection
        badge="Academic Mentorship"
        title="Our Dedicated Faculty & Mentors"
        subtitle="Passionate educators committed to igniting curiosity, shaping moral character, and guiding every student toward conceptual mastery."
        breadcrumbs={[{ label: "Faculty" }]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-amber-400 text-school-950 hover:bg-amber-300 transition-colors shadow-soft"
            >
              <span>Our Educational Philosophy</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
            >
              <span>Meet School Leadership</span>
            </Link>
          </div>
        }
      />

      {/* Compliance / Transparency Notice */}
      <section className="py-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 text-xs text-slate-600">
            <AlertCircle className="w-4 h-4 text-school-700 shrink-0 mt-0.5" />
            <p>
              <strong>Faculty Directory Notice: </strong>
              To preserve institutional privacy prior to final administrative verification, the teacher directory below highlights departmental roles, academic qualifications, and pedagogical focuses without publishing unverified personal identities.
            </p>
          </div>
        </div>
      </section>

      {/* Faculty Directory Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Faculty Directory"
            title="Departmental Mentors & Subject Specialists"
            subtitle="Explore our academic leadership team across foundational sciences, languages, mathematics, arts, and physical education."
          />

          {/* Search & Department Filters */}
          <div className="mb-10 space-y-4">
            {/* Search Input */}
            <div className="max-w-md mx-auto relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by subject, designation, or department..."
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-school-600 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Department Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-school-600",
                    selectedDept === dept
                      ? "bg-school-800 text-white shadow-soft"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  )}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Faculty Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFaculty.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-soft hover:shadow-card hover:border-school-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo with overlay */}
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-school-900 shadow-xs">
                        {member.department}
                      </span>
                    </div>
                  </div>

                  {/* Information */}
                  <div className="p-5">
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-school-800 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-amber-700 mt-0.5">
                      {member.designation}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                      <GraduationCap className="w-3.5 h-3.5 text-school-600 shrink-0" />
                      <span className="truncate">{member.qualification}</span>
                    </div>

                    <p className="mt-3 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Subjects taught */}
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <div className="flex flex-wrap gap-1">
                        {member.subjects.slice(0, 2).map((sub, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] px-2 py-0.5 rounded bg-school-50 text-school-800 border border-school-100"
                          >
                            {sub}
                          </span>
                        ))}
                        {member.subjects.length > 2 && (
                          <span className="text-[10px] px-1.5 py-0.5 text-slate-400">
                            +{member.subjects.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => setSelectedFaculty(member)}
                    className="w-full py-2 rounded-xl text-xs font-bold text-school-700 bg-slate-50 hover:bg-school-50 border border-slate-200 hover:border-school-200 transition-colors"
                  >
                    View Faculty Profile
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredFaculty.length === 0 && (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200">
              <p className="text-sm font-semibold text-slate-700">
                No faculty members match your search criteria.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedDept("All Departments");
                  setSearchQuery("");
                }}
                className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-school-700 text-white"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Faculty Modal */}
      {selectedFaculty && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedFaculty(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedFaculty(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 shadow-sm transition-colors"
              aria-label="Close profile"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-slate-100">
              <Image
                src={selectedFaculty.imageUrl}
                alt={selectedFaculty.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-school-900 shadow">
                  {selectedFaculty.department}
                </span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              {selectedFaculty.name}
            </h3>
            <p className="text-xs font-semibold text-amber-700 mt-0.5">
              {selectedFaculty.designation}
            </p>

            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Qualification:</span>
                <span className="font-semibold text-slate-800">
                  {selectedFaculty.qualification}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Teaching Experience:</span>
                <span className="font-semibold text-slate-800">
                  {selectedFaculty.experienceYears}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Department:</span>
                <span className="font-semibold text-slate-800">
                  {selectedFaculty.department}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                Pedagogical Philosophy
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedFaculty.bio}
              </p>
            </div>

            <div className="mt-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Curricular Focus Areas
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedFaculty.subjects.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-md bg-school-50 text-school-800 border border-school-200 font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedFaculty(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Teaching Excellence & Ratio Commitments */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-soft text-center">
              <div className="w-12 h-12 rounded-2xl bg-school-50 text-school-700 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">
                Optimal Student-Teacher Ratio
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Class sections are capped to enable individual observation, personal mentorship, and individualized doubt resolution.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-soft text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">
                Ongoing Faculty Development
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Educators regularly participate in pedagogy workshops, child psychology seminars, and contemporary STEM teaching methods.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-soft text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">
                Value-Based Mentoring
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Beyond scholastic curricula, our faculty actively guide student behavior, emotional balance, peer empathy, and social maturity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

