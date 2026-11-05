import React from "react";
import Link from "next/link";
import { BookOpen, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SchoolLogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
}

export const SchoolLogo: React.FC<SchoolLogoProps> = ({
  variant = "dark",
  size = "md",
  showTagline = true,
  className,
}) => {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-3 transition-opacity focus:outline-none",
        className
      )}
      aria-label="Mary Matha School, Ripponpet - Home"
    >
      {/* Emblem Crest */}
      <div
        className={cn(
          "relative flex items-center justify-center rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-105",
          size === "sm" && "w-10 h-10",
          size === "md" && "w-12 h-12",
          size === "lg" && "w-16 h-16",
          isLight
            ? "bg-white text-school-900 border border-school-100"
            : "bg-school-900 text-white border border-school-700/50"
        )}
      >
        {/* Subtle inner ring */}
        <div className="absolute inset-0.5 rounded-[10px] border border-amber-400/40 pointer-events-none" />
        
        <BookOpen
          className={cn(
            size === "sm" && "w-5 h-5",
            size === "md" && "w-6 h-6",
            size === "lg" && "w-8 h-8",
            isLight ? "text-school-800" : "text-amber-400"
          )}
        />
        <Sparkles
          className={cn(
            "absolute top-1 right-1 text-amber-500",
            size === "sm" && "w-2.5 h-2.5",
            size === "md" && "w-3 h-3",
            size === "lg" && "w-4 h-4"
          )}
        />
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <span
          className={cn(
            "font-bold uppercase tracking-tight font-heading leading-tight",
            size === "sm" && "text-sm",
            size === "md" && "text-base sm:text-lg",
            size === "lg" && "text-xl sm:text-2xl",
            isLight ? "text-white" : "text-slate-900"
          )}
        >
          Mary Matha
          <span
            className={cn(
              "ml-1 font-semibold",
              isLight ? "text-school-200" : "text-school-700"
            )}
          >
            School
          </span>
        </span>
        {showTagline && (
          <span
            className={cn(
              "text-[10px] sm:text-xs font-medium tracking-wide uppercase",
              isLight ? "text-school-300" : "text-slate-500"
            )}
          >
            Ripponpet, Shimoga • Est. 1999
          </span>
        )}
      </div>
    </Link>
  );
};
