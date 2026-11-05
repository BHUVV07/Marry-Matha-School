import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Compass, BookOpen } from "lucide-react";
import { schoolConfig } from "@/config/schoolInfo";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-school-50 text-school-700 flex items-center justify-center mx-auto border border-school-100 shadow-soft">
          <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: "12s" }} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Error 404 • Page Not Found
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            We Couldn&apos;t Locate That Page
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The page you requested may have moved, been renamed, or is temporarily unavailable within the {schoolConfig.shortName} portal directory.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-school-700 text-white hover:bg-school-800 shadow-soft transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to School Home</span>
          </Link>
          <Link
            href="/admissions"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>Admissions Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

