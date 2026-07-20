import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - TutorialsPoint",
  description: "Sign in to your TutorialsPoint account to access AI-powered courses and learning tools.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
