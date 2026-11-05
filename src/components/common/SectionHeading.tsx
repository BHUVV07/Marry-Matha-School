import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = "center",
  className,
  light = false,
}) => {
  return (
    <div
      className={cn(
        "max-w-3xl mb-12",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {badge && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 bg-school-50 text-school-800 border border-school-200">
          <span className="w-1.5 h-1.5 rounded-full bg-school-600 animate-pulse" />
          {badge}
        </div>
      )}
      <h2
        className={cn(
          "text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight",
          light ? "text-white" : "text-slate-900"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 text-base sm:text-lg leading-relaxed text-balance",
            light ? "text-slate-200" : "text-slate-600"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
