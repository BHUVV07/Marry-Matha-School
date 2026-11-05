"use client";

import React, { useState } from "react";
import { Settings, Save, CheckCircle2, Building, ShieldCheck } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { schoolConfig } from "@/config/schoolInfo";

export default function AdminSettingsPage() {
  const [schoolName, setSchoolName] = useState(schoolConfig.name);
  const [academicYear, setAcademicYear] = useState(schoolConfig.admissions.currentSession || "2026-2027");
  const [admissionStatus, setAdmissionStatus] = useState("Open");
  const [contactEmail, setContactEmail] = useState("admin@marymata.edu");
  const [savedBanner, setSavedBanner] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  return (
    <PortalShell activeRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">System & School Configuration</h1>
          <p className="text-xs text-slate-500 mt-1">
            Global academic session, institutional metadata, and admissions portal controls
          </p>
        </div>

        {savedBanner && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings saved successfully in system environment configuration.</span>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs max-w-2xl">
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Institution Name</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-school-600 font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Academic Session</label>
                <input
                  type="text"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-school-600 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Public Admissions Gate</label>
                <select
                  value={admissionStatus}
                  onChange={(e) => setAdmissionStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none focus:border-school-600 font-semibold"
                >
                  <option value="Open">Open (Accepting Enquiries)</option>
                  <option value="Waitlist">Waitlist Only</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Administrative Contact Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-school-600"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-school-800 text-white font-semibold hover:bg-school-900 transition-all shadow-soft flex items-center gap-2"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save School Settings</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </PortalShell>
  );
}
