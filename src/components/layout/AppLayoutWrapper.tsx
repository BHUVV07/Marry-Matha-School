"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const AppLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  const isPortalRoute =
    pathname.startsWith("/parent") ||
    pathname.startsWith("/student") ||
    pathname.startsWith("/teacher") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/principal") ||
    pathname.startsWith("/accountant") ||
    pathname.startsWith("/login");

  if (isPortalRoute) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Skip to main content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-school-800 text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
      >
        Skip to main content
      </a>

      {/* Global Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 focus:outline-none">
        {children}
      </main>

      {/* Global Footer */}
      <Footer />
    </>
  );
};

