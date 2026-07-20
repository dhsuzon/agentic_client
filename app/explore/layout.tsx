import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Courses - TutorialsPoint",
  description: "Browse AI-powered courses with search, filters, and sorting. Find the perfect course for your learning journey.",
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
