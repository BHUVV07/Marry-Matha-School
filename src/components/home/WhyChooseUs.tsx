import React from "react";
import {
  HeartHandshake,
  Brain,
  ShieldCheck,
  Palette,
  Users2,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";

const reasons = [
  {
    icon: Brain,
    title: "Strong Conceptual Foundation",
    description:
      "Learning emphasizes inquiry and reasoning over rote repetition. Students learn to grasp foundational concepts in mathematics, sciences, and languages with clarity.",
    tag: "Academics",
  },
  {
    icon: HeartHandshake,
    title: "Value-Oriented Moral Education",
    description:
      "Academic competence is paired with moral clarity. We actively cultivate truthfulness, social responsibility, empathy, and integrity through daily interactions.",
    tag: "Ethos",
  },
  {
    icon: Users2,
    title: "15:1 Student-Teacher Ratio",
    description:
      "Small classroom cohorts guarantee individualized attention. Our faculty observe each student's learning pace, providing personalized academic support and mentorship.",
    tag: "Faculty",
  },
  {
    icon: Palette,
    title: "Balanced Co-Curricular Expression",
    description:
      "Equal emphasis on cultural arts, elocution, choral music, drama, and sports, allowing every child to discover their distinctive individual strengths.",
    tag: "Holistic",
  },
  {
    icon: ShieldCheck,
    title: "Safe, Well-Ordered Campus Environment",
    description:
      "Strict safety protocols, CCTV monitoring, hygienic water sanitation, and caring supervision ensure a secure haven where children thrive peacefully.",
    tag: "Safety",
  },
  {
    icon: Sparkles,
    title: "Transparent Parent Partnership",
    description:
      "Open, regular communication with parents regarding academic progress, emotional development, and school initiatives via meetings and the digital ecosystem.",
    tag: "Community",
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Distinction in Education"
          title="Why Choose Mary Matha School, Ripponpet?"
          subtitle="Established in 1999 under the Karnataka State Board (UDISE: 29150224207) • Co-ed English medium schooling with an individual-centric 15:1 student-teacher ratio."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-7 shadow-soft border border-slate-200/70 hover:border-school-300 hover:shadow-card transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-school-50 text-school-800 flex items-center justify-center group-hover:bg-school-700 group-hover:text-white transition-colors duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-school-600 bg-school-50/80 px-2.5 py-1 rounded-full border border-school-100">
                      {reason.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-school-900 transition-colors mb-2.5">
                    {reason.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center text-xs text-school-600 font-medium">
                  <span>Student Centered • Disciplined</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
