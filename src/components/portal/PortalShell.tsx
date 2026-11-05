"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Users,
  GraduationCap,
  BookOpen,
  Shield,
  Award,
  Calculator,
  Calendar,
  Clock,
  FileText,
  CreditCard,
  Receipt,
  Bell,
  CheckCircle2,
  ChevronDown,
  LogOut,
  Home,
  CheckSquare,
  ClipboardList,
  Sparkles,
  Search,
  UserCheck,
  AlertCircle,
  Menu,
  X,
  RefreshCw,
  Sliders,
  ExternalLink,
  ChevronRight,
  FolderOpen,
  User,
  Settings,
  BarChart3,
  Building,
  Layers,
  Inbox,
} from "lucide-react";
import { useAuth, DEMO_ACCOUNTS } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { Role } from "@/lib/portalTypes";
import { cn } from "@/lib/utils";

interface NavLinkItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

const roleConfigs: Record<
  Role,
  {
    title: string;
    badge: string;
    color: string;
    lightBg: string;
    icon: React.ElementType;
    basePath: string;
    links: NavLinkItem[];
  }
> = {
  parent: {
    title: "Parent Portal",
    badge: "Parent & Guardian",
    color: "text-sky-600 bg-sky-50 border-sky-200",
    lightBg: "bg-sky-500",
    icon: Users,
    basePath: "/parent",
    links: [
      { title: "Dashboard", href: "/parent", icon: Home },
      { title: "My Children", href: "/parent/children", icon: Users },
      { title: "Attendance", href: "/parent/attendance", icon: UserCheck },
      { title: "Timetable", href: "/parent/timetable", icon: Clock },
      { title: "Homework", href: "/parent/homework", icon: BookOpen, badge: "Active" },
      { title: "Examinations", href: "/parent/examinations", icon: Calendar },
      { title: "Results & Reports", href: "/parent/results", icon: Award },
      { title: "Fee Dues & Invoices", href: "/parent/fees", icon: CreditCard },
      { title: "Payment History", href: "/parent/payments", icon: Receipt },
      { title: "Fee Receipts", href: "/parent/receipts", icon: FileText },
      { title: "Apply for Leave", href: "/parent/leave", icon: ClipboardList },
      { title: "Announcements", href: "/parent/announcements", icon: Bell },
      { title: "School Documents", href: "/parent/documents", icon: FolderOpen },
      { title: "My Profile", href: "/parent/profile", icon: User },
    ],
  },
  student: {
    title: "Student Portal",
    badge: "Enrolled Student",
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    lightBg: "bg-emerald-500",
    icon: GraduationCap,
    basePath: "/student",
    links: [
      { title: "Dashboard", href: "/student", icon: Home },
      { title: "My Timetable", href: "/student/timetable", icon: Clock },
      { title: "Homework", href: "/student/homework", icon: BookOpen, badge: "Pending" },
      { title: "Assignments", href: "/student/assignments", icon: CheckSquare },
      { title: "Study Materials", href: "/student/study-materials", icon: FolderOpen },
      { title: "Examinations", href: "/student/examinations", icon: Calendar },
      { title: "Results & Grades", href: "/student/results", icon: Award },
      { title: "My Attendance", href: "/student/attendance", icon: UserCheck },
      { title: "Announcements", href: "/student/announcements", icon: Bell },
      { title: "Documents", href: "/student/documents", icon: FileText },
      { title: "My Profile", href: "/student/profile", icon: User },
    ],
  },
  teacher: {
    title: "Teacher Portal",
    badge: "Academic Faculty",
    color: "text-indigo-600 bg-indigo-50 border-indigo-200",
    lightBg: "bg-indigo-500",
    icon: BookOpen,
    basePath: "/teacher",
    links: [
      { title: "Dashboard", href: "/teacher", icon: Home },
      { title: "My Classes", href: "/teacher/classes", icon: Building },
      { title: "Teaching Timetable", href: "/teacher/timetable", icon: Clock },
      { title: "Mark Attendance", href: "/teacher/attendance", icon: UserCheck, badge: "Action" },
      { title: "Manage Homework", href: "/teacher/homework", icon: BookOpen },
      { title: "Assignments", href: "/teacher/assignments", icon: CheckSquare },
      { title: "Examinations", href: "/teacher/examinations", icon: Calendar },
      { title: "Gradebook / Marks", href: "/teacher/marks", icon: Award },
      { title: "Students Roster", href: "/teacher/students", icon: Users },
      { title: "Announcements", href: "/teacher/announcements", icon: Bell },
      { title: "Faculty Profile", href: "/teacher/profile", icon: User },
    ],
  },
  admin: {
    title: "Admin Portal",
    badge: "System Administrator",
    color: "text-rose-600 bg-rose-50 border-rose-200",
    lightBg: "bg-rose-500",
    icon: Shield,
    basePath: "/admin",
    links: [
      { title: "Dashboard", href: "/admin", icon: Home },
      { title: "Students Directory", href: "/admin/students", icon: Users },
      { title: "Faculty Directory", href: "/admin/teachers", icon: UserCheck },
      { title: "Class Wings", href: "/admin/classes", icon: Building },
      { title: "Section Allotment", href: "/admin/sections", icon: Layers },
      { title: "Admissions Funnel", href: "/admin/admissions", icon: Inbox, badge: "New" },
      { title: "Fee Structures", href: "/admin/fees", icon: CreditCard },
      { title: "Payment Ledger", href: "/admin/payments", icon: Receipt },
      { title: "Attendance Analytics", href: "/admin/attendance", icon: BarChart3 },
      { title: "Master Timetable", href: "/admin/timetable", icon: Clock },
      { title: "Announcements", href: "/admin/announcements", icon: Bell },
      { title: "School Calendar", href: "/admin/events", icon: Calendar },
      { title: "Portal Users", href: "/admin/users", icon: Users },
      { title: "RBAC Matrix", href: "/admin/roles", icon: Shield },
      { title: "Reports & Export", href: "/admin/reports", icon: FileText },
      { title: "System Settings", href: "/admin/settings", icon: Settings },
      { title: "Document Vault", href: "/admin/documents", icon: FolderOpen },
    ],
  },
  class_teacher: {
    title: "Class Teacher Desk",
    badge: "Class Teacher 4-A",
    color: "text-blue-600 bg-blue-50 border-blue-200",
    lightBg: "bg-blue-600",
    icon: BookOpen,
    basePath: "/teacher",
    links: [
      { title: "Dashboard", href: "/teacher", icon: Home },
      { title: "My Classes", href: "/teacher/classes", icon: Building },
      { title: "Teaching Timetable", href: "/teacher/timetable", icon: Clock },
      { title: "Mark Attendance", href: "/teacher/attendance", icon: UserCheck, badge: "Daily Register" },
      { title: "Manage Homework", href: "/teacher/homework", icon: BookOpen },
      { title: "Assignments", href: "/teacher/assignments", icon: CheckSquare },
      { title: "Examinations", href: "/teacher/examinations", icon: Calendar },
      { title: "Gradebook / Marks", href: "/teacher/marks", icon: Award },
      { title: "Students Roster", href: "/teacher/students", icon: Users },
      { title: "Announcements", href: "/teacher/announcements", icon: Bell },
      { title: "Faculty Profile", href: "/teacher/profile", icon: User },
    ],
  },
  super_admin: {
    title: "Super Admin Console",
    badge: "IT Head & Governance",
    color: "text-red-700 bg-red-50 border-red-200",
    lightBg: "bg-red-600",
    icon: Shield,
    basePath: "/admin",
    links: [
      { title: "Executive Dashboard", href: "/admin", icon: Home },
      { title: "Students Directory", href: "/admin/students", icon: Users },
      { title: "Faculty Directory", href: "/admin/teachers", icon: UserCheck },
      { title: "Class Wings", href: "/admin/classes", icon: Building },
      { title: "Section Allotment", href: "/admin/sections", icon: Layers },
      { title: "Admissions Funnel", href: "/admin/admissions", icon: Inbox, badge: "Pipeline" },
      { title: "Fee Structures", href: "/admin/fees", icon: CreditCard },
      { title: "Payment Ledger", href: "/admin/payments", icon: Receipt },
      { title: "Attendance Analytics", href: "/admin/attendance", icon: BarChart3 },
      { title: "Master Timetable", href: "/admin/timetable", icon: Clock },
      { title: "Document Vault", href: "/admin/documents", icon: FolderOpen },
      { title: "Announcements", href: "/admin/announcements", icon: Bell },
      { title: "School Calendar", href: "/admin/events", icon: Calendar },
      { title: "Portal Users", href: "/admin/users", icon: Users },
      { title: "RBAC Matrix", href: "/admin/roles", icon: Shield },
      { title: "Reports & Export", href: "/admin/reports", icon: FileText },
      { title: "System Settings", href: "/admin/settings", icon: Settings },
    ],
  },
  principal: {
    title: "Principal Executive Desk",
    badge: "Principal & Head",
    color: "text-amber-600 bg-amber-50 border-amber-200",
    lightBg: "bg-amber-500",
    icon: Award,
    basePath: "/principal",
    links: [
      { title: "Executive Dashboard", href: "/principal", icon: Home },
      { title: "Student Directory", href: "/admin/students", icon: Users },
      { title: "Staff Directory", href: "/admin/teachers", icon: UserCheck },
      { title: "Admissions Pipeline", href: "/admin/admissions", icon: Inbox },
      { title: "Attendance Insights", href: "/admin/attendance", icon: BarChart3 },
      { title: "Fee Realization", href: "/accountant/reports", icon: CreditCard },
      { title: "Broadcast Circular", href: "/admin/announcements", icon: Bell },
      { title: "Academic Reports", href: "/admin/reports", icon: FileText },
    ],
  },
  accountant: {
    title: "Accountant Portal",
    badge: "Bursar & Accounts",
    color: "text-purple-600 bg-purple-50 border-purple-200",
    lightBg: "bg-purple-500",
    icon: Calculator,
    basePath: "/accountant",
    links: [
      { title: "Dashboard", href: "/accountant", icon: Home },
      { title: "Master Fee Structures", href: "/accountant/fees", icon: Layers },
      { title: "Student Fee Ledger", href: "/accountant/student-fees", icon: Users },
      { title: "Record Offline Payment", href: "/accountant/payments", icon: CreditCard, badge: "Counter" },
      { title: "Verified Receipts", href: "/accountant/receipts", icon: Receipt },
      { title: "Collection Reports", href: "/accountant/reports", icon: BarChart3 },
    ],
  },
};

export const PortalShell: React.FC<{
  children: React.ReactNode;
  activeRole: Role;
}> = ({ children, activeRole }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, switchRole, selectedChildId, setSelectedChildId } = useAuth();
  const {
    state,
    resetDemoData,
    simulatedPeriod,
    setSimulatedPeriod,
    getCurrentPeriodInfo,
    markNotificationAsRead,
    clearNotifications,
  } = usePortalData();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [resetAlert, setResetAlert] = useState(false);

  // Sync role if navigation doesn't match
  useEffect(() => {
    if (activeRole !== user.role) {
      if (
        (activeRole === "teacher" && user.role === "class_teacher") ||
        (activeRole === "admin" && user.role === "super_admin")
      ) {
        // preserve specific sub-persona
      } else {
        switchRole(activeRole);
      }
    }
  }, [activeRole, user.role]);

  const config = roleConfigs[user.role] || roleConfigs[activeRole];
  const activeChild = state.students.find((s) => s.id === selectedChildId) || state.students[0];
  const currentPeriod = getCurrentPeriodInfo(activeChild?.classId);

  const handleRoleChange = (newRole: Role) => {
    switchRole(newRole);
    setIsRoleDropdownOpen(false);
    const targetPath = roleConfigs[newRole].basePath;
    router.push(targetPath);
  };

  const handleResetData = () => {
    if (confirm("Reset all portal mock data back to defaults? (Attendance, homework, fee payments will revert to original state)")) {
      resetDemoData();
      setResetAlert(true);
      setTimeout(() => setResetAlert(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col font-sans">
      {/* Top Notification Banner for Demo Data Reset */}
      {resetAlert && (
        <div className="bg-emerald-600 text-white text-xs py-1.5 px-4 text-center font-medium shadow-sm transition-all flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Demo state refreshed successfully. All cross-role records restored to initial values!</span>
        </div>
      )}

      {/* Main ERP SaaS Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* Left: Mobile hamburger & School Logo with Portal Indicator */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <Link href={config.basePath} className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-school-800 text-white flex items-center justify-center font-bold text-base shadow-xs group-hover:bg-school-900 transition-colors">
                  MM
                </div>
                <div className="hidden sm:block">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-sm text-slate-900 leading-tight">
                      Mary Matha Primary School
                    </span>
                    <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border", config.color)}>
                      {config.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Digital Ecosystem ERP • 2026–2027
                  </p>
                </div>
              </Link>
            </div>

            {/* Middle: Interactive Period / Clock & Child Selector (if Parent) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Parent Multi-Child Selector */}
              {activeRole === "parent" && (
                <div className="flex items-center bg-slate-100/90 rounded-xl p-1 border border-slate-200/80 text-xs">
                  <span className="text-[11px] font-medium text-slate-500 px-2 hidden md:inline">
                    Active Ward:
                  </span>
                  <div className="flex gap-1">
                    {state.parentProfile.childrenIds.map((cid) => {
                      const child = state.students.find((s) => s.id === cid);
                      if (!child) return null;
                      const isSelected = selectedChildId === cid;
                      return (
                        <button
                          key={cid}
                          type="button"
                          onClick={() => setSelectedChildId(cid)}
                          className={cn(
                            "flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all",
                            isSelected
                              ? "bg-white text-school-900 shadow-xs border border-slate-200/80"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                          )}
                        >
                          <span
                            className={cn(
                              "w-2 h-2 rounded-full",
                              isSelected ? "bg-school-600 animate-pulse" : "bg-slate-400"
                            )}
                          />
                          <span>{child.firstName}</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            ({child.className}-{child.section})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Live Period Indicator with Simulator Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsPeriodDropdownOpen(!isPeriodDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-school-50 border border-school-200/80 text-school-900 text-xs hover:bg-school-100 transition-colors"
                  title="Simulate active school period"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <div className="text-left">
                    <div className="flex items-center gap-1 font-semibold text-[11px]">
                      <span>{currentPeriod.label}</span>
                      <span className="text-slate-400 font-normal hidden sm:inline">• {currentPeriod.subject}</span>
                    </div>
                  </div>
                  <ChevronDown className="w-3 h-3 text-school-600 ml-0.5" />
                </button>

                {isPeriodDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-card border border-slate-200 p-2 z-50 text-xs animate-in fade-in zoom-in-95">
                    <div className="px-2 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between">
                      <span className="font-semibold text-slate-800">Daily Period Simulator</span>
                      <span className="text-[10px] text-slate-400">Live test</span>
                    </div>
                    <div className="space-y-1">
                      {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => {
                            setSimulatedPeriod(num);
                            setIsPeriodDropdownOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors",
                            simulatedPeriod === num
                              ? "bg-school-50 font-semibold text-school-800"
                              : "hover:bg-slate-50 text-slate-700"
                          )}
                        >
                          <span>Period {num}</span>
                          <span className="text-[11px] text-slate-400">
                            {num === 1 ? "08:30" : num === 2 ? "09:15" : num === 3 ? "10:20" : num === 4 ? "11:05" : num === 5 ? "12:35" : num === 6 ? "13:20" : "14:05"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Role Switcher & Notifications & User Profile */}
            <div className="flex items-center gap-2">
              {/* Quick Role Switcher Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors shadow-2xs"
                >
                  <Sliders className="w-3.5 h-3.5 text-school-700" />
                  <span className="hidden sm:inline">Role:</span>
                  <span className="font-semibold text-slate-900 capitalize">{activeRole}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {isRoleDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-card border border-slate-200 p-1.5 z-50 text-xs animate-in fade-in zoom-in-95">
                    <div className="px-3 py-1.5 border-b border-slate-100 mb-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Switch Role (Demo Mode)
                    </div>
                    {(Object.keys(roleConfigs) as Role[]).map((r) => {
                      const rConfig = roleConfigs[r];
                      const Icon = rConfig.icon;
                      const isCurrent = r === activeRole;
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => handleRoleChange(r)}
                          className={cn(
                            "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors",
                            isCurrent
                              ? "bg-school-50 text-school-900 font-semibold"
                              : "text-slate-700 hover:bg-slate-50"
                          )}
                        >
                          <Icon className="w-4 h-4 text-school-600" />
                          <div className="flex-1">
                            <div className="leading-tight capitalize">{r} Portal</div>
                            <div className="text-[10px] text-slate-400 font-normal">{rConfig.badge}</div>
                          </div>
                          {isCurrent && <CheckCircle2 className="w-3.5 h-3.5 text-school-600" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Reset Demo Data Button */}
              <button
                type="button"
                onClick={handleResetData}
                title="Reset mock data to factory state"
                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                aria-label="Reset demo state"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              {/* Notification Drawer Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative transition-colors"
                  aria-label="View notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
                </button>

                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-card border border-slate-200 p-4 z-50 animate-in fade-in zoom-in-95">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <h4 className="font-semibold text-sm text-slate-900">In-App Notifications</h4>
                        <p className="text-[11px] text-slate-500">System events & circulars</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                          {state.notifications?.filter((n) => !n.read && (n.targetRole === "all" || n.targetRole === activeRole || n.targetRole === user.role)).length || 0} New
                        </span>
                        <button
                          type="button"
                          onClick={() => clearNotifications()}
                          className="text-[10px] text-slate-500 hover:text-slate-800 underline"
                        >
                          Mark all read
                        </button>
                      </div>
                    </div>
                    <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto py-2">
                      {(state.notifications || [])
                        .filter((n) => n.targetRole === "all" || n.targetRole === activeRole || n.targetRole === user.role)
                        .slice(0, 5)
                        .map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => markNotificationAsRead(notif.id)}
                            className={cn(
                              "py-2.5 px-2 rounded-xl transition-colors cursor-pointer text-xs mb-1",
                              notif.read ? "bg-white hover:bg-slate-50" : "bg-sky-50/60 hover:bg-sky-50"
                            )}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-slate-800 line-clamp-1">{notif.title}</span>
                              <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">{notif.timestamp}</span>
                            </div>
                            <p className="text-slate-600 line-clamp-2 text-[11px] leading-relaxed mb-1.5">{notif.message}</p>
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "text-[9px] font-medium px-1.5 py-0.5 rounded",
                                  notif.deliveryChannel.includes("External")
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-emerald-100 text-emerald-800"
                                )}
                              >
                                {notif.deliveryChannel}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="pt-2 border-t border-slate-100 text-center">
                      <Link
                        href={`/${activeRole === "super_admin" ? "admin" : activeRole === "class_teacher" ? "teacher" : activeRole}/announcements`}
                        onClick={() => setIsNotificationsOpen(false)}
                        className="text-xs text-school-700 hover:text-school-900 font-semibold"
                      >
                        View all school notices &rarr;
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar & Menu */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1 pl-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-school-800 text-white flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <div className="text-left hidden md:block">
                    <div className="text-xs font-semibold text-slate-900 leading-tight">{user.name}</div>
                    <div className="text-[10px] text-slate-500 leading-tight capitalize">{activeRole}</div>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400 mr-1" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-card border border-slate-200 p-2 z-50 text-xs animate-in fade-in zoom-in-95">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="font-semibold text-slate-900">{user.name}</p>
                      <p className="text-[11px] text-slate-500">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 capitalize">
                        {user.designation || activeRole}
                      </span>
                    </div>

                    <Link
                      href={`/${activeRole}/profile`}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
                    >
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      href="/"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                      <span>Back to Public Website</span>
                    </Link>

                    <div className="my-1 border-t border-slate-100" />

                    <Link
                      href="/login"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Switch Account / Sign Out</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace with Sidebar and Content Area */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-slate-200/80 p-4 shrink-0">
          <div className="space-y-1 mb-6">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {config.title} Navigation
            </div>
            {config.links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group",
                    isActive
                      ? "bg-school-50 text-school-900 font-semibold shadow-2xs border-l-3 border-school-600 pl-2.5"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={cn(
                        "w-4 h-4 transition-colors",
                        isActive ? "text-school-700" : "text-slate-400 group-hover:text-slate-600"
                      )}
                    />
                    <span>{link.title}</span>
                  </div>
                  {link.badge && (
                    <span
                      className={cn(
                        "text-[10px] font-bold px-1.5 py-0.5 rounded-md",
                        isActive ? "bg-school-200/60 text-school-900" : "bg-slate-100 text-slate-600"
                      )}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Quick Support Card in Sidebar Footer */}
          <div className="mt-auto pt-4 border-t border-slate-100">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-school-600" />
                <span>Mary Matha Ecosystem</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal mb-2">
                Demonstration platform with real-time cross-role sync.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-school-700 hover:text-school-900"
              >
                <span>Visit Public Site</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex">
            <div className="w-72 bg-white h-full p-4 flex flex-col shadow-xl animate-in slide-in-from-left duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-school-800 text-white flex items-center justify-center font-bold text-xs">
                    MM
                  </div>
                  <span className="font-bold text-sm text-slate-900">{config.title}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-1">
                {config.links.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all",
                        isActive
                          ? "bg-school-50 text-school-900 font-semibold border-l-3 border-school-600 pl-2.5"
                          : "text-slate-600 hover:bg-slate-100"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={cn("w-4 h-4", isActive ? "text-school-700" : "text-slate-400")} />
                        <span>{link.title}</span>
                      </div>
                      {link.badge && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100 mt-2">
                <Link
                  href="/"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <Home className="w-4 h-4 text-slate-400" />
                  <span>Public School Website</span>
                </Link>
              </div>
            </div>
            <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
          </div>
        )}

        {/* Main Page Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

