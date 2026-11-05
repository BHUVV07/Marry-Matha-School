import React from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  Shield,
  Layers,
  ExternalLink,
} from "lucide-react";
import { SchoolLogo } from "@/components/common/SchoolLogo";
import { schoolConfig } from "@/config/schoolInfo";
import { mainNavItems, ecosystemPortals } from "@/config/navigation";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-school-950 text-slate-300 pt-16 pb-12 border-t border-school-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: School Identity & Digital Ecosystem Note (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <SchoolLogo variant="light" size="lg" />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {schoolConfig.description}
            </p>
            <div className="p-3.5 rounded-xl bg-school-900/80 border border-school-800 text-xs space-y-1.5 max-w-md">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <Layers className="w-3.5 h-3.5" />
                <span>Mary Matha Digital Ecosystem — Phase 1</span>
              </div>
              <p className="text-slate-400 leading-normal">
                This public website provides institutional information and admissions communication. Dedicated management portals for Parents, Students, Faculty, and Administrators are accessible through the ecosystem menu.
              </p>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Explore School
            </h3>
            <ul className="space-y-2 text-sm">
              {mainNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-400"
                  >
                    <ArrowRight className="w-3 h-3 text-school-500" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Digital Ecosystem Portals */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Ecosystem Portals
            </h3>
            <ul className="space-y-2 text-sm">
              {ecosystemPortals.map((portal) => (
                <li key={portal.href}>
                  <Link
                    href={portal.href}
                    className="hover:text-white transition-colors flex items-center justify-between text-slate-400 group"
                  >
                    <span className="flex items-center gap-1.5">
                      <ExternalLink className="w-3 h-3 text-amber-400/80 group-hover:text-amber-400" />
                      <span>{portal.title}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Preview
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Official Contact & Timings */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Campus Information
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-school-400 shrink-0 mt-0.5" />
                <span>{schoolConfig.contact.address.fullText}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-school-400 shrink-0" />
                <span>{schoolConfig.contact.displayPhone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-school-400 shrink-0" />
                <span className="break-all">{schoolConfig.contact.email}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-school-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-300">
                    Office Hours:
                  </p>
                  <p className="text-xs">
                    {schoolConfig.contact.timings.officeHours}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Institutional Transparency & Disclaimer */}
        <div className="pt-8 pb-4 text-xs text-slate-500 space-y-3">
          <div className="flex items-start gap-2 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
            <Shield className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-400">Institutional Notice: </strong>
              {schoolConfig.disclaimer}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] pt-4 border-t border-slate-800/60">
            <p>
              © {new Date().getFullYear()} {schoolConfig.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/admissions" className="hover:text-slate-300">
                Admissions Policy
              </Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-slate-300">
                Contact Office
              </Link>
              <span>•</span>
              <Link href="/admin" className="hover:text-slate-300">
                Administrative System
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
