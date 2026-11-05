export interface ClassOffering {
  id: string;
  name: string;
  subtext: string;
  ageCriteria: string;
  description: string;
}

export interface SchoolConfig {
  name: string;
  shortName: string;
  tagline: string;
  motto: string;
  description: string;
  establishedYear: number;
  schoolCode: string; // UDISE Code: 29150224207
  affiliation: string; // Karnataka State Board
  affiliationNotice: string;
  levelOfSchooling: string;
  mediumOfInstruction: string;
  studentGenderType: string;
  studentTeacherRatio: string;
  managementType: string;
  schoolType: string;
  classroomsCount: number;
  principalName: string;
  contact: {
    phone: string;
    displayPhone: string;
    email: string;
    admissionsEmail: string;
    address: {
      line1: string;
      line2: string;
      city: string;
      district: string;
      state: string;
      pinCode: string;
      fullText: string;
      mapQuery: string;
    };
    timings: {
      schoolHours: string;
      officeHours: string;
      visitingHours: string;
    };
    whatsApp: {
      enabled: boolean;
      phoneNumberPlaceholder: string;
      defaultMessage: string;
    };
    socialLinks: {
      facebook: string;
      instagram: string;
      youtube: string;
      linkedin: string;
    };
  };
  admissions: {
    currentSession: string;
    status: "OPEN" | "UPCOMING" | "CLOSED";
    statusLabel: string;
    enquiryNotice: string;
    classesOffered: ClassOffering[];
  };
  disclaimer: string;
}

export const schoolConfig: SchoolConfig = {
  name: "Mary Matha School",
  shortName: "MMS",
  tagline: "Nurturing Character, Fostering Curiosity, Inspiring Excellence",
  motto: "Knowledge • Virtue • Service",
  description:
    "Established in 1999, Mary Matha School (UDISE: 29150224207) is a recognized English-medium co-educational institution in Ripponpet, Shimoga, Karnataka. Guided by the Karnataka State Board curriculum with a low 15:1 student-teacher ratio, we deliver personalized foundational and secondary education.",
  establishedYear: 1999,
  schoolCode: "29150224207",
  affiliation: "Karnataka State Board (KSEAB)",
  affiliationNotice:
    "Recognized by the Department of School Education, Karnataka (School Code: 29150224207). English-medium curriculum under the Karnataka State Examination & Assessment Board (KSEAB).",
  levelOfSchooling: "Primary & Secondary",
  mediumOfInstruction: "English",
  studentGenderType: "Co-educational (Boys & Girls)",
  studentTeacherRatio: "15:1",
  managementType: "Private Unaided",
  schoolType: "Co-ed Day & Boarding School",
  classroomsCount: 4,
  principalName: "Sister Gracelin",
  contact: {
    phone: "+91 99990 00000",
    displayPhone: "Contact Sister Gracelin / Admissions Desk",
    email: "marymathaschool.ripponpet@gmail.com",
    admissionsEmail: "admissions.marymatha@gmail.com",
    address: {
      line1: "Barve, Thirthahalli Road",
      line2: "Ripponpet",
      city: "Ripponpet",
      district: "Shimoga (Shivamogga)",
      state: "Karnataka",
      pinCode: "577426",
      fullText: "Barve, Thirthahalli Road, Ripponpet, Shimoga - 577426, Karnataka",
      mapQuery: "Mary+Matha+School+Barve+Thirthahalli+Road+Ripponpet+Shimoga",
    },
    timings: {
      schoolHours: "Monday – Friday: 8:45 AM to 3:30 PM | Saturday: 8:45 AM to 1:00 PM",
      officeHours: "Monday – Friday: 9:00 AM to 4:00 PM | Saturday: 9:00 AM to 1:30 PM",
      visitingHours: "Monday – Friday: 10:30 AM to 1:30 PM (With Sister Gracelin / Administration)",
    },
    whatsApp: {
      enabled: true,
      phoneNumberPlaceholder: "+91 98450 00000",
      defaultMessage:
        "Hello, I would like to make an enquiry regarding admissions at Mary Matha School, Ripponpet.",
    },
    socialLinks: {
      facebook: "#",
      instagram: "#",
      youtube: "#",
      linkedin: "#",
    },
  },
  admissions: {
    currentSession: "Academic Year 2026–2027",
    status: "OPEN",
    statusLabel: "Admissions Open for Session 2026–27 (UDISE: 29150224207)",
    enquiryNotice:
      "Submit an enquiry online or visit the school office at Barve, Ripponpet to meet Sister Gracelin and receive the admission prospectus.",
    classesOffered: [
      {
        id: "pre-primary",
        name: "Pre-Primary Wing",
        subtext: "Nursery, Lower KG, Upper KG",
        ageCriteria: "3 to 5 years (as per Karnataka regulatory guidelines)",
        description:
          "Play-based early education developing English language phonics, motor skills, and creative cognitive expression.",
      },
      {
        id: "primary",
        name: "Primary Wing",
        subtext: "Grades 1 to 5",
        ageCriteria: "6 to 10 years",
        description:
          "Karnataka State Board foundational literacy, mathematics, environmental studies, and co-curriculars with a 15:1 student-teacher ratio.",
      },
      {
        id: "secondary",
        name: "High School / Secondary Wing",
        subtext: "Grades 6 to 10 (State Board)",
        ageCriteria: "11 to 15 years",
        description:
          "Rigorous English-medium State Board curriculum preparing students for SSLC state examinations, character formation, and life skills.",
      },
    ],
  },
  disclaimer:
    "Official school portal for Mary Matha School, Barve, Ripponpet, Shimoga-577426, Karnataka (School Code: 29150224207). Established in 1999.",
};
