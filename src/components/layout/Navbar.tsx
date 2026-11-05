"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  Clock,
  ExternalLink,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Shield,
  GraduationCap,
  Users,
  BookOpen,
  Award,
  Calculator,
} from "lucide-react";
import { SchoolLogo } from "@/components/common/SchoolLogo";
import { mainNavItems, ecosystemPortals } from "@/config/navigation";
import { schoolConfig } from "@/config/schoolInfo";
import { cn } from "@/lib/utils";

const portalIcons: Record<string, React.ReactNode> = {
  Users: <Users className="w-4 h-4 text-sky-600" />,
  GraduationCap: <GraduationCap className="w-4 h-4 text-emerald-600" />,
  BookOpen: <BookOpen className="w-4 h-4 text-indigo-600" />,
  Award: <Award className="w-4 h-4 text-amber-600" />,
  ShieldCheck: <Shield className="w-4 h-4 text-rose-600" />,
  Calculator: <Calculator className="w-4 h-4 text-purple-600" />,
};

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPortalsDropdownOpen, setIsPortalsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsPortalsDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsPortalsDropdownOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white transition-all duration-200">
      {/* Top Notification Bar */}
      <div className="bg-school-900 text-slate-100 text-xs border-b border-school-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* Status badge */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-medium bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Sparkles className="w-3 h-3 text-amber-400" />
              {schoolConfig.admissions.statusLabel}
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <Clock className="w-3 h-3 text-sky-400" />
              {schoolConfig.contact.timings.schoolHours}
            </span>
          </div>

          {/* Quick ecosystem link & contact */}
          <div className="flex items-center gap-4 text-slate-300">
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-sky-400" />
              <span>Campus Enquiries</span>
            </Link>
            <div className="h-3 w-px bg-slate-700 hidden lg:block" />

            {/* Portal dropdown toggle */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsPortalsDropdownOpen(!isPortalsDropdownOpen)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors focus:outline-none"
                aria-expanded={isPortalsDropdownOpen}
                aria-haspopup="true"
              >
                <span>Digital Ecosystem Portals</span>
                <ChevronDown
                  className={cn(
                    "w-3 h-3 transition-transform duration-200",
                    isPortalsDropdownOpen && "rotate-180"
                  )}
                />
              </button>

              {/* Ecosystem Dropdown Panel */}
              {isPortalsDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 text-slate-800 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setIsPortalsDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold uppercase tracking-wider text-school-900">
                      Mary Matha Digital Ecosystem
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Unified institutional services & management suite
                    </p>
                  </div>
                  <div className="p-2 grid grid-cols-1 gap-1 max-h-80 overflow-y-auto">
                    {ecosystemPortals.map((portal) => (
                      <Link
                        key={portal.href}
                        href={portal.href}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-white shadow-xs">
                          {portalIcons[portal.icon] || (
                            <ExternalLink className="w-4 h-4 text-school-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-slate-900 group-hover:text-school-700">
                              {portal.title}
                            </span>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                              {portal.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {portal.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="px-4 py-2 bg-slate-50 rounded-b-xl border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-500">
                    <span>Multi-role access</span>
                    <span className="font-semibold text-school-700">
                      Phase 1 Integration
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={cn(
          "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-200",
          isScrolled ? "py-3 shadow-sm border-b border-slate-100" : "py-4"
        )}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <SchoolLogo />

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden xl:flex items-center gap-1 text-sm font-medium"
          >
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-2 rounded-lg transition-all relative",
                    isActive
                      ? "text-school-800 font-semibold bg-school-50/80"
                      : "text-slate-600 hover:text-school-800 hover:bg-slate-50"
                  )}
                >
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-school-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-semibold text-sm text-school-800 bg-school-50 hover:bg-school-100 border border-school-200 transition-all duration-200"
            >
              <Shield className="w-4 h-4 text-school-600" />
              <span>Portal Sign In</span>
            </Link>
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-school-700 hover:bg-school-800 shadow-soft transition-all duration-200 hover:shadow-card hover:-translate-y-0.5 focus:ring-2 focus:ring-school-600"
            >
              <span>Admissions Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <Link
              href="/admissions"
              className="sm:hidden px-3 py-1.5 rounded-lg text-xs font-semibold bg-school-700 text-white"
            >
              Enquire
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-school-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-school-600"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <nav className="flex flex-col space-y-1">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base font-medium transition-colors",
                    isActive
                      ? "text-school-900 font-bold bg-school-50 text-school-800"
                      : "text-slate-700 hover:bg-slate-50"
                  )}
                >
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Portals in Mobile Menu */}
          <div className="pt-3 border-t border-slate-100">
            <p className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Ecosystem Portals
            </p>
            <div className="grid grid-cols-2 gap-2">
              {ecosystemPortals.map((portal) => (
                <Link
                  key={portal.href}
                  href={portal.href}
                  className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 hover:bg-school-50 text-slate-700 text-xs font-medium"
                >
                  <span className="p-1 rounded bg-white shadow-xs">
                    {portalIcons[portal.icon]}
                  </span>
                  <span className="truncate">{portal.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-3">
            <Link
              href="/admissions"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white bg-school-700 hover:bg-school-800 shadow-sm"
            >
              <span>Submit Admission Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
