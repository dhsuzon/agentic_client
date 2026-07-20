import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Courses - TutorialsPoint",
  description: "View and manage your enrolled courses or all courses on the platform.",
};

export default function ManageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
