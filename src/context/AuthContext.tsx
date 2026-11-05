"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Role, DemoUser } from "@/lib/portalTypes";

export const DEMO_ACCOUNTS: Record<Role, DemoUser> = {
  parent: {
    id: "user-parent-01",
    name: "Mr. Vikram Patel",
    email: "parent@marymata.edu",
    role: "parent",
    avatar: "/images/avatars/parent.jpg",
    phone: "+91 98220 12345",
    associatedId: "parent-001",
    designation: "Parent / Legal Guardian",
  },
  student: {
    id: "user-student-01",
    name: "Rohan Patel",
    email: "student@marymata.edu",
    role: "student",
    avatar: "/images/avatars/student.jpg",
    phone: "+91 98220 12345",
    associatedId: "rohan-patel",
    department: "Class 4-A • Roll #12",
    designation: "Student (St. Gabriel House)",
  },
  teacher: {
    id: "user-teacher-02",
    name: "Mr. Rajesh Verma",
    email: "teacher@marymata.edu",
    role: "teacher",
    avatar: "/images/avatars/teacher2.jpg",
    phone: "+91 98230 44552",
    associatedId: "teacher-002",
    department: "Physical Science & ICT",
    designation: "Subject Faculty (Physics & Computer Studies)",
  },
  class_teacher: {
    id: "user-teacher-01",
    name: "Mrs. Sunita Sharma",
    email: "classteacher@marymata.edu",
    role: "class_teacher",
    avatar: "/images/avatars/teacher.jpg",
    phone: "+91 98230 44551",
    associatedId: "teacher-001",
    department: "Mathematics & Science",
    designation: "Class Teacher (Class 4-A) & Senior Faculty",
  },
  admin: {
    id: "user-admin-01",
    name: "Sister Agnes D'Souza",
    email: "admin@marymata.edu",
    role: "admin",
    avatar: "/images/avatars/admin.jpg",
    phone: "+91 98230 11002",
    associatedId: "admin-001",
    department: "General Administration",
    designation: "Administrative Director",
  },
  super_admin: {
    id: "user-superadmin-01",
    name: "Dr. Anthony Rao",
    email: "superadmin@marymata.edu",
    role: "super_admin",
    avatar: "/images/avatars/superadmin.jpg",
    phone: "+91 98230 11000",
    associatedId: "superadmin-001",
    department: "IT Infrastructure & Governance",
    designation: "Super Administrator / Chief Technology Officer",
  },
  principal: {
    id: "user-principal-01",
    name: "Rev. Fr. Mathew Thomas",
    email: "principal@marymata.edu",
    role: "principal",
    avatar: "/images/avatars/principal.jpg",
    phone: "+91 98230 11001",
    associatedId: "principal-001",
    department: "Executive Leadership",
    designation: "Principal & Institutional Head",
  },
  accountant: {
    id: "user-accountant-01",
    name: "Mr. John Fernandes",
    email: "accountant@marymata.edu",
    role: "accountant",
    avatar: "/images/avatars/accountant.jpg",
    phone: "+91 98230 11003",
    associatedId: "accountant-001",
    department: "Finance & Accounts",
    designation: "Bursar & Chief Accounts Officer",
  },
};

interface AuthContextType {
  user: DemoUser;
  role: Role;
  selectedChildId: string;
  setSelectedChildId: (childId: string) => void;
  login: (role: Role) => void;
  logout: () => void;
  switchRole: (newRole: Role) => void;
  isDemoAuth: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "mmes_current_role_v2";
const CHILD_STORAGE_KEY = "mmes_selected_child_v2";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>("parent");
  const [selectedChildId, setSelectedChildIdState] = useState<string>("rohan-patel");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedRole = localStorage.getItem(AUTH_STORAGE_KEY) as Role | null;
      if (savedRole && DEMO_ACCOUNTS[savedRole]) {
        setRole(savedRole);
      }
      const savedChild = localStorage.getItem(CHILD_STORAGE_KEY);
      if (savedChild) {
        setSelectedChildIdState(savedChild);
      }
    } catch {
      // Ignore localStorage errors
    }
    setMounted(true);
  }, []);

  const login = (newRole: Role) => {
    setRole(newRole);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, newRole);
    } catch {
      // Ignore
    }
  };

  const logout = () => {
    // Return to default demo parent
    setRole("parent");
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, "parent");
    } catch {
      // Ignore
    }
  };

  const switchRole = (newRole: Role) => {
    login(newRole);
  };

  const setSelectedChildId = (childId: string) => {
    setSelectedChildIdState(childId);
    try {
      localStorage.setItem(CHILD_STORAGE_KEY, childId);
    } catch {
      // Ignore
    }
  };

  const user = DEMO_ACCOUNTS[role];

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        selectedChildId,
        setSelectedChildId,
        login,
        logout,
        switchRole,
        isDemoAuth: true,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

