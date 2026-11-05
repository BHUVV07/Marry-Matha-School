import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  Target,
  Sparkles,
  BookOpen,
  Heart,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Quote,
  Lightbulb,
  Sun,
  Award,
} from "lucide-react";
import { HeroSection } from "@/components/common/HeroSection";
import { SectionHeading } from "@/components/common/SectionHeading";
import { schoolConfig } from "@/config/schoolInfo";

export const metadata: Metadata = {
  title: "About Our School | Vision, Mission & Philosophy",
  description:
    "Learn about Mary Matha Primary School, our educational philosophy, core values, leadership vision, and supportive campus environment.",
};

const coreValues = [
  {
    title: "Moral Integrity & Character",
    desc: "Instilling deep-seated ethical values, honesty, and personal accountability in thought, speech, and action.",
    icon: ShieldCheck,
    color: "bg-blue-50 text-blue-700",
  },
  {
    title: "Intellectual Curiosity",
    desc: "Cultivating an inquisitive mindset that questions purposefully, analyzes critically, and seeks conceptual clarity.",
    icon: Lightbulb,
    color: "bg-amber-50 text-amber-700",
  },
  {
    title: "Empathy & Community Service",
    desc: "Teaching respect for diversity, environmental stewardship, and compassionate service toward the broader community.",
    icon: Heart,
    color: "bg-rose-50 text-rose-700",
  },
  {
    title: "Diligence & Resilience",
    desc: "Guiding learners to embrace effort, learn through mistakes, and build endurance in sports and academics.",
    icon: Target,
    color: "bg-emerald-50 text-emerald-700",
  },
];

const philosophyPillars = [
  {
    number: "01",
    title: "Child-Centric Learning Environment",
    desc: "Recognizing that each child possesses distinct learning rhythms, innate strengths, and interests. Classrooms are structured to empower student participation rather than passive instruction.",
  },
  {
    number: "02",
    title: "Holistic Mind-Body Balance",
    desc: "Academic excellence is complemented by daily physical athletics, performing and visual arts, collaborative games, and mindful self-discipline.",
  },
  {
    number: "03",
    title: "Foundational Conceptual Clarity",
    desc: "Prioritizing deep understanding of core language, mathematics, and empirical science over superficial rote memorization.",
  },
  {
    number: "04",
    title: "Parent-School Synergy",
    desc: "Fostering active, transparent communication between parents and educators through structured academic consultations and the School Digital Ecosystem.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection
        badge="Institutional Overview"
        title="About Mary Matha Primary School"
        subtitle="Founded on principles of holistic human development, disciplined learning, and unwavering ethical grounding."
        breadcrumbs={[{ label: "About School" }]}
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
              href="/academics"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
            >
              <span>Explore Academics</span>
            </Link>
          </div>
        }
      />

      {/* School Introduction */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-school-50 text-school-800 border border-school-200">
                <Sparkles className="w-3.5 h-3.5 text-school-600" />
                <span>Our Heritage & Purpose</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                An Educational Sanctuary Built for Tomorrow&apos;s Conscientious Citizens
              </h2>
              <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                <p>
                  <strong>{schoolConfig.name}</strong> stands as an institution committed to cultivating intellectual sharpness, moral uprightness, and compassionate social engagement. We believe that true schooling extends far beyond textbooks and formal grading — it shapes how a young person perceives challenges, relates to others, and contributes to the world.
                </p>
                <p>
                  Our campus is purposefully organized to provide a tranquil, orderly, and joyful environment. With dedicated faculty, interactive learning spaces, and structured co-curricular opportunities, we guide every student from foundational discovery to confident scholastic maturity.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-800">
                  Transparency Notice:
                </p>
                <p>
                  {schoolConfig.affiliationNotice} Official founding milestones and administrative records are maintained with school governance.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-card aspect-[4/3] sm:aspect-[16/11]">
                <Image
                  src="/images/school/morning-assembly.jpg"
                  alt="Morning Assembly and Student Gathering at Mary Matha School, Ripponpet"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-school-50/80 border border-school-100 text-center">
                  <span className="block text-lg font-bold text-school-900">
                    1999
                  </span>
                  <span className="text-[11px] text-slate-600 font-medium">
                    Year Established
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/60 text-center">
                  <span className="block text-lg font-bold text-amber-900">
                    15:1
                  </span>
                  <span className="text-[11px] text-slate-600 font-medium">
                    Student-Teacher Ratio
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-100 text-center">
                  <span className="block text-lg font-bold text-sky-900">
                    State Board
                  </span>
                  <span className="text-[11px] text-slate-600 font-medium">
                    UDISE: 29150224207
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-100 text-center">
                  <span className="block text-lg font-bold text-emerald-900">
                    Co-ed
                  </span>
                  <span className="text-[11px] text-slate-600 font-medium">
                    English Medium
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Institutional Ideals"
            title="Vision & Mission"
            subtitle="The compass guiding our academic curricula, faculty development, and student development programs."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Vision Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-soft hover:shadow-card transition-all duration-200 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-school-50 text-school-700 flex items-center justify-center">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Our Institutional Vision
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  To be a premier center of holistic education that nurtures intellectually curious, morally steadfast, and socially empathetic individuals capable of leading purposeful lives and serving the greater good with wisdom and dignity.
                </p>
                <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-school-600 shrink-0 mt-0.5" />
                    <span>Nurturing lifelong learners adaptable to an evolving world</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-school-600 shrink-0 mt-0.5" />
                    <span>Fostering ethical principles in decisions and daily relationships</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-school-600 shrink-0 mt-0.5" />
                    <span>Instilling respect for ecological responsibility and heritage</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-school-700">
                <Award className="w-4 h-4" />
                <span>Foundational Pillar of Mary Matha Primary School</span>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-soft hover:shadow-card transition-all duration-200 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Our Educational Mission
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  To provide an inclusive, safe, and stimulating academic ecosystem where students master core foundational competencies, discover artistic and athletic potentials, and internalize human values through dedicated pedagogy and mentorship.
                </p>
                <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Delivering rigorous, inquiry-led foundational and secondary schooling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Equipping students with expressive language and computational confidence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Maintaining an atmosphere of psychological security, discipline, and joy</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-amber-700">
                <Target className="w-4 h-4" />
                <span>Action-Oriented Academic Blueprint</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Philosophy */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Pedagogy & Philosophy"
            title="Our Educational Philosophy"
            subtitle="How we bridge theory and practice to ensure learning is joyful, enduring, and character-building."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophyPillars.map((p, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-school-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-black text-school-300 block mb-3 font-mono">
                    {p.number}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-16 sm:py-24 bg-school-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-subtle opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Principal portrait - Authentic photo */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
                <Image
                  src="/images/school/campus-building.jpg"
                  alt="Sister Gracelin and School Campus, Mary Matha School, Ripponpet"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-5 space-y-1">
                <h3 className="text-lg font-bold text-white">
                  Sister Gracelin
                </h3>
                <p className="text-xs text-amber-300 font-semibold tracking-wider uppercase">
                  Head & Administrator • Mary Matha School
                </p>
                <p className="text-[11px] text-school-300">
                  Barve, Thirthahalli Road, Ripponpet, Shimoga (Est. 1999)
                </p>
              </div>
            </div>

            {/* Principal Message Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3 text-amber-400">
                <Quote className="w-8 h-8 opacity-80" />
                <span className="text-xs uppercase font-bold tracking-widest text-amber-300">
                  Leadership Address
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug">
                &ldquo;Every child carries within them an infinite horizon of possibility.&rdquo;
              </h2>

              <div className="space-y-4 text-school-100/90 text-sm sm:text-base leading-relaxed">
                <p>
                  Dear Parents, Guardians, and Well-Wishers,
                </p>
                <p>
                  It gives me profound pleasure to welcome you to <strong>{schoolConfig.name}</strong>, Ripponpet. Established in 1999, our institution has stood as a beacon of values, character, and foundational learning in the Shimoga region for over 27 years.
                </p>
                <p>
                  Recognized by the Karnataka State Board (UDISE: 29150224207), our mission is centered on holistic child development through English-medium education. With our intimate 15:1 student-teacher ratio, we ensure that every boy and girl receives close personal guidance, sound moral formation, and robust academic preparation.
                </p>
                <p>
                  We warmly invite every parent to visit our campus in Barve, Ripponpet, and partner with us in shaping your child&apos;s joyful educational journey.
                </p>
              </div>

              <div className="pt-4 border-t border-school-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm text-white">Sister Gracelin</p>
                  <p className="text-xs text-school-300">
                    Head & Administrator • Mary Matha School, Ripponpet
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200"
                >
                  <span>Request an Appointment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School Environment & Campus Culture */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Campus Life & Culture"
            title="A Disciplined, Joyful Learning Environment"
            subtitle="Structured to ensure safety, physical vitality, emotional wellness, and collaborative respect."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft hover:shadow-card transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${val.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-slate-900 mb-2">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-school-50 border border-school-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-bold text-lg text-school-900">
                Experience Mary Matha Primary School in Person
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                We invite prospective parents to schedule a guided tour of our facilities and meet with academic counselors.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/admissions"
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-school-700 text-white hover:bg-school-800 transition-colors shadow-soft"
              >
                Apply for Admission
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Contact Administration
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

