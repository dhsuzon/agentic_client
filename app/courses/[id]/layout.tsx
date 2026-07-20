import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Details - TutorialsPoint",
  description: "View course details, syllabus, reviews, and enroll in AI-powered courses on TutorialsPoint.",
};

export default function CourseDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
