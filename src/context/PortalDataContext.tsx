"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Student,
  ParentProfile,
  Teacher,
  ClassSection,
  TimetablePeriod,
  AttendanceRecord,
  AttendanceStatus,
  HomeworkItem,
  HomeworkSubmission,
  Examination,
  ExamScheduleItem,
  StudentExamResult,
  FeeStructure,
  FeeInvoice,
  FeePayment,
  AdmissionEnquiry,
  AdmissionPipelineStage,
  Announcement,
  LeaveApplication,
  StudyMaterial,
  NotificationItem,
  SchoolDocument,
} from "@/lib/portalTypes";
import {
  PortalState,
  getInitialPortalState,
  savePortalState,
  initialStudents,
  initialParentProfile,
  initialTeachers,
  initialClasses,
  initialTimetable,
  initialAttendanceRecords,
  initialHomework,
  initialHomeworkSubmissions,
  initialExaminations,
  initialExamSchedules,
  initialExamResults,
  initialFeeStructures,
  initialFeeInvoices,
  initialFeePayments,
  initialAdmissions,
  initialAnnouncements,
  initialLeaveApplications,
  initialStudyMaterials,
  initialNotifications,
  initialSchoolDocuments,
} from "@/lib/portalDataStore";

export interface CurrentPeriodInfo {
  periodNumber: number;
  label: string;
  timeSlot: string;
  subject: string;
  teacherName: string;
  roomNumber: string;
  isBreak: boolean;
  status: "Active" | "Upcoming" | "Completed" | "After Hours";
}

interface PortalDataContextType {
  state: PortalState;
  // Mutators
  markAttendance: (
    classId: string,
    date: string,
    records: { studentId: string; studentName: string; status: AttendanceStatus; remarks?: string }[]
  ) => void;
  createHomework: (
    hw: Omit<HomeworkItem, "id" | "submissionCount" | "totalStudents" | "status">
  ) => void;
  submitHomework: (homeworkId: string, studentId: string, notes?: string, fileName?: string) => void;
  recordFeePayment: (payment: {
    invoiceId: string;
    studentId: string;
    studentName: string;
    className: string;
    amountPaid: number;
    paymentMethod: FeePayment["paymentMethod"];
    transactionRef: string;
    cashierName: string;
    notes?: string;
  }) => FeePayment;
  addAdmissionEnquiry: (
    enquiry: Omit<AdmissionEnquiry, "id" | "applicationNo" | "applicationDate" | "status">
  ) => AdmissionEnquiry;
  updateAdmissionStatus: (id: string, stage: AdmissionPipelineStage) => void;
  enrollApplicant: (id: string) => void;
  saveExamMarks: (
    examId: string,
    subject: string,
    marksList: { studentId: string; marksObtained: number; remarks: string }[]
  ) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  submitLeaveApplication: (
    leave: Omit<LeaveApplication, "id" | "status" | "appliedDate">
  ) => void;
  updateLeaveStatus: (leaveId: string, status: "Approved" | "Rejected", remarks?: string) => void;
  addAnnouncement: (ann: Omit<Announcement, "id">) => void;
  addStudent: (student: Omit<Student, "id">) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  addTeacher: (teacher: Omit<Teacher, "id">) => void;
  resetDemoData: () => void;
  // Live Period simulation
  simulatedPeriod: number | null;
  setSimulatedPeriod: (p: number | null) => void;
  getCurrentPeriodInfo: (classId?: string) => CurrentPeriodInfo;
}

const PortalDataContext = createContext<PortalDataContextType | undefined>(undefined);

export const PortalDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PortalState>(() => getInitialPortalState());
  const [simulatedPeriod, setSimulatedPeriod] = useState<number | null>(3); // Default to Period 3 for rich demo!

  useEffect(() => {
    savePortalState(state);
  }, [state]);

  const markAttendance = (
    classId: string,
    date: string,
    records: { studentId: string; studentName: string; status: AttendanceStatus; remarks?: string }[]
  ) => {
    setState((prev) => {
      // Remove any existing records for this class and date
      const filtered = prev.attendanceRecords.filter(
        (r) => !(r.classId === classId && r.date === date)
      );

      const newRecords: AttendanceRecord[] = records.map((rec, idx) => ({
        id: `att-${Date.now()}-${idx}`,
        date,
        studentId: rec.studentId,
        studentName: rec.studentName,
        classId,
        section: "A",
        status: rec.status,
        markedByTeacherId: "teacher-001",
        remarks: rec.remarks,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }));

      const className = classId === "cls-4a" ? "Class 4-A" : "Class 1-B";
      const newNotifs: NotificationItem[] = [
        {
          id: `notif-${Date.now()}-att-p`,
          title: "Daily Attendance Synchronized",
          message: `Attendance register for ${className} on ${date} has been updated. Status confirmed.`,
          category: "attendance",
          timestamp: "Just now",
          targetRole: "parent",
          read: false,
          deliveryChannel: "In-App System Alert",
        },
        {
          id: `notif-${Date.now()}-att-adm`,
          title: "Attendance Register Completed",
          message: `${records.length} students recorded for ${className} by faculty.`,
          category: "attendance",
          timestamp: "Just now",
          targetRole: "admin",
          read: false,
          deliveryChannel: "In-App System Alert",
        },
      ];

      return {
        ...prev,
        attendanceRecords: [...newRecords, ...filtered],
        notifications: [...newNotifs, ...prev.notifications],
      };
    });
  };

  const createHomework = (
    hw: Omit<HomeworkItem, "id" | "submissionCount" | "totalStudents" | "status">
  ) => {
    setState((prev) => {
      const targetClass = prev.classes.find((c) => c.id === hw.classId);
      const newHw: HomeworkItem = {
        ...hw,
        id: `hw-${Date.now()}`,
        submissionCount: 0,
        totalStudents: targetClass ? targetClass.enrolledCount : 36,
        status: "Active",
      };

      const newNotifs: NotificationItem[] = [
        {
          id: `notif-${Date.now()}-hw-s`,
          title: `New Homework: ${hw.subject}`,
          message: `${hw.title} assigned to ${hw.className}. Due date: ${hw.dueDate}.`,
          category: "homework",
          timestamp: "Just now",
          targetRole: "student",
          read: false,
          deliveryChannel: "In-App System Alert",
        },
        {
          id: `notif-${Date.now()}-hw-p`,
          title: `New Homework Assigned: ${hw.subject}`,
          message: `${hw.title} is now active for your ward. Due date: ${hw.dueDate}.`,
          category: "homework",
          timestamp: "Just now",
          targetRole: "parent",
          read: false,
          deliveryChannel: "In-App System Alert",
        },
      ];

      return {
        ...prev,
        homework: [newHw, ...prev.homework],
        notifications: [...newNotifs, ...prev.notifications],
      };
    });
  };

  const submitHomework = (
    homeworkId: string,
    studentId: string,
    notes?: string,
    fileName?: string
  ) => {
    setState((prev) => {
      const student = prev.students.find((s) => s.id === studentId);
      const studentName = student ? student.fullName : "Enrolled Student";

      const existingIndex = prev.homeworkSubmissions.findIndex(
        (s) => s.homeworkId === homeworkId && s.studentId === studentId
      );

      let updatedSubmissions = [...prev.homeworkSubmissions];
      if (existingIndex >= 0) {
        updatedSubmissions[existingIndex] = {
          ...updatedSubmissions[existingIndex],
          submissionDate: new Date().toISOString().split("T")[0],
          status: "Submitted",
          notes: notes || updatedSubmissions[existingIndex].notes,
          fileName: fileName || updatedSubmissions[existingIndex].fileName,
        };
      } else {
        const newSub: HomeworkSubmission = {
          id: `sub-${Date.now()}`,
          homeworkId,
          studentId,
          studentName,
          submissionDate: new Date().toISOString().split("T")[0],
          status: "Submitted",
          notes: notes || "Homework submitted through online portal.",
          fileName: fileName || "Homework_Submission.pdf",
        };
        updatedSubmissions = [newSub, ...updatedSubmissions];
      }

      // Increment submission count in homework item
      const updatedHomework = prev.homework.map((h) => {
        if (h.id === homeworkId) {
          return {
            ...h,
            submissionCount: Math.min(h.totalStudents, h.submissionCount + 1),
          };
        }
        return h;
      });

      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}-sub`,
        title: "Homework Submitted by Student",
        message: `${studentName} turned in assignment for review.`,
        category: "homework",
        timestamp: "Just now",
        targetRole: "teacher",
        read: false,
        deliveryChannel: "In-App System Alert",
      };

      return {
        ...prev,
        homework: updatedHomework,
        homeworkSubmissions: updatedSubmissions,
        notifications: [newNotif, ...prev.notifications],
      };
    });
  };

  const recordFeePayment = (payment: {
    invoiceId: string;
    studentId: string;
    studentName: string;
    className: string;
    amountPaid: number;
    paymentMethod: FeePayment["paymentMethod"];
    transactionRef: string;
    cashierName: string;
    notes?: string;
  }): FeePayment => {
    const receiptNo = `MMPS-2026-REC-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPayment: FeePayment = {
      id: `pay-${Date.now()}`,
      receiptNo,
      invoiceId: payment.invoiceId,
      studentId: payment.studentId,
      studentName: payment.studentName,
      className: payment.className,
      amountPaid: payment.amountPaid,
      paymentDate: new Date().toISOString().split("T")[0],
      paymentMethod: payment.paymentMethod,
      transactionRef: payment.transactionRef || `OFFLINE-${Math.floor(100000 + Math.random() * 900000)}`,
      cashierName: payment.cashierName || "Mr. John Fernandes",
      notes: payment.notes || "Offline Counter Settlement",
      status: "Verified",
    };

    setState((prev) => {
      // Update the invoice
      const updatedInvoices = prev.feeInvoices.map((inv) => {
        if (inv.id === payment.invoiceId) {
          const newPaid = inv.paidAmount + payment.amountPaid;
          const newBalance = Math.max(0, inv.totalAmount - newPaid);
          const newStatus: FeeInvoice["status"] =
            newBalance === 0 ? "Paid" : newPaid > 0 ? "Partial" : "Unpaid";
          return {
            ...inv,
            paidAmount: newPaid,
            balanceDue: newBalance,
            status: newStatus,
          };
        }
        return inv;
      });

      const newNotifs: NotificationItem[] = [
        {
          id: `notif-${Date.now()}-fee-p`,
          title: "Fee Payment Verified & Receipt Issued",
          message: `₹${payment.amountPaid.toLocaleString()} credited for ${payment.studentName}. Receipt #${receiptNo} generated.`,
          category: "fees",
          timestamp: "Just now",
          targetRole: "parent",
          read: false,
          deliveryChannel: "Simulated External Notification (SMS/Email dispatched)",
        },
        {
          id: `notif-${Date.now()}-fee-acc`,
          title: "Payment Credited to Ledger",
          message: `₹${payment.amountPaid.toLocaleString()} recorded for ${payment.studentName} (${payment.paymentMethod}).`,
          category: "fees",
          timestamp: "Just now",
          targetRole: "accountant",
          read: false,
          deliveryChannel: "In-App System Alert",
        },
      ];

      return {
        ...prev,
        feeInvoices: updatedInvoices,
        feePayments: [newPayment, ...prev.feePayments],
        notifications: [...newNotifs, ...prev.notifications],
      };
    });

    return newPayment;
  };

  const addAdmissionEnquiry = (
    enquiry: Omit<AdmissionEnquiry, "id" | "applicationNo" | "applicationDate" | "status">
  ): AdmissionEnquiry => {
    const count = state.admissions.length + 1;
    const appNo = `ADM-2026-${String(count).padStart(3, "0")}`;
    const newEnquiry: AdmissionEnquiry = {
      ...enquiry,
      id: `adm-${Date.now()}`,
      applicationNo: appNo,
      applicationDate: new Date().toISOString().split("T")[0],
      status: "New",
    };

    setState((prev) => ({
      ...prev,
      admissions: [newEnquiry, ...prev.admissions],
      notifications: [
        {
          id: `notif-${Date.now()}-adm`,
          title: "New Public Admission Lead",
          message: `${enquiry.applicantName} registered for ${enquiry.appliedClass}. Contact: ${enquiry.parentPhone}.`,
          category: "admission",
          timestamp: "Just now",
          targetRole: "admin",
          read: false,
          deliveryChannel: "In-App System Alert",
        },
        {
          id: `notif-${Date.now()}-prin`,
          title: "Admissions Pipeline Update",
          message: `${enquiry.applicantName} submitted enquiry for ${enquiry.appliedClass}.`,
          category: "admission",
          timestamp: "Just now",
          targetRole: "principal",
          read: false,
          deliveryChannel: "In-App System Alert",
        },
        ...prev.notifications,
      ],
    }));

    return newEnquiry;
  };

  const updateAdmissionStatus = (id: string, stage: AdmissionPipelineStage) => {
    setState((prev) => ({
      ...prev,
      admissions: prev.admissions.map((adm) => (adm.id === id ? { ...adm, status: stage } : adm)),
    }));
  };

  const enrollApplicant = (id: string) => {
    setState((prev) => {
      const applicant = prev.admissions.find((a) => a.id === id);
      if (!applicant) return prev;

      // Update status to Enrolled
      const updatedAdmissions = prev.admissions.map((a) =>
        a.id === id ? { ...a, status: "Enrolled" as AdmissionPipelineStage } : a
      );

      // Check if student already created
      const exists = prev.students.some((s) => s.fullName === applicant.applicantName);
      if (exists) {
        return { ...prev, admissions: updatedAdmissions };
      }

      const rollNum = String(prev.students.length + 1).padStart(2, "0");
      const isLinkedToDemoParent = applicant.parentPhone.includes("98220");
      const parentId = isLinkedToDemoParent ? "parent-001" : `parent-${Date.now()}`;

      const newStudent: Student = {
        id: `student-${Date.now()}`,
        admissionNo: `MM-2026-0${rollNum}`,
        rollNo: rollNum,
        firstName: applicant.applicantName.split(" ")[0] || "Enrolled",
        lastName: applicant.applicantName.split(" ").slice(1).join(" ") || "Student",
        fullName: applicant.applicantName,
        classId: "cls-4a",
        className: applicant.appliedClass,
        section: "A",
        dateOfBirth: applicant.dateOfBirth || "2016-05-15",
        gender: "Male",
        bloodGroup: "B+",
        parentId,
        parentName: applicant.parentName,
        parentPhone: applicant.parentPhone,
        parentEmail: applicant.parentEmail,
        address: applicant.address || "Civil Lines, Nagpur",
        emergencyContact: applicant.parentPhone,
        busRoute: "Route 1",
        house: "St. Gabriel (Blue)",
        attendancePercentage: 100,
        photoUrl: "",
        enrolledDate: new Date().toISOString().split("T")[0],
        status: "Active",
      };

      const updatedParent = isLinkedToDemoParent
        ? {
            ...prev.parentProfile,
            childrenIds: [...prev.parentProfile.childrenIds, newStudent.id],
          }
        : prev.parentProfile;

      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}-enr`,
        title: "Student Enrolled into Class 4-A",
        message: `${newStudent.fullName} officially enrolled with Admission #${newStudent.admissionNo}.`,
        category: "admission",
        timestamp: "Just now",
        targetRole: "admin",
        read: false,
        deliveryChannel: "In-App System Alert",
      };

      return {
        ...prev,
        admissions: updatedAdmissions,
        students: [newStudent, ...prev.students],
        parentProfile: updatedParent,
        notifications: [newNotif, ...prev.notifications],
      };
    });
  };

  const saveExamMarks = (
    examId: string,
    subject: string,
    marksList: { studentId: string; marksObtained: number; remarks: string }[]
  ) => {
    setState((prev) => {
      const exam = prev.examinations.find((e) => e.id === examId);
      const examTitle = exam ? exam.title : "Term Assessment";

      const getGrade = (marks: number) => {
        if (marks >= 90) return "A+";
        if (marks >= 80) return "A";
        if (marks >= 70) return "B+";
        if (marks >= 60) return "B";
        if (marks >= 50) return "C";
        return "D";
      };

      const remaining = prev.examResults.filter(
        (r) => !(r.examId === examId && r.subject === subject)
      );

      const newResults: StudentExamResult[] = marksList.map((m, idx) => {
        const student = prev.students.find((s) => s.id === m.studentId);
        return {
          id: `res-${Date.now()}-${idx}`,
          examId,
          examTitle,
          studentId: m.studentId,
          studentName: student ? student.fullName : "Student",
          classId: student ? student.classId : "cls-4a",
          subject,
          marksObtained: m.marksObtained,
          maxMarks: 100,
          grade: getGrade(m.marksObtained),
          remarks: m.remarks,
        };
      });

      const newNotifs: NotificationItem[] = [
        {
          id: `notif-${Date.now()}-res-p`,
          title: "Examination Scores Published",
          message: `${subject} marks recorded for Class 4-A. Report cards updated.`,
          category: "grade",
          timestamp: "Just now",
          targetRole: "parent",
          read: false,
          deliveryChannel: "In-App System Alert",
        },
        {
          id: `notif-${Date.now()}-res-s`,
          title: "New Exam Grades Published",
          message: `Your score for ${subject} has been recorded. Check your Results tab.`,
          category: "grade",
          timestamp: "Just now",
          targetRole: "student",
          read: false,
          deliveryChannel: "In-App System Alert",
        },
      ];

      return {
        ...prev,
        examResults: [...newResults, ...remaining],
        notifications: [...newNotifs, ...prev.notifications],
      };
    });
  };

  const markNotificationAsRead = (id: string) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
  };

  const clearNotifications = () => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, read: true })),
    }));
  };

  const submitLeaveApplication = (
    leave: Omit<LeaveApplication, "id" | "status" | "appliedDate">
  ) => {
    setState((prev) => {
      const newLeave: LeaveApplication = {
        ...leave,
        id: `leave-${Date.now()}`,
        status: "Pending",
        appliedDate: new Date().toISOString().split("T")[0],
      };
      return {
        ...prev,
        leaveApplications: [newLeave, ...prev.leaveApplications],
      };
    });
  };

  const updateLeaveStatus = (
    leaveId: string,
    status: "Approved" | "Rejected",
    remarks?: string
  ) => {
    setState((prev) => ({
      ...prev,
      leaveApplications: prev.leaveApplications.map((l) =>
        l.id === leaveId
          ? {
              ...l,
              status,
              reviewRemarks: remarks || `Leave ${status.toLowerCase()} by class teacher.`,
              reviewedBy: "Mrs. Sunita Sharma (Class Teacher)",
            }
          : l
      ),
    }));
  };

  const addAnnouncement = (ann: Omit<Announcement, "id">) => {
    setState((prev) => ({
      ...prev,
      announcements: [{ ...ann, id: `ann-${Date.now()}` }, ...prev.announcements],
    }));
  };

  const addStudent = (student: Omit<Student, "id">) => {
    setState((prev) => ({
      ...prev,
      students: [{ ...student, id: `stu-${Date.now()}` }, ...prev.students],
    }));
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setState((prev) => ({
      ...prev,
      students: prev.students.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    }));
  };

  const addTeacher = (teacher: Omit<Teacher, "id">) => {
    setState((prev) => ({
      ...prev,
      teachers: [{ ...teacher, id: `tea-${Date.now()}` }, ...prev.teachers],
    }));
  };

  const resetDemoData = () => {
    const fresh: PortalState = {
      students: initialStudents,
      parentProfile: initialParentProfile,
      teachers: initialTeachers,
      classes: initialClasses,
      timetable: initialTimetable,
      attendanceRecords: initialAttendanceRecords,
      homework: initialHomework,
      homeworkSubmissions: initialHomeworkSubmissions,
      examinations: initialExaminations,
      examSchedules: initialExamSchedules,
      examResults: initialExamResults,
      feeStructures: initialFeeStructures,
      feeInvoices: initialFeeInvoices,
      feePayments: initialFeePayments,
      admissions: initialAdmissions,
      announcements: initialAnnouncements,
      leaveApplications: initialLeaveApplications,
      studyMaterials: initialStudyMaterials,
      notifications: initialNotifications,
      documents: initialSchoolDocuments,
    };
    setState(fresh);
    savePortalState(fresh);
  };

  const getCurrentPeriodInfo = (classId: string = "cls-4a"): CurrentPeriodInfo => {
    // If simulatedPeriod is set, map to that period
    const periods = [
      { num: 1, label: "Period 1", timeSlot: "08:30 - 09:15", subject: "Mathematics", teacher: "Mrs. Sunita Sharma", room: "Room 204", isBreak: false },
      { num: 2, label: "Period 2", timeSlot: "09:15 - 10:00", subject: "English Language", teacher: "Mr. Rajesh Verma", room: "Room 204", isBreak: false },
      { num: 0, label: "Morning Recess", timeSlot: "10:00 - 10:20", subject: "Recess Break", teacher: "Staff On Duty", room: "Courtyard", isBreak: true },
      { num: 3, label: "Period 3", timeSlot: "10:20 - 11:05", subject: "Environmental Science", teacher: "Mrs. Sunita Sharma", room: "Science Lab 1", isBreak: false },
      { num: 4, label: "Period 4", timeSlot: "11:05 - 11:50", subject: "Hindi Vyakaran", teacher: "Mrs. Kavita Joshi", room: "Room 204", isBreak: false },
      { num: 0, label: "Lunch Break", timeSlot: "11:50 - 12:35", subject: "Mid-Day Meal", teacher: "Refectory Coordinators", room: "Dining Hall", isBreak: true },
      { num: 5, label: "Period 5", timeSlot: "12:35 - 13:20", subject: "Computer Studies", teacher: "Mr. Amit Kulkarni", room: "Lab A", isBreak: false },
      { num: 6, label: "Period 6", timeSlot: "13:20 - 14:05", subject: "Physical Education", teacher: "Coach Peter Rao", room: "Sports Field", isBreak: false },
      { num: 7, label: "Period 7", timeSlot: "14:05 - 14:50", subject: "Library & Self-Study", teacher: "Sister Mary Rose", room: "Central Library", isBreak: false },
    ];

    if (simulatedPeriod !== null) {
      const match = periods.find((p) => p.num === simulatedPeriod);
      if (match) {
        return {
          periodNumber: match.num,
          label: match.label,
          timeSlot: match.timeSlot,
          subject: match.subject,
          teacherName: match.teacher,
          roomNumber: match.room,
          isBreak: match.isBreak,
          status: "Active",
        };
      }
    }

    // Default to Period 3 if out of bounds or after school
    return {
      periodNumber: 3,
      label: "Period 3",
      timeSlot: "10:20 - 11:05",
      subject: "Environmental Science",
      teacherName: "Mrs. Sunita Sharma",
      roomNumber: "Science Lab 1",
      isBreak: false,
      status: "Active",
    };
  };

  return (
    <PortalDataContext.Provider
      value={{
        state,
        markAttendance,
        createHomework,
        submitHomework,
        recordFeePayment,
        addAdmissionEnquiry,
        updateAdmissionStatus,
        enrollApplicant,
        saveExamMarks,
        markNotificationAsRead,
        clearNotifications,
        submitLeaveApplication,
        updateLeaveStatus,
        addAnnouncement,
        addStudent,
        updateStudent,
        addTeacher,
        resetDemoData,
        simulatedPeriod,
        setSimulatedPeriod,
        getCurrentPeriodInfo,
      }}
    >
      {children}
    </PortalDataContext.Provider>
  );
};

export const usePortalData = () => {
  const context = useContext(PortalDataContext);
  if (!context) {
    throw new Error("usePortalData must be used within a PortalDataProvider");
  }
  return context;
};

