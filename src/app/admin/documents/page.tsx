"use client";

import React, { useState } from "react";
import {
  FolderOpen,
  FileText,
  Download,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Filter,
  Search,
  UploadCloud,
  FileSpreadsheet,
  AlertCircle,
  Eye,
  Plus,
} from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";
import { SchoolDocument } from "@/lib/portalTypes";
import { cn } from "@/lib/utils";

export default function AdminDocumentsPage() {
  const { state } = usePortalData();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [previewDoc, setPreviewDoc] = useState<SchoolDocument | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Form state
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<SchoolDocument["category"]>("Academic");
  const [newFormat, setNewFormat] = useState<SchoolDocument["format"]>("PDF");
  const [newDesc, setNewDesc] = useState("");
  const [newClassification, setNewClassification] =
    useState<SchoolDocument["accessClassification"]>("Internal Staff Only");

  const docs = state.documents || [];

  const filteredDocs = docs.filter((d) => {
    const matchSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.relatedStudentName && d.relatedStudentName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchCat = selectedCategory === "all" || d.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    // Simulate addition to document repository
    const mockDoc: SchoolDocument = {
      id: `sdoc-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      size: "1.2 MB",
      format: newFormat,
      description: newDesc || "Archived institutional file record.",
      uploadDate: new Date().toISOString().split("T")[0],
      uploadedBy: "Sister Agnes D'Souza (Admin)",
      status: "Verified",
      accessClassification: newClassification,
    };

    state.documents.unshift(mockDoc);
    setUploadSuccess(true);
    setShowUploadModal(false);
    setNewTitle("");
    setNewDesc("");
    setTimeout(() => setUploadSuccess(false), 4000);
  };

  return (
    <PortalShell activeRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">
              Institutional Document Vault & Student Records
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Centralized repository for institutional policies, compliance certificates, and student KYC archives
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-school-800 text-white hover:bg-school-900 shadow-soft self-start transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        </div>

        {uploadSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Document registered successfully into the institutional archive with SHA-256 integrity hash.</span>
          </div>
        )}

        {/* Info Banner */}
        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs text-sky-900 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
          <p>
            <strong>Data Privacy & Security Standards:</strong> Student KYC certificates (Birth certificates, Aadhaar cards, medical declarations) are non-sensitive mock placeholders for demonstration. In production, files are securely encrypted at rest via private Cloud Storage buckets with signed URL access controls.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search document title, keyword, or student name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-school-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-2 px-3 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-school-600"
            >
              <option value="all">All Categories ({docs.length})</option>
              <option value="Academic">Academic</option>
              <option value="Policy">Policy & Handbook</option>
              <option value="Student Record">Student Record / KYC</option>
              <option value="Health & Safety">Health & Safety</option>
              <option value="Logistics">Logistics & Fleet</option>
            </select>
          </div>
        </div>

        {/* Document Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50/80 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Document Title & Details</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Associated Entity</th>
                  <th className="py-3.5 px-4">Access Classification</th>
                  <th className="py-3.5 px-4">Upload Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDocs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      No documents match the current search or category filter.
                    </td>
                  </tr>
                ) : (
                  filteredDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-school-50 text-school-700 flex items-center justify-center shrink-0 mt-0.5">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{doc.title}</div>
                            <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                              <span>{doc.format} • {doc.size}</span>
                              <span>• Uploaded by {doc.uploadedBy}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px]">
                          {doc.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {doc.relatedStudentName ? (
                          <span className="font-medium text-school-800">
                            {doc.relatedStudentName}
                          </span>
                        ) : (
                          <span className="text-slate-400">Institution-Wide</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-medium",
                            doc.accessClassification === "Confidential Administrative"
                              ? "bg-rose-100 text-rose-800"
                              : doc.accessClassification === "Internal Staff Only"
                              ? "bg-amber-100 text-amber-800"
                              : doc.accessClassification === "Parents & Students"
                              ? "bg-sky-100 text-sky-800"
                              : "bg-emerald-100 text-emerald-800"
                          )}
                        >
                          {doc.accessClassification}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                        {doc.uploadDate}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{doc.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setPreviewDoc(doc)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                            title="Inspect Document Metadata"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              alert(
                                `[Demo Download] Opening verified PDF for "${doc.title}". In production, authenticated pre-signed Cloud Storage URL is generated.`
                              )
                            }
                            className="p-1.5 rounded-lg text-school-600 hover:text-school-900 hover:bg-school-50"
                            title="Download File"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inspect Modal */}
        {previewDoc && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-card border border-slate-200 max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-school-600" />
                  <h3 className="font-heading font-bold text-slate-900 text-sm">
                    Document Metadata & Verification
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  className="text-slate-400 hover:text-slate-700 text-lg leading-none"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Document Name</span>
                  <p className="font-semibold text-slate-800">{previewDoc.title}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Description & Scope</span>
                  <p className="text-slate-600 leading-relaxed">{previewDoc.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Category</span>
                    <span className="font-medium text-slate-800">{previewDoc.category}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Access Scope</span>
                    <span className="font-medium text-slate-800">{previewDoc.accessClassification}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Format / Size</span>
                    <span className="font-medium text-slate-800">{previewDoc.format} ({previewDoc.size})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Verified By</span>
                    <span className="font-medium text-slate-800">{previewDoc.uploadedBy}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert(`Downloading "${previewDoc.title}"...`);
                    setPreviewDoc(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-school-800 text-white hover:bg-school-900 inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Verified PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-card border border-slate-200 max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <UploadCloud className="w-5 h-5 text-school-600" />
                  <h3 className="font-heading font-bold text-slate-900 text-sm">
                    Upload & Archive New Document
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="text-slate-400 hover:text-slate-700 text-lg leading-none"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleSimulateUpload} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Document Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CBSE Affiliation Extension Certificate 2026–2031"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-school-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as SchoolDocument["category"])}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-school-600"
                    >
                      <option value="Academic">Academic</option>
                      <option value="Policy">Policy</option>
                      <option value="Health & Safety">Health & Safety</option>
                      <option value="Administrative">Administrative</option>
                      <option value="Logistics">Logistics</option>
                      <option value="Student Record">Student Record</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Access Level</label>
                    <select
                      value={newClassification}
                      onChange={(e) =>
                        setNewClassification(
                          e.target.value as SchoolDocument["accessClassification"]
                        )
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-school-600"
                    >
                      <option value="Public">Public</option>
                      <option value="Parents & Students">Parents & Students</option>
                      <option value="Internal Staff Only">Internal Staff Only</option>
                      <option value="Confidential Administrative">Confidential Administrative</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Provide notes or verification summary..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-school-600"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-school-800 text-white hover:bg-school-900 inline-flex items-center gap-1.5"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload & Register</span>
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

