import React from "react";
import Link from "next/link";
import {
  FileText,
  UserCheck,
  ClipboardCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";

const steps = [
  {
    step: "01",
    icon: FileText,
    title: "Submit Enquiry Form",
    description:
      "Complete the basic online admission enquiry form with student and guardian information.",
  },
  {
    step: "02",
    icon: UserCheck,
    title: "Campus Visit & Interaction",
    description:
      "Tour the school facilities, meet academic coordinators, and understand our pedagogical vision.",
  },
  {
    step: "03",
    icon: ClipboardCheck,
    title: "Document Verification",
    description:
      "Submit requisite documents such as birth certificate, past academic records, and identification.",
  },
  {
    step: "04",
    icon: CheckCircle2,
    title: "Enrolment & Onboarding",
    description:
      "Complete registration formalities and receive orientation kits for the new academic session.",
  },
];

export const AdmissionProcessOverview: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Admissions 2025–2026"
          title="Simple & Transparent Admission Process"
          subtitle="A clear, respectful admissions pathway structured to assist parents at every stage of their child's educational journey."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((st, index) => {
            const Icon = st.icon;
            return (
              <div
                key={index}
                className="bg-school-50/60 rounded-2xl p-6 border border-school-100 flex flex-col justify-between relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-school-300">
                      {st.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-school-700 text-white flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 mb-2">
                    {st.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {st.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-school-100/80 text-[11px] font-semibold text-school-700">
                  Step {index + 1} of 4
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white bg-school-700 hover:bg-school-800 shadow-card transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>Proceed to Admissions & Document Checklist</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
