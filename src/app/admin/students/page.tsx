"use client";

import React, { useState } from "react";
import { Users, Search, Plus, Edit, Trash2, CheckCircle2, X, Filter } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";
import { Student } from "@/lib/portalTypes";

export default function AdminStudentsPage() {
  const { state, addStudent, updateStudent } = usePortalData();

  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Form fields
  const [fullName, setFullName] = useState("");
  const [className, setClassName] = useState("Class 4");
  const [section, setSection] = useState("A");
  const [rollNo, setRollNo] = useState("");
  const [admissionNo, setAdmissionNo] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | "Other">("Male");
  const [dateOfBirth, setDateOfBirth] = useState("2016-05-15");
  const [bloodGroup, setBloodGroup] = useState("B+");
  const [address, setAddress] = useState("");
  const [successBanner, setSuccessBanner] = useState("");

  const filtered = state.students.filter((s) => {
    const matchClass = classFilter === "all" || s.className === classFilter;
    const matchSearch =
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.includes(searchTerm) ||
      s.admissionNo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchClass && matchSearch;
  });

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setFullName("");
    setRollNo(String(state.students.length + 1).padStart(2, "0"));
    setAdmissionNo(`MM-2026-0${state.students.length + 10}`);
    setParentName("");
    setParentPhone("+91 98221 ");
    setParentEmail("");
    setAddress("Civil Lines, Nagpur");
    setShowAddModal(true);
  };

  const handleOpenEdit = (s: Student) => {
    setEditingStudent(s);
    setFullName(s.fullName);
    setClassName(s.className);
    setSection(s.section);
    setRollNo(s.rollNo);
    setAdmissionNo(s.admissionNo);
    setParentName(s.parentName);
    setParentPhone(s.parentPhone);
    setParentEmail(s.parentEmail);
    setGender(s.gender);
    setDateOfBirth(s.dateOfBirth);
    setBloodGroup(s.bloodGroup);
    setAddress(s.address);
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    if (editingStudent) {
      updateStudent(editingStudent.id, {
        fullName,
        firstName: fullName.split(" ")[0],
        lastName: fullName.split(" ").slice(1).join(" ") || "Student",
        className,
        section,
        rollNo,
        admissionNo,
        parentName,
        parentPhone,
        parentEmail,
        gender,
        dateOfBirth,
        bloodGroup,
        address,
      });
      setSuccessBanner(`Student record for ${fullName} updated successfully!`);
    } else {
      addStudent({
        fullName,
        firstName: fullName.split(" ")[0],
        lastName: fullName.split(" ").slice(1).join(" ") || "Student",
        className,
        section,
        rollNo,
        admissionNo,
        classId: className === "Class 1" ? "cls-1b" : "cls-4a",
        parentId: "parent-custom",
        parentName,
        parentPhone,
        parentEmail,
        gender,
        dateOfBirth,
        bloodGroup,
        address,
        emergencyContact: parentPhone,
        busRoute: "Route 1",
        house: "St. Gabriel (Blue)",
        attendancePercentage: 100,
        photoUrl: "",
        enrolledDate: new Date().toISOString().split("T")[0],
        status: "Active",
      });
      setSuccessBanner(`New student ${fullName} registered into ${className}-${section}!`);
    }

    setShowAddModal(false);
    setTimeout(() => setSuccessBanner(""), 4000);
  };

  return (
    <PortalShell activeRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">Student Directory & Registry</h1>
            <p className="text-xs text-slate-500 mt-1">
              Enroll, update, and manage official student admissions at Mary Matha Primary School
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-school-800 text-white hover:bg-school-900 shadow-soft self-start"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Student</span>
          </button>
        </div>

        {successBanner && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successBanner}</span>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, roll no, or admission no..."
              className="w-full text-xs outline-none text-slate-800 placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-xl px-3 py-1.5 bg-white text-slate-700 outline-none focus:border-school-600"
            >
              <option value="all">All Classes</option>
              <option value="Class 1">Class 1</option>
              <option value="Class 4">Class 4</option>
              <option value="Class 5">Class 5</option>
              <option value="Class 8">Class 8</option>
            </select>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-base text-slate-900">
              Enrolled Students ({filtered.length})
            </h2>
            <span className="text-xs text-slate-400 font-mono">Total Institutional Strength: 480</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
                  <th className="py-3 px-4 rounded-l-xl">Adm No</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Class & Sec</th>
                  <th className="py-3 px-4">Roll No</th>
                  <th className="py-3 px-4">Guardian / Phone</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-school-800">{s.admissionNo}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block">{s.fullName}</span>
                      <span className="text-[11px] text-slate-400">{s.gender} • {s.bloodGroup}</span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{s.className}-{s.section}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">#{s.rollNo}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-slate-800 font-medium block">{s.parentName}</span>
                      <span className="text-[11px] font-mono text-slate-400">{s.parentPhone}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(s)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-school-800 hover:bg-slate-100 transition-colors"
                        title="Edit Student"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add / Edit Student Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-200 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-heading font-bold text-base text-slate-900">
                  {editingStudent ? "Edit Student Details" : "Register New Student"}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Student Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="e.g. Neil Sharma"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-school-600"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Class</label>
                    <select
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none focus:border-school-600"
                    >
                      <option value="Class 1">Class 1</option>
                      <option value="Class 4">Class 4</option>
                      <option value="Class 5">Class 5</option>
                      <option value="Class 8">Class 8</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Section</label>
                    <select
                      value={section}
                      onChange={(e) => setSection(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none focus:border-school-600"
                    >
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Roll Number</label>
                    <input
                      type="text"
                      value={rollNo}
                      onChange={(e) => setRollNo(e.target.value)}
                      required
                      placeholder="e.g. 15"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-slate-900 outline-none focus:border-school-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Admission Number</label>
                    <input
                      type="text"
                      value={admissionNo}
                      onChange={(e) => setAdmissionNo(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-slate-900 outline-none focus:border-school-600"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-school-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Parent / Guardian Name</label>
                    <input
                      type="text"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      required
                      placeholder="e.g. Mr. Anil Sharma"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-school-600"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Guardian Phone Number</label>
                    <input
                      type="text"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-school-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Residential Address</label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-school-600 resize-none"
                  />
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
                    {editingStudent ? "Save Changes" : "Confirm Registration"}
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

