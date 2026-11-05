import React from "react";
import Link from "next/link";
import {
  Trophy,
  Palette,
  Mic,
  TreePine,
  Laptop,
  Flame,
  ArrowRight,
} from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";

const activities = [
  {
    icon: Trophy,
    title: "Inter-House Sports & Athletics",
    description: "Track competitions, football, badminton, and annual sports days cultivating teamwork.",
  },
  {
    icon: Mic,
    title: "Elocution, Debate & Choral Music",
    description: "Morning assemblies, speech competitions, and choir performances building poise.",
  },
  {
    icon: Palette,
    title: "Visual Arts & Creative Craft",
    description: "Sketching, watercolor painting, clay sculpture, and campus exhibition displays.",
  },
  {
    icon: Laptop,
    title: "Introductory Coding & STEM",
    description: "Algorithmic thinking games, robotics basics, and supervised computer discovery.",
  },
  {
    icon: TreePine,
    title: "Eco Club & Nature Awareness",
    description: "Campus tree planting, waste segregation, and conservation awareness drives.",
  },
  {
    icon: Flame,
    title: "Leadership & House System",
    description: "Student council representation, house captains, and peer assistance initiatives.",
  },
];

export const ActivitiesPreview: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Co-Curricular Life"
          title="Activities, Arts & Student Leadership"
          subtitle="Education transcends textbooks. Our vibrant spectrum of co-curricular clubs nurtures talent, builds self-assurance, and promotes athletic vitality."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((act, index) => {
            const Icon = act.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft hover:shadow-card transition-all duration-200 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 shrink-0 flex items-center justify-center border border-amber-200/60">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 mb-1">
                    {act.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {act.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-5 rounded-2xl bg-school-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-sm font-bold text-amber-300">
              Capturing Moments of Growth and Camaraderie
            </p>
            <p className="text-xs text-school-200">
              View photography from our sports meets, exhibitions, and cultural assemblies in the gallery.
            </p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-school-950 bg-white hover:bg-slate-100 transition-colors shrink-0"
          >
            <span>Explore Photo Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
