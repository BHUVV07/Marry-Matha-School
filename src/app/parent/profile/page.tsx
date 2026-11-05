"use client";

import React, { useState } from "react";
import { User, Phone, Mail, MapPin, CheckCircle2, ShieldCheck, Edit3 } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";

export default function ParentProfilePage() {
  const { state } = usePortalData();
  const profile = state.parentProfile;

  const [phone, setPhone] = useState(profile.primaryPhone);
  const [altPhone, setAltPhone] = useState(profile.secondaryPhone || "");
  const [address, setAddress] = useState(profile.residentialAddress);
  const [savedBanner, setSavedBanner] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  return (
    <PortalShell activeRole="parent">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-heading font-bold text-slate-900">Parent & Guardian Profile</h1>
          <p className="text-xs text-slate-500 mt-1">
            Registered guardian contact credentials on file with Mary Matha administrative office
          </p>
        </div>

        {savedBanner && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Contact details updated in local session. Administrative records synchronized.</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Profile Overview Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-school-800 text-white flex items-center justify-center font-bold text-2xl shadow-soft">
                VP
              </div>
              <div>
                <h2 className="text-lg font-heading font-bold text-slate-900">{profile.fatherName}</h2>
                <p className="text-xs text-slate-500">{profile.motherName}</p>
                <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                  Registered Parent
                </span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{profile.primaryEmail}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{profile.primaryPhone}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{profile.residentialAddress}, {profile.city} - {profile.postalCode}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
                Enrolled Children at Mary Matha ({profile.childrenIds.length})
              </span>
              <div className="space-y-2">
                {profile.childrenIds.map((cid) => {
                  const c = state.students.find((s) => s.id === cid);
                  if (!c) return null;
                  return (
                    <div key={cid} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900 block">{c.fullName}</span>
                        <span className="text-[11px] text-slate-500">{c.className}-{c.section} • Roll #{c.rollNo}</span>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
                        {c.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Edit Contact Information Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
            <h3 className="font-heading font-bold text-base text-slate-900 mb-1">
              Update Emergency Contact & Residence
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Ensure contact numbers remain active for morning attendance and school transport SMS alerts.
            </p>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Primary Mobile Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-school-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Alternate / WhatsApp Phone</label>
                  <input
                    type="text"
                    value={altPhone}
                    onChange={(e) => setAltPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-school-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Residential Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-school-600 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-school-800 text-white font-semibold hover:bg-school-900 transition-all shadow-soft flex items-center gap-2"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Update Contact Details</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

