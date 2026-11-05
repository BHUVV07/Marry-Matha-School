import React from "react";
import Link from "next/link";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { eventsData } from "@/data/eventsData";

export const UpcomingEventsPreview: React.FC = () => {
  const upcomingEvents = eventsData.filter((e) => !e.isPast).slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <SectionHeading
            badge="Institutional Calendar"
            title="Upcoming School Events"
            subtitle="Engage with our school community through academic exhibitions, athletic meets, and family consultation days."
            align="left"
            className="mb-0 max-w-2xl"
          />
          <Link
            href="/events"
            className="mt-6 lg:mt-0 inline-flex items-center gap-2 text-sm font-bold text-school-700 hover:text-school-900 group shrink-0"
          >
            <span>View Complete Event Schedule</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft hover:shadow-card hover:border-school-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Date & Category Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-school-700 bg-school-50 px-3 py-1 rounded-full border border-school-100">
                    <Calendar className="w-3.5 h-3.5 text-school-600" />
                    <span>{event.date}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {event.category}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 mb-2">
                  {event.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {event.summary}
                </p>

                <div className="space-y-1 text-xs text-slate-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/events"
                  className="text-xs font-bold text-school-700 hover:text-school-900 inline-flex items-center gap-1"
                >
                  <span>Event schedule & details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
