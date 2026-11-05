"use client";

import React, { useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  FileText,
  UserCheck,
  ClipboardCheck,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  FileSpreadsheet,
  Check,
  RotateCcw,
} from "lucide-react";
import { HeroSection } from "@/components/common/HeroSection";
import { SectionHeading } from "@/components/common/SectionHeading";
import { schoolConfig } from "@/config/schoolInfo";
import { AdmissionFormData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { usePortalData } from "@/context/PortalDataContext";

const admissionSteps = [
  {
    step: "01",
    title: "Online Enquiry or Campus Visit",
    desc: "Submit your preliminary enquiry through our online portal or visit the school admissions desk during working hours.",
    icon: FileText,
  },
  {
    step: "02",
    title: "Campus Walkthrough & Interactive Dialogue",
    desc: "Tour the academic facilities, inspect laboratories, and have a friendly conversation with the academic coordinator.",
    icon: UserCheck,
  },
  {
    step: "03",
    title: "Document Verification",
    desc: "Present authentic student birth certificates, transfer certificates (where applicable), and guardian identification.",
    icon: ClipboardCheck,
  },
  {
    step: "04",
    title: "Enrolment Formalities & Welcome Kit",
    desc: "Complete registration paperwork, confirm uniform and transport schedules, and receive student orientation materials.",
    icon: CheckCircle2,
  },
];

const requiredDocuments = [
  {
    name: "Original Birth Certificate",
    subtext: "Issued by Municipal Corporation or authorized Registrar (for pre-primary & Grade 1)",
    mandatory: true,
  },
  {
    name: "Transfer Certificate (TC)",
    subtext: "Countersigned TC from the recognized previous school (for Grade 2 upwards)",
    mandatory: true,
  },
  {
    name: "Previous Academic Marksheets",
    subtext: "Report card or progress summary of the last completed academic session",
    mandatory: true,
  },
  {
    name: "Student Passport Photographs",
    subtext: "4 recent color passport-sized photographs in standard plain background",
    mandatory: true,
  },
  {
    name: "Parent / Guardian ID & Address Proof",
    subtext: "Aadhaar Card, Passport, or Voter ID copy of parents or legal guardians",
    mandatory: true,
  },
  {
    name: "Immunization & Medical Record",
    subtext: "Basic blood group certification and pediatric immunization history",
    mandatory: false,
  },
];

const faqs = [
  {
    q: "What is the age criteria for Kindergarten and Grade 1 admissions?",
    a: "In accordance with standard educational guidelines, children entering Nursery should generally be 3 years of age, Lower KG 4 years, Upper KG 5 years, and Grade 1 should have attained 6 years as of the beginning of the academic session.",
  },
  {
    q: "What curriculum or syllabus does Mary Matha School follow?",
    a: "Mary Matha School follows the Karnataka State Board (KSEAB) English-medium curriculum across Primary and Secondary grades (School Code / UDISE: 29150224207), prioritizing language fluency, foundational STEM, and moral character development.",
  },
  {
    q: "Are boarding and residential options available for students?",
    a: "Yes. In addition to day scholars, Mary Matha School provides boarding facilities overseen with personal care and discipline under the supervision of Sister Gracelin and administrative staff.",
  },
  {
    q: "What is the student-teacher ratio at Mary Matha School?",
    a: "We maintain an intimate 15:1 student-teacher ratio across our 4 core classrooms. This small ratio allows our teachers to provide continuous individualized mentorship and track each student's progress attentively.",
  },
  {
    q: "Can parents visit the campus prior to taking admission?",
    a: "Absolutely. We encourage families to schedule a campus walkthrough Monday through Friday during visiting hours (10:00 AM to 1:00 PM) by prior appointment or online enquiry.",
  },
  {
    q: "Is there any formal entrance test for young kindergarten applicants?",
    a: "No written tests are conducted for pre-primary applicants. Admissions for early years focus on age readiness and an informal, friendly interaction with the child and parents.",
  },
];

const initialFormData: AdmissionFormData = {
  studentName: "",
  dob: "",
  gender: "",
  previousSchool: "",
  previousClass: "",
  applyingClass: "",
  parentName: "",
  relationship: "Parent",
  phone: "",
  email: "",
  address: "",
  additionalMessage: "",
};

export default function AdmissionsPage() {
  const { addAdmissionEnquiry } = usePortalData();
  const [formData, setFormData] = useState<AdmissionFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof AdmissionFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<AdmissionFormData | null>(null);
  const [applicationNo, setApplicationNo] = useState<string>("");
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  const validate = () => {
    const errs: Partial<Record<keyof AdmissionFormData, string>> = {};

    if (!formData.studentName.trim()) {
      errs.studentName = "Please enter student's full name.";
    }
    if (!formData.dob) {
      errs.dob = "Please provide date of birth.";
    } else if (new Date(formData.dob) > new Date()) {
      errs.dob = "Date of birth cannot be in the future.";
    }
    if (!formData.gender) {
      errs.gender = "Please select gender.";
    }
    if (!formData.applyingClass) {
      errs.applyingClass = "Please select the class applying for.";
    }
    if (!formData.parentName.trim()) {
      errs.parentName = "Please enter parent or guardian name.";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Please enter a valid contact phone number.";
    } else {
      const digits = formData.phone.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 13) {
        errs.phone = "Please enter a valid 10-digit phone number.";
      }
    }
    if (!formData.email.trim()) {
      errs.email = "Please enter email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.address.trim()) {
      errs.address = "Please provide current residential address.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof AdmissionFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Persist into central Data Store and admissions pipeline
    const newLead = addAdmissionEnquiry({
      applicantName: formData.studentName.trim(),
      appliedClass: formData.applyingClass,
      parentName: formData.parentName.trim(),
      parentPhone: formData.phone.trim(),
      parentEmail: formData.email.trim(),
      dateOfBirth: formData.dob,
      address: formData.address.trim(),
      previousSchool: formData.previousSchool?.trim() || "Not Disclosed",
      notes: formData.additionalMessage?.trim() || "Public online admissions portal submission.",
    });

    setApplicationNo(newLead.applicationNo);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmittedData({ ...formData });

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#0284c7", "#f59e0b", "#10b981"],
        });
      } catch (err) {
        // Fallback gracefully if canvas is unavailable
      }
    }, 700);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setIsSubmitted(false);
    setSubmittedData(null);
    setErrors({});
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection
        badge={schoolConfig.admissions.statusLabel}
        title="Admissions for Academic Session 2025–26"
        subtitle="Embark on an inspiring educational journey. Discover our transparent admission procedure, eligibility guidelines, and submit an online enquiry."
        breadcrumbs={[{ label: "Admissions" }]}
        actions={
          <div className="flex flex-wrap gap-3">
            <a
              href="#enquiry-form"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-amber-400 text-school-950 hover:bg-amber-300 transition-colors shadow-soft"
            >
              <span>Submit Admission Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#process"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
            >
              <span>View 4-Step Process</span>
            </a>
          </div>
        }
      />

      {/* Session Overview Banner */}
      <section className="py-8 bg-school-50 border-b border-school-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-sm font-semibold text-school-900">
                {schoolConfig.admissions.statusLabel} — Seats available across Pre-Primary to Secondary Wing.
              </p>
            </div>
            <span className="text-xs font-mono text-school-700 bg-white px-3 py-1.5 rounded-lg border border-school-200">
              Session: {schoolConfig.admissions.currentSession}
            </span>
          </div>
        </div>
      </section>

      {/* Admission Process Overview */}
      <section id="process" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Roadmap"
            title="Our 4-Step Admission Journey"
            subtitle="Designed to be simple, respectful, and transparent for parents and guardians at every phase."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {admissionSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-soft hover:shadow-card transition-all duration-200 flex flex-col justify-between relative"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-mono font-bold text-school-600 bg-school-50 px-2.5 py-1 rounded-md border border-school-100">
                        Step {step.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-school-100/70 text-school-800 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Required Document Checklist */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Document Verification"
            title="Required Documents Checklist"
            subtitle="Please prepare the following documentation when visiting the school admissions office for enrolment."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requiredDocuments.map((doc, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft flex items-start gap-4"
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                    doc.mandatory
                      ? "bg-school-100 text-school-800"
                      : "bg-slate-100 text-slate-500"
                  )}
                >
                  <Check className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">
                      {doc.name}
                    </h3>
                    {doc.mandatory ? (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                        Mandatory
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        Optional
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {doc.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              <strong>Note on Transfer Certificates: </strong>
              For students transferring from other districts or states, countersigned transfer certificates or migration credentials will be requested in compliance with educational authority regulations.
            </p>
          </div>
        </div>
      </section>

      {/* Admission Enquiry Form Section */}
      <section id="enquiry" className="scroll-mt-20">
        <div id="enquiry-form" className="py-16 sm:py-24 bg-white scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Online Application"
            title="Submit Online Admission Enquiry"
            subtitle="Fill in student and guardian particulars below. Our admissions desk will promptly contact you to assist with next steps."
          />

          <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-10">
            {isSubmitted && submittedData ? (
              /* Success State */
              <div className="text-center py-8 space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-soft">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900">
                    Enquiry Successfully Submitted!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                    Thank you, <strong>{submittedData.parentName}</strong>. Your enquiry for <strong>{submittedData.studentName}</strong> (Applying for {submittedData.applyingClass}) has been recorded in the Mary Matha Digital Ecosystem admissions queue.
                  </p>
                </div>

                {/* Submission Snapshot */}
                <div className="bg-slate-50 rounded-2xl p-5 text-left border border-slate-200 text-xs space-y-2.5 max-w-md mx-auto">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <p className="font-bold text-slate-800">
                      Enquiry Summary:
                    </p>
                    <span className="px-2 py-0.5 rounded-full bg-school-100 text-school-800 font-mono font-bold text-[11px]">
                      {applicationNo || "ADM-2026-LIVE"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Student Name:</span>
                    <span className="font-semibold text-slate-900">{submittedData.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Class Requested:</span>
                    <span className="font-semibold text-slate-900">{submittedData.applyingClass}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Contact Phone:</span>
                    <span className="font-semibold text-slate-900">{submittedData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Email Address:</span>
                    <span className="font-semibold text-slate-900">{submittedData.email}</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 mt-2">
                    &bull; Registered into Mary Matha Admissions Pipeline. Administrator has received immediate notification for verification.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Submit Another Enquiry</span>
                  </button>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-school-700 hover:bg-school-800 text-white shadow-soft transition-colors"
                  >
                    <span>Contact Admissions Desk</span>
                  </Link>
                </div>
              </div>
            ) : (
              /* The Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="p-4 rounded-2xl bg-school-50/70 border border-school-100 text-xs text-school-900 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-school-700 shrink-0 mt-0.5" />
                  <p>
                    All submissions are processed under institutional student data protection standards. Fields marked with <span className="text-rose-500 font-bold">*</span> are required.
                  </p>
                </div>

                {/* Section 1: Student Information */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100">
                    1. Student Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="studentName"
                        className="block text-xs font-bold text-slate-700 mb-1"
                      >
                        Student Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        placeholder="e.g. Aarav Sharma"
                        aria-invalid={!!errors.studentName}
                        aria-describedby={errors.studentName ? "studentName-error" : undefined}
                        className={cn(
                          "w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2",
                          errors.studentName
                            ? "border-rose-400 focus:ring-rose-400 bg-rose-50/30"
                            : "border-slate-200 focus:ring-school-600 focus:border-school-600"
                        )}
                      />
                      {errors.studentName && (
                        <p id="studentName-error" className="text-xs text-rose-500 mt-1">{errors.studentName}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="dob"
                        className="block text-xs font-bold text-slate-700 mb-1"
                      >
                        Date of Birth <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        max={new Date().toISOString().split("T")[0]}
                        value={formData.dob}
                        onChange={handleChange}
                        aria-invalid={!!errors.dob}
                        aria-describedby={errors.dob ? "dob-error" : undefined}
                        className={cn(
                          "w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2",
                          errors.dob
                            ? "border-rose-400 focus:ring-rose-400 bg-rose-50/30"
                            : "border-slate-200 focus:ring-school-600 focus:border-school-600"
                        )}
                      />
                      {errors.dob && (
                        <p id="dob-error" className="text-xs text-rose-500 mt-1">{errors.dob}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-xs font-bold text-slate-700 mb-1"
                      >
                        Gender <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-4 py-2.5 rounded-xl border text-sm bg-white transition-all focus:outline-none focus:ring-2",
                          errors.gender
                            ? "border-rose-400 focus:ring-rose-400 bg-rose-50/30"
                            : "border-slate-200 focus:ring-school-600 focus:border-school-600"
                        )}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && (
                        <p className="text-xs text-rose-500 mt-1">{errors.gender}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="applyingClass"
                        className="block text-xs font-bold text-slate-700 mb-1"
                      >
                        Class Applying For <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="applyingClass"
                        name="applyingClass"
                        value={formData.applyingClass}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-4 py-2.5 rounded-xl border text-sm bg-white transition-all focus:outline-none focus:ring-2",
                          errors.applyingClass
                            ? "border-rose-400 focus:ring-rose-400 bg-rose-50/30"
                            : "border-slate-200 focus:ring-school-600 focus:border-school-600"
                        )}
                      >
                        <option value="">Select Applying Class</option>
                        <option value="Nursery">Pre-Primary — Nursery</option>
                        <option value="LKG">Pre-Primary — Lower KG</option>
                        <option value="UKG">Pre-Primary — Upper KG</option>
                        <option value="Grade 1">Grade 1</option>
                        <option value="Grade 2">Grade 2</option>
                        <option value="Grade 3">Grade 3</option>
                        <option value="Grade 4">Grade 4</option>
                        <option value="Grade 5">Grade 5</option>
                        <option value="Grade 6">Grade 6</option>
                        <option value="Grade 7">Grade 7</option>
                        <option value="Grade 8">Grade 8</option>
                        <option value="Grade 9">Grade 9</option>
                        <option value="Grade 10">Grade 10</option>
                      </select>
                      {errors.applyingClass && (
                        <p className="text-xs text-rose-500 mt-1">{errors.applyingClass}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="previousSchool"
                        className="block text-xs font-bold text-slate-700 mb-1"
                      >
                        Previous School (if applicable)
                      </label>
                      <input
                        type="text"
                        id="previousSchool"
                        name="previousSchool"
                        value={formData.previousSchool}
                        onChange={handleChange}
                        placeholder="Name of previous institution"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-school-600"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="previousClass"
                        className="block text-xs font-bold text-slate-700 mb-1"
                      >
                        Previous Class Completed
                      </label>
                      <input
                        type="text"
                        id="previousClass"
                        name="previousClass"
                        value={formData.previousClass}
                        onChange={handleChange}
                        placeholder="e.g. UKG or Grade 4"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-school-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Parent / Guardian Details */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100">
                    2. Parent or Guardian Details
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="parentName"
                        className="block text-xs font-bold text-slate-700 mb-1"
                      >
                        Parent / Guardian Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="parentName"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleChange}
                        placeholder="Full name of parent or guardian"
                        className={cn(
                          "w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2",
                          errors.parentName
                            ? "border-rose-400 focus:ring-rose-400 bg-rose-50/30"
                            : "border-slate-200 focus:ring-school-600 focus:border-school-600"
                        )}
                      />
                      {errors.parentName && (
                        <p className="text-xs text-rose-500 mt-1">{errors.parentName}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="relationship"
                        className="block text-xs font-bold text-slate-700 mb-1"
                      >
                        Relationship to Student
                      </label>
                      <select
                        id="relationship"
                        name="relationship"
                        value={formData.relationship}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-school-600"
                      >
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Legal Guardian">Legal Guardian</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-bold text-slate-700 mb-1"
                      >
                        Contact Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        className={cn(
                          "w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2",
                          errors.phone
                            ? "border-rose-400 focus:ring-rose-400 bg-rose-50/30"
                            : "border-slate-200 focus:ring-school-600 focus:border-school-600"
                        )}
                      />
                      {errors.phone && (
                        <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-bold text-slate-700 mb-1"
                      >
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. parent@example.com"
                        className={cn(
                          "w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2",
                          errors.email
                            ? "border-rose-400 focus:ring-rose-400 bg-rose-50/30"
                            : "border-slate-200 focus:ring-school-600 focus:border-school-600"
                        )}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-500 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-xs font-bold text-slate-700 mb-1"
                    >
                      Residential Address <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows={2}
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street address, locality, city, pin code"
                      className={cn(
                        "w-full px-4 py-2 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2",
                        errors.address
                          ? "border-rose-400 focus:ring-rose-400 bg-rose-50/30"
                          : "border-slate-200 focus:ring-school-600 focus:border-school-600"
                      )}
                    />
                    {errors.address && (
                      <p className="text-xs text-rose-500 mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="additionalMessage"
                      className="block text-xs font-bold text-slate-700 mb-1"
                    >
                      Additional Notes or Special Requirements (Optional)
                    </label>
                    <textarea
                      id="additionalMessage"
                      name="additionalMessage"
                      rows={3}
                      value={formData.additionalMessage}
                      onChange={handleChange}
                      placeholder="Mention any specific learning interests, sibling admissions, or queries for the academic coordinator..."
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-school-600"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-slate-500">
                    Submission connects to the MMPS Admissions Queue.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-school-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 transition-all duration-200 shadow-soft hover:-translate-y-0.5 focus:ring-2 focus:ring-amber-500"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-school-900 border-t-transparent rounded-full animate-spin" />
                        <span>Processing Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Admission Enquiry</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      </section>

      {/* Frequently Asked Questions (FAQ) */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Got Questions?"
            title="Frequently Asked Questions"
            subtitle="Clear answers to common queries regarding admissions, age criteria, transportation, and campus life."
          />

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = expandedFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    id={`faq-btn-${index}`}
                    onClick={() =>
                      setExpandedFaqIndex(isOpen ? null : index)
                    }
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-school-700 transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-school-600 transition-transform duration-200 shrink-0",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-btn-${index}`}
                      className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50"
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center text-xs text-slate-500">
            Have a question not listed here?{" "}
            <Link
              href="/contact"
              className="text-school-700 font-bold hover:underline"
            >
              Contact our admissions counselors directly
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

