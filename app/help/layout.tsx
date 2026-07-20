import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help & Support - TutorialsPoint",
  description: "Find answers to frequently asked questions about TutorialsPoint's AI-powered learning platform.",
};

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
