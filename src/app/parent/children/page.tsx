"use client";

import React from "react";
import { Users, UserCheck, Calendar, MapPin, Bus, Heart, Sparkles, Phone, Mail } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { cn } from "@/lib/utils";

export default function ParentChildrenPage() {
  const { selectedChildId, setSelectedChildId } = useAuth();
  const { state } = usePortalData();

  return (
    <PortalShell activeRole="parent">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">Enrolled Wards & Children</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your registered children at Mary Matha Primary School. Select a child to view their academic dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {state.parentProfile.childrenIds.map((cid) => {
            const child = state.students.find((s) => s.id === cid);
            if (!child) return null;
            const isSelected = selectedChildId === cid;

            return (
              <div
                key={child.id}
                className={cn(
                  "bg-white rounded-2xl border p-6 transition-all shadow-xs relative flex flex-col justify-between",
                  isSelected
                    ? "border-school-600 ring-2 ring-school-600/20 shadow-card"
                    : "border-slate-200/90 hover:border-slate-300"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={cn(
                        "text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider",
                        isSelected ? "bg-school-50 text-school-800 border-school-200" : "bg-slate-100 text-slate-600 border-slate-200"
                      )}
                    >
                      {isSelected ? "Active in Portal" : "Registered Ward"}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
                      Status: {child.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-2xl border border-sky-200 shadow-2xs">
                      {child.firstName.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-lg font-heading font-bold text-slate-900">{child.fullName}</h2>
                      <p className="text-xs font-semibold text-school-700">
                        {child.className} — Section {child.section} (Roll #{child.rollNo})
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        Adm No: {child.admissionNo}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50/60 p-4 rounded-xl border border-slate-100 mb-4">
                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase font-medium">Date of Birth</span>
                      <span className="font-semibold text-slate-800">{child.dateOfBirth}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase font-medium">Blood Group</span>
                      <span className="font-semibold text-rose-600">{child.bloodGroup}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase font-medium">House</span>
                      <span className="font-semibold text-slate-800">{child.house}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase font-medium">Attendance</span>
                      <span className="font-bold text-emerald-600">{child.attendancePercentage}%</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Bus className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{child.busRoute}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="line-clamp-1">{child.address}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Enrolled: {child.enrolledDate}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedChildId(child.id)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-semibold transition-all",
                      isSelected
                        ? "bg-slate-100 text-slate-500 cursor-default"
                        : "bg-school-800 text-white hover:bg-school-900 shadow-soft"
                    )}
                  >
                    {isSelected ? "Currently Selected" : "Select Child"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PortalShell>
  );
}

