export type Role =
  | "parent"
  | "student"
  | "teacher"
  | "class_teacher"
  | "admin"
  | "super_admin"
  | "principal"
  | "accountant";

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  phone: string;
  department?: string;
  designation?: string;
  associatedId?: string; // e.g. studentId, parentId, teacherId
}

export interface Student {
  id: string;
  admissionNo: string;
  rollNo: string;
  firstName: string;
  lastName: string;
  fullName: string;
  classId: string;
  className: string;
  section: string;
  dateOfBirth: string;
  gender: "Male" | "Female" | "Other";
  bloodGroup: string;
  parentId: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  address: string;
  emergencyContact: string;
  busRoute: string;
  house: "St. Gabriel (Blue)" | "St. Michael (Yellow)" | "St. Raphael (Red)" | "St. Uriel (Green)";
  attendancePercentage: number;
  photoUrl: string;
  enrolledDate: string;
  status: "Active" | "Graduated" | "Transferred";
}

export interface ParentProfile {
  id: string;
  fatherName: string;
  motherName: string;
  primaryEmail: string;
  primaryPhone: string;
  secondaryPhone?: string;
  occupation: string;
  residentialAddress: string;
  city: string;
  postalCode: string;
  childrenIds: string[];
}

export interface Teacher {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  qualification: string;
  experienceYears: number;
  subjects: string[];
  assignedClasses: string[];
  isClassTeacherOf?: string;
  photoUrl: string;
  status: "Active" | "On Leave";
}

export interface ClassSection {
  id: string;
  wing: "Pre-Primary" | "Primary" | "Middle School";
  className: string;
  section: string;
  roomNumber: string;
  classTeacherId: string;
  classTeacherName: string;
  capacity: number;
  enrolledCount: number;
  academicYear: string;
}

export interface TimetablePeriod {
  id: string;
  classId: string;
  dayOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
  periodNumber: number; // 1 to 7
  startTime: string; // e.g. "08:30"
  endTime: string; // e.g. "09:15"
  subject: string;
  teacherId: string;
  teacherName: string;
  roomNumber: string;
  isBreak?: boolean;
}

export type AttendanceStatus = "present" | "absent" | "late" | "excused";

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  studentId: string;
  studentName: string;
  classId: string;
  section: string;
  status: AttendanceStatus;
  markedByTeacherId: string;
  remarks?: string;
  timestamp: string;
}

export interface HomeworkItem {
  id: string;
  title: string;
  subject: string;
  classId: string;
  className: string;
  section: string;
  assignedDate: string;
  dueDate: string;
  description: string;
  teacherId: string;
  teacherName: string;
  attachmentName?: string;
  submissionCount: number;
  totalStudents: number;
  status: "Active" | "Completed" | "Graded";
}

export interface HomeworkSubmission {
  id: string;
  homeworkId: string;
  studentId: string;
  studentName: string;
  submissionDate: string;
  status: "Pending" | "Submitted" | "Reviewed";
  notes?: string;
  fileName?: string;
  marksAwarded?: number;
  maxMarks?: number;
  teacherFeedback?: string;
}

export interface Examination {
  id: string;
  title: string;
  term: "Term 1 Final" | "Term 2 Annual" | "Mid-Term 1" | "Mid-Term 2";
  academicYear: string;
  startDate: string;
  endDate: string;
  status: "Upcoming" | "In Progress" | "Completed" | "Results Published";
  totalSubjects: number;
}

export interface ExamScheduleItem {
  id: string;
  examId: string;
  classId: string;
  subject: string;
  examDate: string;
  timeSlot: string;
  maxMarks: number;
  passMarks: number;
  syllabusPortion: string;
  roomNumber: string;
}

export interface StudentExamResult {
  id: string;
  examId: string;
  examTitle: string;
  studentId: string;
  studentName: string;
  classId: string;
  subject: string;
  marksObtained: number;
  maxMarks: number;
  grade: string;
  remarks: string;
}

export interface FeeStructure {
  id: string;
  className: string;
  wing: "Pre-Primary" | "Primary" | "Middle School";
  tuitionFee: number;
  computerLabFee: number;
  libraryFee: number;
  sportsAnnualFee: number;
  activityFee: number;
  totalAnnualFee: number;
  academicYear: string;
  installments: {
    installmentNo: number;
    title: string;
    amount: number;
    dueDate: string;
  }[];
}

export interface FeeInvoice {
  id: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  className: string;
  termTitle: string;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  dueDate: string;
  status: "Paid" | "Partial" | "Overdue" | "Unpaid";
}

export interface FeePayment {
  id: string;
  receiptNo: string;
  invoiceId: string;
  studentId: string;
  studentName: string;
  className: string;
  amountPaid: number;
  paymentDate: string;
  paymentMethod: "Cash" | "Cheque" | "Bank Transfer (NEFT/RTGS)" | "Demand Draft (DD)" | "UPI";
  transactionRef: string;
  cashierName: string;
  notes?: string;
  status: "Verified";
}

export type AdmissionPipelineStage =
  | "New"
  | "Contacted"
  | "Document Review"
  | "Assessment & Interview"
  | "Approved"
  | "Enrolled"
  | "Rejected";

export interface AdmissionEnquiry {
  id: string;
  applicationNo: string;
  applicantName: string;
  appliedClass: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  applicationDate: string;
  previousSchool?: string;
  status: AdmissionPipelineStage;
  notes: string;
  dateOfBirth: string;
  address: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: "Academic" | "Administrative" | "Events" | "Holiday" | "Urgent";
  targetAudience: Role[] | "all";
  date: string;
  author: string;
  priority: "Normal" | "High" | "Urgent";
  pinned?: boolean;
}

export interface LeaveApplication {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  leaveType: "Sick Leave" | "Casual Leave" | "Medical Recovery" | "Family Event";
  startDate: string;
  endDate: string;
  daysCount: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  appliedDate: string;
  reviewedBy?: string;
  reviewRemarks?: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  className: string;
  uploadedBy: string;
  uploadDate: string;
  fileType: "PDF" | "Document" | "Video" | "Presentation";
  fileSize: string;
  downloadUrl?: string;
  description: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: "attendance" | "homework" | "fees" | "admission" | "announcement" | "grade";
  timestamp: string;
  targetRole: Role | "all";
  read: boolean;
  deliveryChannel: "In-App System Alert" | "Simulated External Notification (SMS/Email dispatched)";
}

export interface SchoolDocument {
  id: string;
  title: string;
  category: "Academic" | "Policy" | "Health & Safety" | "Administrative" | "Logistics" | "Student Record";
  size: string;
  format: "PDF" | "DOCX" | "XLSX";
  description: string;
  uploadDate: string;
  uploadedBy: string;
  relatedStudentId?: string;
  relatedStudentName?: string;
  status: "Verified" | "Pending Review" | "Archived";
  accessClassification: "Public" | "Parents & Students" | "Internal Staff Only" | "Confidential Administrative";
}


