import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - TutorialsPoint",
  description: "Learn about TutorialsPoint's mission to transform education using AI-powered learning.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
