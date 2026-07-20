import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Course - TutorialsPoint",
  description: "Create a new AI-powered course with TutorialsPoint. Use AI to generate content and syllabus automatically.",
};

export default function NewCourseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
