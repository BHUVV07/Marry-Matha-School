import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Phone, HelpCircle } from "lucide-react";
import { schoolConfig } from "@/config/schoolInfo";

export const AdmissionCtaBanner: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-gradient-school text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern-subtle opacity-10 pointer-events-none" />
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-5 bg-amber-400/20 text-amber-300 border border-amber-400/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{schoolConfig.admissions.currentSession}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold max-w-3xl mx-auto tracking-tight leading-tight">
          Ready to Begin Your Child&apos;s Educational Journey at {schoolConfig.name}?
        </h2>

        <p className="mt-4 text-sm sm:text-base text-school-100/90 max-w-2xl mx-auto leading-relaxed">
          Submitting an online enquiry takes only two minutes. Our admissions coordinator will connect with you to arrange a personal campus walkthrough and consultation.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/admissions"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-school-950 bg-amber-400 hover:bg-amber-300 shadow-card transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>Start Online Admission Enquiry</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Have Questions? Contact Us</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
