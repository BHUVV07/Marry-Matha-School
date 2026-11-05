"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Users, Search, CreditCard, CheckCircle2, Clock, Filter } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalData } from "@/context/PortalDataContext";
import { cn } from "@/lib/utils";

export default function AccountantStudentFeesPage() {
  const { state } = usePortalData();
  const [searchTerm, setSearchTerm] = useState("");

  const studentsWithFees = state.students.map((s) => {
    const invoices = state.feeInvoices.filter((i) => i.studentId === s.id);
    const totalBilled = invoices.reduce((acc, curr) => acc + curr.totalAmount, 0) || 24000;
    const totalPaid = invoices.reduce((acc, curr) => acc + curr.paidAmount, 0) || (s.id === "rohan-patel" ? 14000 : 24000);
    const balanceDue = invoices.reduce((acc, curr) => acc + curr.balanceDue, 0) || (s.id === "rohan-patel" ? 4000 : 0);
    const status = balanceDue === 0 ? "Paid" : totalPaid > 0 ? "Partial" : "Overdue";

    return {
      student: s,
      invoices,
      totalBilled,
      totalPaid,
      balanceDue,
      status,
    };
  });

  const filtered = studentsWithFees.filter(
    (item) =>
      item.student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.student.className.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PortalShell activeRole="accountant">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">Student Fee Ledger & Dues</h1>
            <p className="text-xs text-slate-500 mt-1">
              Individual student account balances, paid sums, and overdue status
            </p>
          </div>

          <Link
            href="/accountant/payments"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-school-800 text-white hover:bg-school-900 shadow-soft self-start flex items-center gap-1.5"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Counter Payment Desk &rarr;</span>
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by student name, admission number, or class..."
            className="w-full text-xs outline-none text-slate-800 placeholder:text-slate-400"
          />
        </div>

        {/* Ledger Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
                  <th className="py-3 px-4 rounded-l-xl">Adm No</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Total Billed</th>
                  <th className="py-3 px-4">Total Paid</th>
                  <th className="py-3 px-4">Balance Pending</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Counter Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.student.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-school-800">
                      {item.student.admissionNo}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{item.student.fullName}</td>
                    <td className="py-3.5 px-4 text-slate-700">{item.student.className}-{item.student.section}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-900">₹{item.totalBilled.toLocaleString()}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">
                      ₹{item.totalPaid.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-700">
                      ₹{item.balanceDue.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={cn(
                          "px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1",
                          item.status === "Paid"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : item.status === "Partial"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        )}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/accountant/payments?studentId=${item.student.id}`}
                        className="font-semibold text-school-700 hover:text-school-900"
                      >
                        Record Fee &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

