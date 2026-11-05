"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Calendar,
  Tag,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { HeroSection } from "@/components/common/HeroSection";
import { SectionHeading } from "@/components/common/SectionHeading";
import { galleryData, galleryCategories } from "@/data/galleryData";
import { GalleryItem } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === activeCategory);

  const currentModalItem: GalleryItem | null =
    activeItemIndex !== null ? filteredItems[activeItemIndex] || null : null;

  const handleNext = useCallback(() => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((prev) =>
      prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
    );
  }, [activeItemIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
    );
  }, [activeItemIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeItemIndex === null) return;
      if (e.key === "Escape") setActiveItemIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItemIndex, handleNext, handlePrev]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection
        badge="Visual Campus Chronicle"
        title="School Life & Campus Gallery"
        subtitle="Glimpses into everyday classroom discovery, cultural performances, science exhibitions, and athletic triumphs at Mary Matha Primary School."
        breadcrumbs={[{ label: "Gallery" }]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-amber-400 text-school-950 hover:bg-amber-300 transition-colors shadow-soft"
            >
              <span>Apply for Admissions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/facilities"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
            >
              <span>Campus Facilities</span>
            </Link>
          </div>
        }
      />

      {/* Media Policy Notice */}
      <section className="py-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 text-xs text-slate-600">
            <AlertCircle className="w-4 h-4 text-school-700 shrink-0 mt-0.5" />
            <p>
              <strong>Media & Photography Notice: </strong>
              The photographs displayed here serve as representative visual placeholders illustrating campus life and activities. Official high-resolution photographs will be incorporated as part of the school media archive release.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Moments & Milestones"
            title="Snapshots of Student Life"
            subtitle="Explore our vibrant campus culture organized by educational and co-curricular spheres."
          />

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {galleryCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setActiveItemIndex(null);
                }}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-school-600",
                  activeCategory === category
                    ? "bg-school-800 text-white shadow-soft"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                aria-label={`View full-size photo: ${item.title}`}
                onClick={() => setActiveItemIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveItemIndex(index);
                  }
                }}
                className="group relative cursor-pointer rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-soft hover:shadow-card focus:outline-none focus:ring-2 focus:ring-school-600 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/30">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Click to Enlarge</span>
                    </span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 text-school-900 shadow-xs">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Caption Bar */}
                <div className="p-4 sm:p-5 bg-white flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-school-800 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  {item.date && (
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3 text-school-500" />
                        <span>{item.date}</span>
                      </span>
                      <span className="font-mono text-school-600 font-semibold group-hover:underline">
                        View
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200">
              <p className="text-sm font-semibold text-slate-700">
                No gallery photographs found in this category.
              </p>
              <button
                type="button"
                onClick={() => setActiveCategory("All")}
                className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-school-700 text-white"
              >
                Show All Photos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {currentModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveItemIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-slate-800 text-white">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-school-600 text-white">
                  {currentModalItem.category}
                </span>
                <span className="text-xs text-slate-400">
                  {activeItemIndex! + 1} of {filteredItems.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveItemIndex(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Modal Image */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black">
              <Image
                src={currentModalItem.imageUrl}
                alt={currentModalItem.title}
                fill
                className="object-contain"
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors border border-white/20"
                aria-label="Previous photograph"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors border border-white/20"
                aria-label="Next photograph"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="p-6 bg-slate-950 text-white space-y-1 border-t border-slate-800">
              <h4 className="text-lg font-bold text-white">
                {currentModalItem.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentModalItem.description}
              </p>
              {currentModalItem.date && (
                <p className="text-[11px] text-amber-400 pt-1">
                  Occasion: {currentModalItem.date}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Campus Tour CTA */}
      <section className="py-14 bg-school-50 border-t border-school-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-school-900">
            Want to See Our Campus in Person?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Experience our classrooms, play areas, and laboratories firsthand. We welcome families to schedule a campus walkthrough.
          </p>
          <div className="pt-2">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-school-700 text-white hover:bg-school-800 shadow-soft transition-colors"
            >
              <span>Schedule Campus Visit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

