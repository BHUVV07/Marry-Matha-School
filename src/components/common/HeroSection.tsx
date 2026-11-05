import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeroSectionProps {
  badge?: string;
  title: string;
  subtitle: string;
  breadcrumbs: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge,
  title,
  subtitle,
  breadcrumbs,
  actions,
  className,
}) => {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-school text-white py-14 sm:py-20 border-b border-school-800",
        className
      )}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10 bg-pattern-subtle pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-school-400/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-school-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs sm:text-sm text-school-200/90 mb-5"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1 hover:text-white transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-school-300/60" />
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-white transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 bg-school-400/20 text-school-100 border border-school-300/30 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-pulse" />
            {badge}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-4xl">
          {title}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-school-100/90 max-w-3xl leading-relaxed">
          {subtitle}
        </p>

        {actions && <div className="mt-8 flex flex-wrap gap-4">{actions}</div>}
      </div>
    </section>
  );
};
