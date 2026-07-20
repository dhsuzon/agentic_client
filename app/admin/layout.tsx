import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - TutorialsPoint",
  description: "Admin dashboard for managing courses on TutorialsPoint.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
