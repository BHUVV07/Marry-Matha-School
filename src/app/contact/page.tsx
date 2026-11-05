"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageCircle,
  ArrowRight,
  Shield,
  Building,
  RotateCcw,
} from "lucide-react";
import { HeroSection } from "@/components/common/HeroSection";
import { SectionHeading } from "@/components/common/SectionHeading";
import { schoolConfig } from "@/config/schoolInfo";
import { ContactFormData } from "@/lib/types";
import { cn } from "@/lib/utils";

const initialContactData: ContactFormData = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>(initialContactData);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const validate = () => {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = "Please enter your full name.";
    }
    if (!formData.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please provide a valid email address.";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Please enter your contact number.";
    } else {
      const digits = formData.phone.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 13) {
        errs.phone = "Please enter a valid 10-digit phone number.";
      }
    }
    if (!formData.subject.trim()) {
      errs.subject = "Please select or enter the subject of enquiry.";
    }
    if (!formData.message.trim()) {
      errs.message = "Please write your message or enquiry.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleCopyAddress = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard
        .writeText(schoolConfig.contact.address.fullText)
        .then(() => {
          setCopiedAddress(true);
          setTimeout(() => setCopiedAddress(false), 2000);
        })
        .catch(() => {});
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection
        badge="Direct Communication"
        title="Contact School Administration"
        subtitle="We welcome your enquiries regarding admissions, curriculum, fee schedules, or scheduling a visit to our campus."
        breadcrumbs={[{ label: "Contact" }]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-amber-400 text-school-950 hover:bg-amber-300 transition-colors shadow-soft"
            >
              <span>Admissions Desk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
            >
              <span>Send Message</span>
            </a>
          </div>
        }
      />

      {/* Main Contact Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Get In Touch"
            title="We Are Here to Assist You"
            subtitle="Reach out via direct email, telephone, or complete the online general inquiry form below."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Official Contact Cards & Location */}
            <div className="lg:col-span-5 space-y-6">
              {/* Campus Address Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-soft space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-school-50 text-school-700 flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">
                        Campus Location
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Main Administrative Office
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="text-[11px] font-semibold text-school-700 bg-school-50 hover:bg-school-100 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    {copiedAddress ? "Copied!" : "Copy Address"}
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {schoolConfig.contact.address.fullText}
                </p>

                <div className="p-3.5 rounded-xl bg-school-50 border border-school-100 text-xs text-school-900 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-school-800">
                    <Shield className="w-3.5 h-3.5 text-school-600" />
                    <span>Institutional Registry Details</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    <strong>Head of Institution:</strong> Sister Gracelin<br />
                    <strong>School / UDISE Code:</strong> 29150224207<br />
                    <strong>Affiliation:</strong> Karnataka State Board (KSEAB) • Co-ed Day & Boarding
                  </p>
                </div>
              </div>

              {/* Telephone & Email Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-soft space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-school-50 text-school-700 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">
                      Telephone & Digital Inquiries
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      General inquiries and admissions
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                      Phone Line
                    </span>
                    <p className="font-semibold text-slate-800">
                      {schoolConfig.contact.displayPhone}
                    </p>
                    <span className="text-[11px] text-slate-400">
                      Active during office hours (Mon–Fri)
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                      Email Addresses
                    </span>
                    <a
                      href={`mailto:${schoolConfig.contact.email}`}
                      className="font-semibold text-school-700 hover:text-school-900 block break-all"
                    >
                      {schoolConfig.contact.email}
                    </a>
                    <a
                      href={`mailto:${schoolConfig.contact.admissionsEmail}`}
                      className="text-xs text-slate-600 hover:text-school-700 block break-all mt-0.5"
                    >
                      {schoolConfig.contact.admissionsEmail} (Admissions Desk)
                    </a>
                  </div>
                </div>
              </div>

              {/* Campus Working Hours */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-soft space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-school-50 text-school-700 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">
                      Hours of Operation
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      School, office, and visiting schedule
                    </p>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex justify-between pb-1.5 border-b border-slate-100">
                    <span className="font-bold text-slate-800">Student Hours:</span>
                    <span>{schoolConfig.contact.timings.schoolHours}</span>
                  </li>
                  <li className="flex justify-between pb-1.5 border-b border-slate-100">
                    <span className="font-bold text-slate-800">Office Hours:</span>
                    <span className="text-right">{schoolConfig.contact.timings.officeHours}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-bold text-slate-800">Parent Visits:</span>
                    <span className="text-right">{schoolConfig.contact.timings.visitingHours}</span>
                  </li>
                </ul>
              </div>

              {/* WhatsApp Configurable Card */}
              <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200/80 space-y-3">
                <div className="flex items-center gap-2.5 text-emerald-900">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">
                      WhatsApp Admissions Connect
                    </h3>
                    <p className="text-[11px] text-emerald-700">
                      Instant enquiry channel for mobile users
                    </p>
                  </div>
                </div>

                <p className="text-xs text-emerald-800 leading-relaxed">
                  {schoolConfig.contact.whatsApp.enabled ? (
                    "Connect with our admissions desk on WhatsApp for quick guidance."
                  ) : (
                    <span>
                      <strong>Status: </strong>
                      {schoolConfig.contact.whatsApp.phoneNumberPlaceholder}
                    </span>
                  )}
                </p>

                {schoolConfig.contact.whatsApp.enabled ? (
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      schoolConfig.contact.whatsApp.defaultMessage
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                  >
                    <span>Open WhatsApp Chat</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100/70 text-emerald-800 text-[11px] font-medium border border-emerald-200">
                    <span>Direct chat channel will be enabled soon</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Interactive General Contact Form */}
            <div id="contact-form" className="lg:col-span-7 scroll-mt-24">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card">
                <div className="mb-6 pb-4 border-b border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900">
                    Send an Institutional Message
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Have general queries or wish to request information? Complete this message form and our team will get back to you.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-10 space-y-4 animate-in fade-in duration-300">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">
                      Message Dispatched
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting <strong>{schoolConfig.name}</strong>. Your inquiry has been forwarded to the administrative desk. We usually respond within 24 business hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData(initialContactData);
                      }}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Send Another Message</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-bold text-slate-700 mb-1"
                      >
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Priya Sharma"
                        className={cn(
                          "w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2",
                          errors.fullName
                            ? "border-rose-400 focus:ring-rose-400 bg-rose-50/30"
                            : "border-slate-200 focus:ring-school-600 focus:border-school-600"
                        )}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          placeholder="name@example.com"
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

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs font-bold text-slate-700 mb-1"
                        >
                          Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="10-digit number"
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
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-xs font-bold text-slate-700 mb-1"
                      >
                        Enquiry Subject <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-4 py-2.5 rounded-xl border text-sm bg-white transition-all focus:outline-none focus:ring-2",
                          errors.subject
                            ? "border-rose-400 focus:ring-rose-400 bg-rose-50/30"
                            : "border-slate-200 focus:ring-school-600 focus:border-school-600"
                        )}
                      >
                        <option value="">Select an Enquiry Topic</option>
                        <option value="Admissions & Prospectus">Admissions & Prospectus</option>
                        <option value="Campus Tour Request">Campus Tour Request</option>
                        <option value="Academic Curriculum & Syllabus">Academic Curriculum & Syllabus</option>
                        <option value="Transport & Bus Routes">Transport & Bus Routes</option>
                        <option value="Employment & Faculty Recruitment">Employment & Faculty Recruitment</option>
                        <option value="General Administration">General Administration</option>
                      </select>
                      {errors.subject && (
                        <p className="text-xs text-rose-500 mt-1">{errors.subject}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-bold text-slate-700 mb-1"
                      >
                        Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please write your questions or comments here..."
                        className={cn(
                          "w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2",
                          errors.message
                            ? "border-rose-400 focus:ring-rose-400 bg-rose-50/30"
                            : "border-slate-200 focus:ring-school-600 focus:border-school-600"
                        )}
                      />
                      {errors.message && (
                        <p className="text-xs text-rose-500 mt-1">{errors.message}</p>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-school-700 hover:bg-school-800 disabled:opacity-60 transition-all shadow-soft"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Transmitting...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Interactive Google Map */}
              <div className="mt-8 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-school-800 font-bold text-sm">
                    <MapPin className="w-4 h-4 text-school-600" />
                    <span>Campus Geographical Locator — Barve, Ripponpet</span>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${schoolConfig.contact.address.mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-school-700 hover:text-school-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-slate-300 shadow-inner bg-slate-100">
                  <iframe
                    src="https://maps.google.com/maps?q=Mary+Matha+School+Barve+Ripponpet+Shimoga&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="300"
                    className="border-0 w-full h-[300px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mary Matha School Location Map"
                  />
                </div>
                <p className="text-[11px] text-slate-500 text-center">
                  Located at Barve along Thirthahalli Road, Ripponpet, Shimoga District, Karnataka 577426.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

