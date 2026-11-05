import React from "react";
import { Quote, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { testimonialsData } from "@/data/testimonialsData";

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Community Perspectives"
          title="Voices of Parents & Students"
          subtitle="Reflecting on the transformative growth, teacher care, and supportive culture experienced within our classrooms."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft hover:shadow-card transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-school-300 mb-3" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-900">
                  {item.author}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-0.5">
                  <span>{item.role}</span>
                  <span className="font-medium text-school-700">
                    {item.gradeOrYear}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-slate-400">
          <p>
            * Representative feedback items provided as illustrative community perspectives pending official parent testimonial publication.
          </p>
        </div>
      </div>
    </section>
  );
};
