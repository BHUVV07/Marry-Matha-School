export interface AdmissionFormData {
  studentName: string;
  dob: string;
  gender: string;
  previousSchool: string;
  previousClass: string;
  applyingClass: string;
  parentName: string;
  relationship: string;
  phone: string;
  email: string;
  address: string;
  additionalMessage?: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  experienceYears: string;
  bio: string;
  subjects: string[];
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Academics" | "Events" | "Sports" | "Cultural Activities" | "Campus";
  description: string;
  imageUrl: string;
  date?: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: "Academic" | "Sports" | "Cultural" | "Parent-Teacher" | "Celebration";
  summary: string;
  details: string;
  isPast?: boolean;
}

export interface Facility {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
  icon: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  category: "Parent" | "Student" | "Alumni";
  gradeOrYear: string;
}
