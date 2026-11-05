import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight,
  ClipboardList,
  Sparkles,
  HelpCircle,
  Award,
  Layers,
  FileCheck,
  BrainCircuit,
  Compass,
} from "lucide-react";
import { HeroSection } from "@/components/common/HeroSection";
import { SectionHeading } from "@/components/common/SectionHeading";
import { schoolConfig } from "@/config/schoolInfo";

export const metadata: Metadata = {
  title: "Academic Programs & Curriculum Framework",
  description:
    "Explore academic programs, grade wings, curriculum architecture, teaching methodologies, learning support, and assessment frameworks at Mary Matha Primary School.",
};

const curriculumPillars = [
  {
    title: "Foundational Literacy & Numeracy",
    desc: "Rigorous phonics, reading comprehension, mathematical number-sense, and mental calculation from earliest grades.",
    focus: "Grades Pre-Primary – 3",
  },
  {
    title: "Experiential Inquiry & STEM",
    desc: "Hands-on science demonstrations, biological observation, foundational logic, and laboratory inquiry.",
    focus: "Grades 4 – 8",
  },
  {
    title: "Analytical Depth & Communication",
    desc: "Structured debate, essay composition, social studies investigations, and interdisciplinary analysis.",
    focus: "Grades 6 – 10",
  },
  {
    title: "Scholastic Discipline & Board Readiness",
    desc: "Focused assessment preparation, timed writing practice, conceptual reinforcement, and career orientation.",
    focus: "Grades 9 – 10",
  },
];

const academicSupportOfferings = [
  {
    title: "Dedicated Remedial Clinics",
    desc: "Targeted after-school mentoring sessions for students requiring reinforced instruction in core subjects such as mathematics and science.",
    icon: BrainCircuit,
  },
  {
    title: "Enrichment & Olympiad Circles",
    desc: "Advanced problem-solving circles for students displaying high aptitude in mathematics, linguistics, or scientific thinking.",
    icon: Award,
  },
  {
    title: "Structured Reading Program",
    desc: "Weekly guided library hours and reading passports to encourage varied reading habits across fiction and non-fiction.",
    icon: BookOpen,
  },
  {
    title: "Continuous Parent Progress Briefings",
    desc: "Regular, constructive parent-teacher conferences to discuss holistic growth, emotional well-being, and academic milestones.",
    icon: Compass,
  },
];

const assessmentFramework = [
  {
    term: "Formative Assessments (Ongoing)",
    weight: "Periodic & Interactive",
    description:
      "Continuous classroom quizzes, concept-check exercises, project work, oral presentations, and laboratory practical reviews that track everyday comprehension.",
    tags: ["Classroom Participation", "Weekly Concept Checks", "Subject Portfolios"],
  },
  {
    term: "Periodic Summative Reviews",
    weight: "Mid-Term & Term-End",
    description:
      "Comprehensive examinations testing cumulative subject mastery, time management, analytical expression, and structured problem-solving.",
    tags: ["Term 1 Mid-Session", "Term 2 Annual Examination", "Practical Evaluations"],
  },
  {
    term: "Holistic Co-Scholastic Metrics",
    weight: "Non-Graded Qualitative",
    description:
      "Evaluations of physical fitness, artistic expression, cooperative team spirit, school attendance, and ethical campus conduct.",
    tags: ["Sports & Health", "Art & Craft", "Discipline & Initiative"],
  },
];

export default function AcademicsPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection
        badge="Academic Architecture"
        title="Scholastic Rigour, Conceptual Depth"
        subtitle="Empowering learners with progressive curricula, certified faculty guidance, and a supportive learning environment from early years through secondary schooling."
        breadcrumbs={[{ label: "Academics" }]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-amber-400 text-school-950 hover:bg-amber-300 transition-colors shadow-soft"
            >
              <span>Enrol for 2025–26</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#classes"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
            >
              <span>View Grade Wings</span>
            </Link>
          </div>
        }
      />

      {/* Curriculum Information & Status Notice */}
      <section className="py-12 bg-school-50/70 border-b border-school-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-school-200 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-school-100 text-school-800 flex items-center justify-center shrink-0">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Karnataka State Board Recognition & School Code
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  Karnataka State Board (KSEAB) • School Code: {schoolConfig.schoolCode}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  {schoolConfig.affiliationNotice} Instruction is conducted in English medium with an intimate <strong>15:1 student-teacher ratio</strong> across 4 core classrooms, providing individualized attention and solid foundational preparation for SSLC state examinations.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-school-700 bg-school-50 hover:bg-school-100 border border-school-200 shrink-0"
            >
              <span>Enquire with Academic Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Classes Offered (Configurable Grade Wings) */}
      <section id="classes" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Academic Divisions"
            title="Classes & Academic Wings"
            subtitle="Carefully structured educational tiers tailored to the developmental stages of childhood and adolescence."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {schoolConfig.admissions.classesOffered.map((wing, index) => (
              <div
                key={wing.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft hover:shadow-card hover:border-school-300 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-school-600 bg-school-50 px-3 py-1 rounded-full border border-school-100">
                      Tier {index + 1}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {wing.ageCriteria}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-school-800 transition-colors">
                    {wing.name}
                  </h3>
                  <p className="text-xs font-bold text-amber-700 mt-1 mb-4">
                    {wing.subtext}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {wing.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href="/admissions"
                    className="inline-flex items-center gap-1 text-xs font-bold text-school-700 group-hover:text-school-900"
                  >
                    <span>Check Admission Criteria</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-400 mt-6 italic">
            * Class offerings and admission seat matrices are subject to school administrative confirmation for each academic session.
          </p>
        </div>
      </section>

      {/* Teaching & Learning Methodology */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Pedagogical Model"
            title="How Our Students Learn"
            subtitle="Moving beyond passive lectures to active inquiry, collaborative problem solving, and reflective learning."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {curriculumPillars.map((cp, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-school-50 text-school-700 border border-school-100 inline-block mb-3">
                    {cp.focus}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 mb-2">
                    {cp.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {cp.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Support & Student Care */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Student Success"
            title="Academic Mentorship & Support Systems"
            subtitle="Ensuring every learner receives the specific encouragement and diagnostic assistance needed to thrive."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {academicSupportOfferings.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-school-100 text-school-800 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-school-700" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Examination & Assessment System */}
      <section className="py-16 sm:py-24 bg-school-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-subtle opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeading
            badge="Evaluation System"
            title="Fair, Comprehensive Assessments"
            subtitle="Balancing formative classroom feedback with formal summative examinations to gauge genuine conceptual grasp."
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {assessmentFramework.map((item, idx) => (
              <div
                key={idx}
                className="bg-school-950/70 border border-school-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-semibold text-amber-300">
                      {item.weight}
                    </span>
                    <ClipboardList className="w-4 h-4 text-school-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.term}
                  </h3>
                  <p className="text-xs sm:text-sm text-school-100/80 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-school-800 space-y-1.5">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Key Evaluation Dimensions:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-school-800 text-school-200 border border-school-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-amber-400 text-school-950 hover:bg-amber-300 shadow-card transition-all duration-200"
            >
              <span>Apply for Admission for the Upcoming Session</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

