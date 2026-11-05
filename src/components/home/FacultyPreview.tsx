import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, GraduationCap, Award, BookOpen } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { facultyData } from "@/data/facultyData";

export const FacultyPreview: React.FC = () => {
  const featuredFaculty = facultyData.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <SectionHeading
            badge="Dedicated Mentors"
            title="Experienced & Compassionate Faculty"
            subtitle="Our educators are qualified professionals committed to nurturing curiosity, modeling moral values, and supporting individual student potential."
            align="left"
            className="mb-0 max-w-2xl"
          />
          <Link
            href="/faculty"
            className="mt-6 lg:mt-0 inline-flex items-center gap-2 text-sm font-bold text-school-700 hover:text-school-900 group shrink-0"
          >
            <span>View Faculty Directory</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredFaculty.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-soft hover:shadow-card transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-school-900/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                    {member.department}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-school-700 mb-3">
                    {member.designation}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <GraduationCap className="w-3.5 h-3.5 text-school-600 shrink-0" />
                    <span>{member.qualification}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Experience</span>
                <span className="text-school-800 font-bold">
                  {member.experienceYears}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-slate-500">
          <p>
            * Illustrative faculty directory representation. Official staff roster details will be verified by administration upon deployment.
          </p>
        </div>
      </div>
    </section>
  );
};
