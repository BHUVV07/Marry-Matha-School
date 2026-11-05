export interface NavItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface PortalLink {
  title: string;
  href: string;
  role: string;
  description: string;
  icon: string;
  status: "In Development" | "Planned" | "Live";
}

export const mainNavItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Academics", href: "/academics" },
  { title: "Facilities", href: "/facilities" },
  { title: "Faculty", href: "/faculty" },
  { title: "Gallery", href: "/gallery" },
  { title: "Events", href: "/events" },
  { title: "Admissions", href: "/admissions", badge: "Open" },
  { title: "Contact", href: "/contact" },
];

export const ecosystemPortals: PortalLink[] = [
  {
    title: "Parent Portal",
    href: "/parent",
    role: "Parents & Guardians",
    description: "View child attendance, fee invoices, report cards & teacher notices.",
    icon: "Users",
    status: "Live",
  },
  {
    title: "Student Portal",
    href: "/student",
    role: "Enrolled Students",
    description: "Access homework, schedules, study modules & school announcements.",
    icon: "GraduationCap",
    status: "Live",
  },
  {
    title: "Teacher Portal",
    href: "/teacher",
    role: "Academic Faculty",
    description: "Mark attendance, record grades, submit lesson plans & student feedback.",
    icon: "BookOpen",
    status: "Live",
  },
  {
    title: "Principal Portal",
    href: "/principal",
    role: "Principal & Academic Head",
    description: "Institutional dashboard, curriculum tracking & administrative approvals.",
    icon: "Award",
    status: "Live",
  },
  {
    title: "Admin Portal",
    href: "/admin",
    role: "System Administrators",
    description: "Manage portal users, campus logistics, admissions pipeline & system roles.",
    icon: "ShieldCheck",
    status: "Live",
  },
  {
    title: "Accountant Portal",
    href: "/accountant",
    role: "Finance & Accounts",
    description: "Fee reconciliation, receipts, payroll accounting & financial auditing.",
    icon: "Calculator",
    status: "Live",
  },
];

export const quickLinks: NavItem[] = [
  { title: "Admission Procedure", href: "/admissions#process" },
  { title: "Fee Structure & Enquiry", href: "/admissions#enquiry" },
  { title: "Academic Calendar", href: "/events" },
  { title: "Campus Tour & Facilities", href: "/facilities" },
  { title: "Faculty Profiles", href: "/faculty" },
  { title: "Contact Administration", href: "/contact" },
];
