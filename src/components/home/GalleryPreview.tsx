import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Eye } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { galleryData } from "@/data/galleryData";

export const GalleryPreview: React.FC = () => {
  const previewItems = galleryData.slice(0, 6);

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <SectionHeading
            badge="Moments at School"
            title="School Life & Campus Gallery"
            subtitle="Glance at the daily vibrancy, academic discoveries, sporting triumphs, and cultural celebrations unfolding across our campus."
            align="left"
            className="mb-0 max-w-2xl"
          />
          <Link
            href="/gallery"
            className="mt-6 lg:mt-0 inline-flex items-center gap-2 text-sm font-bold text-school-700 hover:text-school-900 group shrink-0"
          >
            <span>View Full Photo Archive</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewItems.map((item) => (
            <Link
              key={item.id}
              href="/gallery"
              className="group relative rounded-2xl overflow-hidden shadow-soft aspect-[4/3] block bg-slate-200"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-school-950/90 via-school-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-school-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {item.category}
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-bold text-sm leading-snug line-clamp-1 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-200 line-clamp-1 mt-0.5">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
