import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Building,
} from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { schoolConfig } from "@/config/schoolInfo";

export const HomeContactOverview: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Get in Touch"
          title="Visit Our Campus & Connect With Us"
          subtitle="Our administrative team is here to answer your queries regarding admissions, curriculum, and campus visits."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-soft flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-school-50 text-school-700 flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    {schoolConfig.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Administrative & Admissions Office
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-school-50 text-school-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Campus Location
                    </h4>
                    <p className="text-sm font-medium text-slate-800 mt-1 leading-snug">
                      {schoolConfig.contact.address.fullText}
                    </p>
                    <span className="text-[11px] text-school-700 bg-school-50 px-2 py-0.5 rounded mt-1.5 inline-block font-medium">
                      Barve, Ripponpet • Shimoga
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-school-50 text-school-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Phone Enquiries
                    </h4>
                    <p className="text-sm font-semibold text-slate-800 mt-1">
                      {schoolConfig.contact.displayPhone}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Available during office hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-school-50 text-school-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Email Communication
                    </h4>
                    <a
                      href={`mailto:${schoolConfig.contact.email}`}
                      className="text-sm font-semibold text-school-700 hover:text-school-900 mt-1 block break-all"
                    >
                      {schoolConfig.contact.email}
                    </a>
                    <a
                      href={`mailto:${schoolConfig.contact.admissionsEmail}`}
                      className="text-xs text-slate-500 hover:text-school-700 mt-0.5 block break-all"
                    >
                      {schoolConfig.contact.admissionsEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-school-50 text-school-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Campus Hours
                    </h4>
                    <p className="text-xs text-slate-700 mt-1">
                      <strong>School:</strong> {schoolConfig.contact.timings.schoolHours}
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      <strong>Office:</strong> {schoolConfig.contact.timings.officeHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Visiting hours for parents: {schoolConfig.contact.timings.visitingHours}
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-school-700 hover:text-school-900 group"
              >
                <span>Full Contact Page & Form</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Quick Enquire / Map Placeholder Card */}
          <div className="lg:col-span-5 bg-school-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-school-700/30 rounded-full blur-2xl pointer-events-none" />

            <div className="relative space-y-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <MessageSquare className="w-3 h-3" />
                Prompt Assistance
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Plan a Campus Visit
              </h3>
              <p className="text-sm text-school-100/90 leading-relaxed">
                We warmly welcome parents and prospective students to tour our classrooms, laboratories, and athletic spaces. Submit an enquiry online or write to our admissions desk.
              </p>

              {/* Map Locator Preview */}
              <div className="mt-4 p-4 rounded-xl bg-school-950/60 border border-school-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-school-200">
                  <span className="font-semibold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    Barve, Ripponpet Campus
                  </span>
                  <span className="text-[11px] text-amber-300">Thirthahalli Road</span>
                </div>
                <p className="text-xs text-slate-300">
                  Shimoga - 577426, Karnataka (School Code: 29150224207)
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${schoolConfig.contact.address.mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 pt-1"
                >
                  <span>Open in Google Maps Search</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="relative mt-8 pt-6 border-t border-school-800 flex flex-col sm:flex-row gap-3">
              <Link
                href="/admissions"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-amber-400 text-school-950 hover:bg-amber-300 transition-colors shadow-soft"
              >
                <span>Admission Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm bg-school-800 hover:bg-school-700 text-white border border-school-700 transition-colors"
              >
                <span>Send Message</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

