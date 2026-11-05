"use client";

import React, { useState } from "react";
import {
  Inbox,
  CheckCircle2,
  Clock,
  UserCheck,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  UserPlus,
  X,
  Filter,
} from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";
import { AdmissionEnquiry, AdmissionPipelineStage } from "@/lib/portalTypes";
import { cn } from "@/lib/utils";

const STAGES: AdmissionPipelineStage[] = [
  "New",
  "Contacted",
  "Document Review",
  "Assessment & Interview",
  "Approved",
  "Enrolled",
];

export default function AdminAdmissionsPage() {
  const { state, updateAdmissionStatus, enrollApplicant } = usePortalData();

  const [activeStage, setActiveStage] = useState<string>("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<AdmissionEnquiry | null>(null);
  const [successBanner, setSuccessBanner] = useState("");

  const filtered = state.admissions.filter((adm) => {
    if (activeStage === "all") return true;
    return adm.status === activeStage;
  });

  const handleStageChange = (id: string, newStage: AdmissionPipelineStage) => {
    updateAdmissionStatus(id, newStage);
    setSuccessBanner(`Application stage moved to "${newStage}"!`);
    setTimeout(() => setSuccessBanner(""), 3000);
  };

  const handleEnroll = (adm: AdmissionEnquiry) => {
    enrollApplicant(adm.id);
    setSuccessBanner(`${adm.applicantName} officially enrolled as active student! Added to student directory.`);
    setTimeout(() => setSuccessBanner(""), 4000);
  };

  return (
    <PortalShell activeRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">
              Admissions Pipeline & Enquiry Funnel
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Process admission inquiries from initial website enquiry through assessment, approval, and enrollment
            </p>
          </div>

          <span className="px-3.5 py-1.5 rounded-xl bg-school-50 border border-school-200 text-school-900 text-xs font-semibold self-start">
            Total Inquiries: {state.admissions.length}
          </span>
        </div>

        {successBanner && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successBanner}</span>
          </div>
        )}

        {/* Funnel Stage Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setActiveStage("all")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0",
              activeStage === "all"
                ? "bg-school-800 text-white shadow-soft"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            )}
          >
            All Inquiries ({state.admissions.length})
          </button>
          {STAGES.map((st) => {
            const count = state.admissions.filter((a) => a.status === st).length;
            const isSelected = activeStage === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setActiveStage(st)}
                className={cn(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5",
                  isSelected
                    ? "bg-school-800 text-white shadow-soft"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                )}
              >
                <span>{st}</span>
                <span className={cn("px-1.5 py-0.2 rounded-full text-[10px] font-bold", isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Pipeline Enquiries Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((adm) => {
            const isApproved = adm.status === "Approved";
            const isEnrolled = adm.status === "Enrolled";

            return (
              <div
                key={adm.id}
                className={cn(
                  "bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between transition-all hover:border-slate-300",
                  isApproved ? "border-amber-300 ring-2 ring-amber-300/20" : "border-slate-200/90"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-school-800 bg-school-50 px-2 py-0.5 rounded border border-school-200">
                      {adm.applicationNo}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{adm.applicationDate}</span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-slate-900 leading-snug">
                    {adm.applicantName}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-semibold text-school-700 mt-0.5">
                    <span>Applied: {adm.appliedClass}</span>
                    <span>•</span>
                    <span className="text-slate-500 font-normal">DOB: {adm.dateOfBirth}</span>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Parent:</span>
                      <strong className="text-slate-800">{adm.parentName}</strong>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{adm.parentPhone}</span>
                    </div>
                    {adm.previousSchool && (
                      <div className="text-[11px] text-slate-500 italic line-clamp-1">
                        Prev: {adm.previousSchool}
                      </div>
                    )}
                  </div>

                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 line-clamp-2">
                    {adm.notes}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Stage:</label>
                    <select
                      value={adm.status}
                      disabled={isEnrolled}
                      onChange={(e) => handleStageChange(adm.id, e.target.value as AdmissionPipelineStage)}
                      className="text-xs font-semibold border border-slate-200 rounded-lg px-2 py-1 bg-white text-slate-800 outline-none focus:border-school-600 disabled:opacity-70"
                    >
                      {STAGES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  {isApproved && (
                    <button
                      type="button"
                      onClick={() => handleEnroll(adm)}
                      className="w-full py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5 shadow-soft"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Convert to Enrolled Student</span>
                    </button>
                  )}

                  {isEnrolled && (
                    <div className="w-full py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-center font-bold text-xs border border-emerald-200 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Enrolled in Class</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PortalShell>
  );
}

