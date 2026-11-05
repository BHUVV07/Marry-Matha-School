import React from "react";
import { HomeHero } from "@/components/home/HomeHero";
import { SchoolIntro } from "@/components/home/SchoolIntro";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { AcademicProgramsPreview } from "@/components/home/AcademicProgramsPreview";
import { FacilitiesPreview } from "@/components/home/FacilitiesPreview";
import { TeachingApproach } from "@/components/home/TeachingApproach";
import { ActivitiesPreview } from "@/components/home/ActivitiesPreview";
import { FacultyPreview } from "@/components/home/FacultyPreview";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { UpcomingEventsPreview } from "@/components/home/UpcomingEventsPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { AdmissionProcessOverview } from "@/components/home/AdmissionProcessOverview";
import { AdmissionCtaBanner } from "@/components/home/AdmissionCtaBanner";
import { HomeContactOverview } from "@/components/home/HomeContactOverview";

export default function HomePage() {
  return (
    <>
      {/* 5. Hero Section with school imagery & admissions CTAs */}
      <HomeHero />

      {/* 6. School Introduction */}
      <SchoolIntro />

      {/* 7. Why Choose Mary Matha Primary School? */}
      <WhyChooseUs />

      {/* 8. Academic Programs */}
      <AcademicProgramsPreview />

      {/* 9. Facilities Preview */}
      <FacilitiesPreview />

      {/* 10. Teaching and Learning Approach */}
      <TeachingApproach />

      {/* 11. Activities and Achievements */}
      <ActivitiesPreview />

      {/* 12. Faculty Introduction */}
      <FacultyPreview />

      {/* 13. School Gallery Preview */}
      <GalleryPreview />

      {/* 14. Upcoming Events Preview */}
      <UpcomingEventsPreview />

      {/* 15. Testimonials Section with clearly identified placeholders */}
      <TestimonialsSection />

      {/* 16. Admission Process */}
      <AdmissionProcessOverview />

      {/* 17. Admission Enquiry CTA Banner */}
      <AdmissionCtaBanner />

      {/* 18. Contact Information Overview */}
      <HomeContactOverview />
    </>
  );
}

