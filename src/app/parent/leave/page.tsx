"use client";

import React, { useState } from "react";
import { ClipboardList, Calendar, CheckCircle2, Clock, AlertCircle, Plus, Send } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { LeaveApplication } from "@/lib/portalTypes";
import { cn } from "@/lib/utils";

export default function ParentLeavePage() {
  const { selectedChildId } = useAuth();
  const { state, submitLeaveApplication } = usePortalData();

  const [leaveType, setLeaveType] = useState<LeaveApplication["leaveType"]>("Sick Leave");
  const [startDate, setStartDate] = useState("2026-11-12");
  const [endDate, setEndDate] = useState("2026-11-13");
  const [reason, setReason] = useState("");
  const [submittedBanner, setSubmittedBanner] = useState(false);

  const child = state.students.find((s) => s.id === selectedChildId) || state.students[0];
  const childLeaves = state.leaveApplications.filter((l) => l.studentId === child?.id);

  const handleSubmitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    submitLeaveApplication({
      studentId: child.id,
      studentName: child.fullName,
      className: `${child.className}-${child.section}`,
      leaveType,
      startDate,
      endDate,
      daysCount: 2,
      reason,
    });

    setReason("");
    setSubmittedBanner(true);
    setTimeout(() => setSubmittedBanner(false), 4000);
  };

  return (
    <PortalShell activeRole="parent">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">Student Leave Applications</h1>
          <p className="text-xs text-slate-500 mt-1">
            Submit absence requests and track approvals for {child?.fullName} (Class {child?.className}-{child?.section})
          </p>
        </div>

        {submittedBanner && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Leave application submitted successfully. Class teacher Mrs. Sunita Sharma will be notified.</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Leave Application Form */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
            <h2 className="font-heading font-bold text-base text-slate-900 mb-1">
              Apply for Leave of Absence
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Requests should be filed at least 24 hours prior except for medical emergencies.
            </p>

            <form onSubmit={handleSubmitLeave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Leave Category</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value as LeaveApplication["leaveType"])}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 outline-none focus:border-school-600"
                >
                  <option value="Sick Leave">Sick Leave / Doctor Advice</option>
                  <option value="Casual Leave">Casual / Personal Absence</option>
                  <option value="Medical Recovery">Medical Recovery / Surgery</option>
                  <option value="Family Event">Family Wedding / Function</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">From Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 outline-none focus:border-school-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">To Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 outline-none focus:border-school-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Reason for Absence <span className="text-rose-500">*</span>
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  required
                  placeholder="Explain the reason for child's absence clearly..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 outline-none focus:border-school-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-school-800 text-white font-semibold hover:bg-school-900 transition-all shadow-soft flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Leave Request</span>
              </button>
            </form>
          </div>

          {/* Past Leave History Tracker */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
            <h2 className="font-heading font-bold text-base text-slate-900 mb-1">Leave History & Status</h2>
            <p className="text-xs text-slate-500 mb-4">Past applications and sanction remarks from faculty</p>

            <div className="space-y-3">
              {childLeaves.length > 0 ? (
                childLeaves.map((leave) => (
                  <div
                    key={leave.id}
                    className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">{leave.leaveType}</span>
                      <span
                        className={cn(
                          "px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1",
                          leave.status === "Approved"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : leave.status === "Pending"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        )}
                      >
                        {leave.status === "Approved" && <CheckCircle2 className="w-3 h-3" />}
                        {leave.status === "Pending" && <Clock className="w-3 h-3" />}
                        <span>{leave.status}</span>
                      </span>
                    </div>

                    <p className="text-slate-600 text-[11px] leading-relaxed italic">
                      "{leave.reason}"
                    </p>

                    <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                      <span>
                        Dates: <strong className="text-slate-700">{leave.startDate}</strong> to <strong className="text-slate-700">{leave.endDate}</strong> ({leave.daysCount} Days)
                      </span>
                      <span>Applied: {leave.appliedDate}</span>
                    </div>

                    {leave.reviewRemarks && (
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-600">
                        <strong className="text-slate-800">Faculty Review: </strong>
                        {leave.reviewRemarks}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No leave applications recorded for this child.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

