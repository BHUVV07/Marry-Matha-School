"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  GraduationCap,
  BookOpen,
  Shield,
  Award,
  Calculator,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowLeft,
} from "lucide-react";
import { useAuth, DEMO_ACCOUNTS } from "@/context/AuthContext";
import { Role } from "@/lib/portalTypes";
import { cn } from "@/lib/utils";

const roleCards: {
  role: Role;
  title: string;
  badge: string;
  email: string;
  name: string;
  desc: string;
  icon: React.ElementType;
  color: string;
  borderHover: string;
}[] = [
  {
    role: "parent",
    title: "Parent Portal",
    badge: "Parent & Guardian",
    email: "parent@marymata.edu",
    name: "Mr. Vikram Patel",
    desc: "Monitor attendance, fee invoices, report cards & teacher circulars for 2 enrolled wards.",
    icon: Users,
    color: "bg-sky-50 text-sky-700 border-sky-200",
    borderHover: "hover:border-sky-500",
  },
  {
    role: "student",
    title: "Student Portal",
    badge: "Enrolled Student",
    email: "student@marymata.edu",
    name: "Rohan Patel (Class 4-A)",
    desc: "View class timetable, complete homework, check test scores & download lesson notes.",
    icon: GraduationCap,
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    borderHover: "hover:border-emerald-500",
  },
  {
    role: "class_teacher",
    title: "Class Teacher Portal",
    badge: "Class Teacher 4-A",
    email: "classteacher@marymata.edu",
    name: "Mrs. Sunita Sharma",
    desc: "Daily register attendance, post assignments, publish report cards & review leaves.",
    icon: BookOpen,
    color: "bg-blue-50 text-blue-700 border-blue-200",
    borderHover: "hover:border-blue-500",
  },
  {
    role: "teacher",
    title: "Subject Faculty",
    badge: "Physics & ICT Faculty",
    email: "teacher@marymata.edu",
    name: "Mr. Rajesh Verma",
    desc: "Subject teaching schedule, lab assignments, grade entry & academic materials.",
    icon: BookOpen,
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    borderHover: "hover:border-indigo-500",
  },
  {
    role: "admin",
    title: "Admin Portal",
    badge: "System Administration",
    email: "admin@marymata.edu",
    name: "Sister Agnes D'Souza",
    desc: "Admissions pipeline, student & staff directories, class wings, reports & settings.",
    icon: Shield,
    color: "bg-rose-50 text-rose-700 border-rose-200",
    borderHover: "hover:border-rose-500",
  },
  {
    role: "super_admin",
    title: "Super Admin Console",
    badge: "Root Governance / IT",
    email: "superadmin@marymata.edu",
    name: "Dr. Anthony Rao",
    desc: "Full institutional data vault, master security roles, compliance audit & database oversight.",
    icon: Shield,
    color: "bg-red-50 text-red-700 border-red-200",
    borderHover: "hover:border-red-500",
  },
  {
    role: "principal",
    title: "Principal Desk",
    badge: "Institutional Head",
    email: "principal@marymata.edu",
    name: "Rev. Fr. Mathew Thomas",
    desc: "Executive metrics, academic health, faculty attendance, admissions conversion & notices.",
    icon: Award,
    color: "bg-amber-50 text-amber-700 border-amber-200",
    borderHover: "hover:border-amber-500",
  },
  {
    role: "accountant",
    title: "Accountant Portal",
    badge: "Bursar & Finance",
    email: "accountant@marymata.edu",
    name: "Mr. John Fernandes",
    desc: "Record offline fee payments, print official receipts & track student ledger dues.",
    icon: Calculator,
    color: "bg-purple-50 text-purple-700 border-purple-200",
    borderHover: "hover:border-purple-500",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("parent@marymata.edu");
  const [password, setPassword] = useState("demo123");
  const [selectedRole, setSelectedRole] = useState<Role>("parent");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const handleSelectRole = (r: Role, roleEmail: string) => {
    setSelectedRole(r);
    setEmail(roleEmail);
    setPassword("demo123");
    setError(null);
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      if (!email.includes("@")) {
        setError("Please enter a valid school email address or username.");
        setIsLoading(false);
        return;
      }
      if (password.length < 4) {
        setError("Password must contain at least 4 characters.");
        setIsLoading(false);
        return;
      }

      // Check if matches known demo account or find by email
      const matchedCard = roleCards.find((c) => c.email.toLowerCase() === email.toLowerCase());
      const roleToLogin = matchedCard ? matchedCard.role : selectedRole;

      login(roleToLogin);
      setIsLoading(false);
      const targetRoute =
        roleToLogin === "class_teacher"
          ? "/teacher"
          : roleToLogin === "super_admin"
          ? "/admin"
          : `/${roleToLogin}`;
      router.push(targetRoute);
    }, 400);
  };

  const handleQuickLaunch = (r: Role) => {
    login(r);
    const targetRoute =
      r === "class_teacher" ? "/teacher" : r === "super_admin" ? "/admin" : `/${r}`;
    router.push(targetRoute);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-school-100 selection:text-school-900">
      {/* Top Banner Navigation */}
      <header className="bg-white border-b border-slate-200/80 px-4 py-3 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-school-800 text-white flex items-center justify-center font-bold text-sm shadow-xs group-hover:bg-school-900 transition-colors">
              MM
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-slate-900">
                Mary Matha Primary School
              </span>
              <span className="hidden sm:inline text-xs text-slate-500 ml-2">
                • Digital Ecosystem ERP
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-school-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Website</span>
          </Link>
        </div>
      </header>

      {/* Main Login Workspace */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 lg:py-12 flex flex-col justify-center">
        {/* Header Introduction */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-school-50 border border-school-200 text-school-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-school-600" />
            <span>Multi-Portal Authentication Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900">
            Sign In to Your Mary Matha Portal
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Select a role persona below to test instant demonstration authentication, or enter your credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 1-Click Role Persona Quick Switcher */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                1-Click Demonstration Accounts
              </h2>
              <span className="text-xs text-slate-500">Pick any persona</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {roleCards.map((card) => {
                const Icon = card.icon;
                const isSelected = selectedRole === card.role;
                return (
                  <div
                    key={card.role}
                    className={cn(
                      "p-4 rounded-2xl border transition-all text-left relative flex flex-col justify-between bg-white shadow-2xs hover:shadow-card",
                      card.borderHover,
                      isSelected ? "border-school-600 ring-2 ring-school-600/20" : "border-slate-200"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold border", card.color)}>
                          {card.badge}
                        </span>
                        <div className="p-1.5 rounded-lg bg-slate-50">
                          <Icon className="w-4 h-4 text-slate-700" />
                        </div>
                      </div>
                      <h3 className="font-heading font-bold text-sm text-slate-900 leading-tight">
                        {card.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">{card.email}</p>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">{card.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleSelectRole(card.role, card.email)}
                        className={cn(
                          "text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors",
                          isSelected
                            ? "bg-school-50 text-school-800"
                            : "text-slate-600 hover:bg-slate-100"
                        )}
                      >
                        {isSelected ? "Selected in form" : "Auto-fill Form"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleQuickLaunch(card.role)}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-school-800 text-white hover:bg-school-900 transition-colors shadow-2xs"
                      >
                        <span>Launch &rarr;</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Architecture note */}
            <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
              <HelpCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800">PostgreSQL & Supabase Architecture:</span>
                <p className="mt-0.5 leading-relaxed text-slate-500">
                  This POC provides unified state persistence in localStorage. In production deployment, authentication transitions seamlessly to Supabase Auth with Row-Level Security (RLS) enforcement.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Standard Credentials Login Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-card">
              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-school-700">
                  Authentication Form
                </span>
                <h2 className="text-xl font-heading font-bold text-slate-900 mt-1">
                  Sign in to {roleCards.find((c) => c.role === selectedRole)?.title}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Access academic, administrative, and financial portals.
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleManualLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address or School Username
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="e.g. parent@marymata.edu"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-school-600 focus:ring-2 focus:ring-school-600/20 text-xs text-slate-900 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700">Password</label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-[11px] font-semibold text-school-700 hover:text-school-900"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter password"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:border-school-600 focus:ring-2 focus:ring-school-600/20 text-xs text-slate-900 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-school-600 focus:ring-school-500 w-3.5 h-3.5"
                    />
                    <span>Remember this device</span>
                  </label>
                  <span className="text-[10px] text-slate-400">Demo Password: demo123</span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-school-800 text-white font-semibold text-xs hover:bg-school-900 transition-all flex items-center justify-center gap-2 shadow-soft disabled:opacity-70 mt-2"
                >
                  {isLoading ? (
                    <span>Verifying session...</span>
                  ) : (
                    <>
                      <span>Sign In to {roleCards.find((c) => c.role === selectedRole)?.badge}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-500">
                  Need admissions or general school inquiry?{" "}
                  <Link href="/contact" className="font-semibold text-school-700 hover:text-school-900">
                    Contact Admin Office
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal Simulator */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 animate-in zoom-in-95">
            <h3 className="font-heading font-bold text-base text-slate-900 mb-1">
              Reset Your Portal Password
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter your registered parent or employee email address. A password recovery link will be simulated.
            </p>

            {forgotSent ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs mb-4">
                <div className="flex items-center gap-2 font-semibold mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Password Reset Link Dispatched</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  We have simulated a reset link to <strong className="font-semibold">{forgotEmail || email}</strong>. In production, an authenticated Supabase magic link or token is sent.
                </p>
              </div>
            ) : (
              <div className="space-y-3 mb-4">
                <label className="block text-xs font-semibold text-slate-700">Registered Email</label>
                <input
                  type="email"
                  value={forgotEmail || email}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="parent@marymata.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-school-600"
                />
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(false);
                  setForgotSent(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              {!forgotSent && (
                <button
                  type="button"
                  onClick={() => setForgotSent(true)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-school-800 text-white hover:bg-school-900"
                >
                  Send Reset Link
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

