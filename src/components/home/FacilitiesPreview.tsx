import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { facilitiesData } from "@/data/facilitiesData";

export const FacilitiesPreview: React.FC = () => {
  // Show first 3 flagship facilities on home page
  const featuredFacilities = facilitiesData.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <SectionHeading
            badge="Campus Environment"
            title="Purpose-Built School Facilities"
            subtitle="Spacious, safe, and stimulating spaces engineered to foster intellectual curiosity, physical fitness, and collaborative learning."
            align="left"
            className="mb-0 max-w-2xl"
          />
          <Link
            href="/facilities"
            className="mt-6 lg:mt-0 inline-flex items-center gap-2 text-sm font-bold text-school-700 hover:text-school-900 group shrink-0"
          >
            <span>Explore All Campus Facilities</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredFacilities.map((facility) => (
            <div
              key={facility.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Facility Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={facility.imageUrl}
                    alt={facility.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-school-900/85 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    {facility.category}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {facility.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {facility.shortDesc}
                  </p>

                  {/* Highlights list */}
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {facility.highlights.slice(0, 2).map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-school-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/facilities"
                  className="text-xs font-bold text-school-700 hover:text-school-900 inline-flex items-center gap-1"
                >
                  <span>Facility details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] text-slate-400">Campus Tour</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
