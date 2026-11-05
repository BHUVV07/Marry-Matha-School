import { SchoolEvent } from "@/lib/types";

export const eventsData: SchoolEvent[] = [
  {
    id: "evt-1",
    title: "New Academic Session Orientation & Parent Meet",
    date: "June 10, 2025",
    time: "9:30 AM – 12:30 PM",
    location: "School Multipurpose Assembly Hall",
    category: "Parent-Teacher",
    summary:
      "A comprehensive orientation welcoming new and returning families, detailing academic roadmaps, and sharing school values.",
    details:
      "Parents and guardians are invited to meet the faculty, review curriculum expectations for the upcoming academic session, understand assessment guidelines, and learn about our co-curricular programs. Interactive Q&A with department leads will follow.",
    isPast: false,
  },
  {
    id: "evt-2",
    title: "Annual Science & Innovation Exhibition",
    date: "August 22, 2025",
    time: "10:00 AM – 3:00 PM",
    location: "Main Courtyard & Science Labs",
    category: "Academic",
    summary:
      "Showcasing student-built working models, sustainable eco-solutions, and interactive robotics experiments.",
    details:
      "Students from Grades 4 through 10 will exhibit creative scientific projects exploring renewable energy, environmental conservation, physics mechanisms, and biological systems. Open to parents, guest judges, and peer schools.",
    isPast: false,
  },
  {
    id: "evt-3",
    title: "Inter-House Debate & Elocution Championship",
    date: "September 18, 2025",
    time: "11:00 AM – 2:00 PM",
    location: "Auditorium",
    category: "Cultural",
    summary:
      "A prestigious platform encouraging critical thinking, structured argumentation, and articulate public speaking.",
    details:
      "Student debaters representing all four school houses will deliberate on contemporary topics surrounding technology, ethics, education, and global stewardship. Adjudicated by visiting educationists.",
    isPast: false,
  },
  {
    id: "evt-4",
    title: "Annual Sports Meet & Athletic Championship",
    date: "November 14, 2025",
    time: "8:00 AM – 4:00 PM",
    location: "Main Sports Grounds",
    category: "Sports",
    summary:
      "A high-energy day of track races, field jumps, house relays, march-past drills, and sportsmanship awards.",
    details:
      "Celebrating children's day with our flagship athletic meet. Events include 100m/200m/400m sprint heats, 4x100m relay, long jump, tug-of-war, and fun obstacle courses for pre-primary youngsters, concluding with the champion house trophy presentation.",
    isPast: false,
  },
  {
    id: "evt-5",
    title: "Annual Cultural Fest & Talents Day",
    date: "December 20, 2024",
    time: "4:00 PM – 8:00 PM",
    location: "Open Air Amphitheatre",
    category: "Cultural",
    summary:
      "An enchanting evening celebrating musical harmonies, thematic drama, classical and folk dance recitals.",
    details:
      "Our past annual celebration where over 400 students performed before a full audience of parents and dignitaries. Highlights included an epic drama production, regional folk dances, and the junior choir performance.",
    isPast: true,
  },
  {
    id: "evt-6",
    title: "Term-1 Parent-Teacher Consultation",
    date: "October 05, 2024",
    time: "8:30 AM – 1:30 PM",
    location: "Respective Classrooms",
    category: "Parent-Teacher",
    summary:
      "One-on-one diagnostic academic consultations reviewing midpoint progress and customized learning strategies.",
    details:
      "Constructive feedback sessions where teachers and parents reviewed midterm answer papers, student portfolios, attendance, and developmental milestones to establish personalized learning support goals.",
    isPast: true,
  },
];
