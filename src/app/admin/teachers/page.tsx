"use client";

import React, { useState } from "react";
import { UserCheck, Search, Plus, Mail, Phone, BookOpen, X, CheckCircle2 } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";
import { Teacher } from "@/lib/portalTypes";

export default function AdminTeachersPage() {
  const { state, addTeacher } = usePortalData();

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("Languages & Humanities");
  const [designation, setDesignation] = useState("Assistant Faculty");
  const [qualification, setQualification] = useState("M.A., B.Ed.");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+91 98230 ");
  const [successBanner, setSuccessBanner] = useState("");

  const filtered = state.teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const empId = `MM-FAC-0${state.teachers.length + 115}`;
    addTeacher({
      employeeId: empId,
      name,
      email: email || `${name.toLowerCase().replace(/\s+/g, ".")}@marymata.edu`,
      phone,
      designation,
      department,
      qualification,
      experienceYears: 5,
      subjects: ["General Curriculum"],
      assignedClasses: ["Class 3-A"],
      photoUrl: "",
      status: "Active",
    });

    setShowAddModal(false);
    setName("");
    setEmail("");
    setSuccessBanner(`Faculty profile for ${name} created successfully (${empId})!`);
    setTimeout(() => setSuccessBanner(""), 4000);
  };

  return (
    <PortalShell activeRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">Faculty & Staff Directory</h1>
            <p className="text-xs text-slate-500 mt-1">
              Active academic teachers, coordinators, and administrative officers
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-school-800 text-white hover:bg-school-900 shadow-soft self-start"
          >
            <Plus className="w-4 h-4" />
            <span>Add Faculty Member</span>
          </button>
        </div>

        {successBanner && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successBanner}</span>
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search faculty by name, department, or employee code..."
            className="w-full text-xs outline-none text-slate-800 placeholder:text-slate-400"
          />
        </div>

        {/* Teachers Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
                  <th className="py-3 px-4 rounded-l-xl">Emp ID</th>
                  <th className="py-3 px-4">Faculty Name</th>
                  <th className="py-3 px-4">Department & Role</th>
                  <th className="py-3 px-4">Qualification</th>
                  <th className="py-3 px-4">Official Contact</th>
                  <th className="py-3 px-4 rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-school-800">{t.employeeId}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block">{t.name}</span>
                      <span className="text-[11px] text-slate-400">{t.designation}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-800 block">{t.department}</span>
                      <span className="text-[11px] text-slate-400">
                        {t.isClassTeacherOf ? `CT: ${t.isClassTeacherOf}` : "Subject Teacher"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">{t.qualification}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-slate-800 block">{t.phone}</span>
                      <span className="text-[11px] text-slate-400">{t.email}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-heading font-bold text-base text-slate-900">Add Faculty Member</h3>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAdd} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="e.g. Mrs. Anjali Deshpande"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-school-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Department</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none focus:border-school-600"
                    >
                      <option value="Primary Mathematics">Primary Mathematics</option>
                      <option value="Languages & Humanities">Languages & Humanities</option>
                      <option value="General Science">General Science</option>
                      <option value="Early Childhood & Primary">Early Childhood</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Designation</label>
                    <input
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-school-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Qualification</label>
                    <input
                      type="text"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-school-600"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-school-600"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl font-semibold bg-school-800 text-white hover:bg-school-900 shadow-soft"
                  >
                    Register Teacher
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PortalShell>
  );
}

