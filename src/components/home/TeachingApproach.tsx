import React from "react";
import Link from "next/link";
import {
  Lightbulb,
  Target,
  FileCheck2,
  UsersRound,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";

const approaches = [
  {
    icon: Lightbulb,
    title: "Inquiry-Led Discovery",
    description:
      "Encouraging students to question 'why' and 'how' rather than accepting facts passively. Every unit starts with real-world problems and investigative inquiries.",
  },
  {
    icon: Target,
    title: "Foundational Literacy & Numeracy",
    description:
      "Prioritizing deep mastery of basic mathematics and fluent linguistic expression early on, ensuring students never struggle with advanced abstractions.",
  },
  {
    icon: FileCheck2,
    title: "Formative, Continuous Assessment",
    description:
      "Moving away from high-stress single examinations toward regular diagnostic checks, portfolio assessments, and supportive corrective feedback.",
  },
  {
    icon: UsersRound,
    title: "Collaborative Peer Projects",
    description:
      "Structuring group research, debates, and laboratory experiments that cultivate teamwork, empathetic negotiation, and articulate communication.",
  },
];

export const TeachingApproach: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Pedagogy"
          title="Teaching & Learning Approach"
          subtitle="Our pedagogical philosophy balances structured academic rigor with the joy of active discovery and thoughtful self-expression."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {approaches.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-school-50/50 rounded-2xl p-6 border border-school-100 hover:border-school-300 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-school-700 text-white flex items-center justify-center mb-4 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/academics"
            className="inline-flex items-center gap-2 text-sm font-semibold text-school-700 hover:text-school-900"
          >
            <span>Learn how we assess and support individual student progress</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
