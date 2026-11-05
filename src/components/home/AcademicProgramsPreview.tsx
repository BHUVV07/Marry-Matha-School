import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Sparkles, Check } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { schoolConfig } from "@/config/schoolInfo";

export const AcademicProgramsPreview: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <SectionHeading
            badge="Academic Framework"
            title="Comprehensive Academic Wings"
            subtitle="Thoughtfully staged curricula tailored to each developmental milestone, from early childhood discovery to secondary board examinations."
            align="left"
            className="mb-0 max-w-2xl"
          />
          <Link
            href="/academics"
            className="mt-6 lg:mt-0 inline-flex items-center gap-2 text-sm font-bold text-school-700 hover:text-school-900 group shrink-0"
          >
            <span>View Full Academic Curriculum</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {schoolConfig.admissions.classesOffered.map((program, idx) => (
            <div
              key={program.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft hover:shadow-card hover:border-school-400 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Stage number */}
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-school-50 text-school-800 font-bold text-xs flex items-center justify-center border border-school-200">
                    0{idx + 1}
                  </span>
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/70">
                    {program.ageCriteria}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-school-800 transition-colors">
                  {program.name}
                </h3>
                <p className="text-xs font-semibold text-school-600 mb-3">
                  {program.subtext}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {program.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/academics"
                  className="text-xs font-bold text-school-700 hover:text-school-900 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[10px] text-slate-400 font-medium">
                  Stage {idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
