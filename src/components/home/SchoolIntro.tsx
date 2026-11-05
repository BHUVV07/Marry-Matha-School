import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, Heart, BookOpen, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { schoolConfig } from "@/config/schoolInfo";

export const SchoolIntro: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Welcome to Our School"
          title="An Educational Sanctuary Built on Values and Purpose"
          subtitle="Dedicated to preparing students not merely for examinations, but for a life of purpose, compassion, and meaningful contribution."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image with overlay */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-card aspect-[4/3] sm:aspect-[1/1]">
              <Image
                src="/images/school/classroom-teaching.jpg"
                alt="Teacher guiding students at Mary Matha School, Ripponpet"
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4 p-4 rounded-xl bg-school-50 border border-school-100 text-xs text-school-800 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-school-600 shrink-0" />
              <span>
                Karnataka State Board recognized (UDISE: {schoolConfig.schoolCode}) • Personalized attention with 15:1 student-teacher ratio.
              </span>
            </div>
          </div>

          {/* Right Column: Key Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-slate-600 leading-relaxed text-base">
              <p>
                At <strong>{schoolConfig.name}</strong>, education is envisioned as an inspiring partnership between dedicated teachers, curious young learners, and supportive families. From foundational pre-primary years to secondary education, we cultivate cognitive capability alongside moral integrity.
              </p>
              <p>
                Our curriculum fosters critical questioning, foundational numeracy and language literacy, hands-on scientific discovery, and active athletic participation within a supportive and respectful campus environment.
              </p>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-school-200 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-school-100 text-school-800 flex items-center justify-center mb-3">
                  <Compass className="w-5 h-5 text-school-700" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">
                  Vision & Direction
                </h3>
                <p className="text-xs text-slate-600">
                  Guiding every child toward academic diligence and self-disciplined character.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-school-200 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5 text-amber-700" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">
                  Compassionate Care
                </h3>
                <p className="text-xs text-slate-600">
                  Fostering mutual empathy, respect, and inclusivity across all grade levels.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-school-200 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center mb-3">
                  <BookOpen className="w-5 h-5 text-sky-700" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">
                  Intellectual Depth
                </h3>
                <p className="text-xs text-slate-600">
                  Moving beyond memorization toward conceptual understanding and analytical thought.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-school-700 hover:text-school-900 group"
              >
                <span>Read more about our vision, leadership and ethos</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
