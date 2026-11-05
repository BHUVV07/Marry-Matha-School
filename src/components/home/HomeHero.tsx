"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  Users,
  CheckCircle,
  Calendar,
} from "lucide-react";
import { schoolConfig } from "@/config/schoolInfo";

export const HomeHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-school text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Decorative ambient elements */}
      <div className="absolute inset-0 bg-pattern-subtle opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-school-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-school-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and Call to Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-white/10 text-school-100 border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Est. 1999 • UDISE: {schoolConfig.schoolCode} • Karnataka State Board</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Nurturing Character,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-200 to-white">
                Fostering Curiosity,
              </span>{" "}
              Inspiring Excellence.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-school-100/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Welcome to <strong>{schoolConfig.name}</strong>, Barve, Ripponpet (Shimoga, Karnataka). Established in 1999, we provide high-quality English-medium State Board education with an exceptional <strong>15:1 student-teacher ratio</strong>, fostering academic mastery, discipline, and moral values.
            </p>

            {/* Bullet Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-school-100">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>15:1 Student-Teacher Ratio</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Karnataka State Board</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Co-educational English Medium</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/admissions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-school-950 bg-amber-400 hover:bg-amber-300 shadow-card transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Enquire for Admissions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Explore School Ethos</span>
              </Link>
            </div>

            {/* Institutional Ecosystem Notice */}
            <div className="pt-4 text-xs text-school-200/80 flex items-center justify-center lg:justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />
              <span>
                Component 1 of the <em>Mary Matha Digital Ecosystem</em>
              </span>
            </div>
          </div>

          {/* Right Column: Imagery with Floating Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Frame - Authentic Campus Photo */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[4/3] sm:aspect-[5/4]">
                <Image
                  src="/images/school/campus-building.jpg"
                  alt="Mary Matha School Campus Building, Ripponpet"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-school-950/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                    Mary Matha School Campus • Barve, Ripponpet
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-slate-100">
                    School building & assembly grounds • Shimoga District, Karnataka
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Established 1999 */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white text-slate-800 p-3 sm:p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 max-w-[220px]">
                <div className="p-2.5 rounded-lg bg-school-50 text-school-700 shrink-0">
                  <Calendar className="w-5 h-5 text-school-600" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-school-800 uppercase tracking-wide">
                    Established 1999
                  </p>
                  <p className="text-xs text-slate-600">27+ Years of Service</p>
                </div>
              </div>

              {/* Floating Badge 2: 15:1 Student Teacher Ratio */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-white text-slate-800 p-3 sm:p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 max-w-[220px]">
                <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600 shrink-0">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-900">
                    15:1 Student Ratio
                  </p>
                  <p className="text-xs text-slate-500">
                    Personalized Guidance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
