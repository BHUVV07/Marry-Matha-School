"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Layers,
  ArrowLeft,
  Lock,
  KeyRound,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Info,
  Clock,
  ArrowRight,
} from "lucide-react";
import { SchoolLogo } from "@/components/common/SchoolLogo";
import { schoolConfig } from "@/config/schoolInfo";

interface PortalFeature {
  title: string;
  description: string;
}

interface PortalPreviewPageProps {
  portalTitle: string;
  roleAudience: string;
  badgeColor: string;
  icon: React.ReactNode;
  summary: string;
  features: PortalFeature[];
  sampleCredentialsHint: string;
}

export const PortalPreviewPage: React.FC<PortalPreviewPageProps> = ({
  portalTitle,
  roleAudience,
  badgeColor,
  icon,
  summary,
  features,
  sampleCredentialsHint,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [demoNotice, setDemoNotice] = useState<string | null>(null);

  const handleDemoLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoNotice(
      `Prototype Notice: ${portalTitle} authentication services are currently under development as part of the Mary Matha Digital Ecosystem Phase 2. Production credentials will be provisioned by school administration upon ecosystem rollout.`
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between">
      {/* Top Bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 px-4 sm:px-8 py-4 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Public Website</span>
            </Link>
            <div className="h-4 w-px bg-slate-800 hidden sm:block" />
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-amber-400 font-medium">
              <Layers className="w-3.5 h-3.5" />
              Mary Matha Digital Ecosystem
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              Phase 2 Preview
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Role Details & Planned Features */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20">
              {icon}
              <span>{roleAudience}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {portalTitle}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {summary}
            </p>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-start gap-3">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Architecture Disclosure: </strong>
                This route is provisioned as an architectural endpoint for future single sign-on (SSO) integration within the Mary Matha Primary School Digital Ecosystem.
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Planned Functional Capabilities:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-white flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat.title}</span>
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Prototype Login Box */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-school-600/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Lock className="w-4 h-4 text-amber-400" />
                      <span>Portal Authentication</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Unified secure sign-in prototype
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded">
                    Demo Interface
                  </span>
                </div>

                {demoNotice && (
                  <div className="p-3.5 rounded-xl bg-amber-400/15 border border-amber-400/30 text-xs text-amber-200 leading-relaxed animate-in fade-in">
                    {demoNotice}
                  </div>
                )}

                <form onSubmit={handleDemoLogin} className="space-y-4">
                  <div>
                    <label
                      htmlFor="user-id"
                      className="block text-xs font-semibold text-slate-300 mb-1"
                    >
                      Institutional ID / Registered Email
                    </label>
                    <input
                      type="text"
                      id="user-id"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={sampleCredentialsHint}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-school-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="user-password"
                      className="block text-xs font-semibold text-slate-300 mb-1"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="user-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-school-500"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-slate-500" />
                      2-Factor Authentication
                    </span>
                    <span className="text-slate-500">Scheduled for Phase 2</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-school-600 hover:bg-school-500 text-white transition-colors shadow-soft"
                  >
                    Authenticate with Digital Ecosystem
                  </button>
                </form>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <span>Questions about portal access?</span>
                  <Link
                    href="/contact"
                    className="text-amber-400 hover:underline font-semibold"
                  >
                    Contact IT Desk
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Bar */}
      <footer className="border-t border-slate-800 bg-slate-950 px-4 py-4 text-xs text-slate-500 text-center">
        <p>
          © {new Date().getFullYear()} {schoolConfig.name} Digital Ecosystem • Enterprise Architecture
        </p>
      </footer>
    </div>
  );
};

