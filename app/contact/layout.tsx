import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - TutorialsPoint",
  description: "Get in touch with TutorialsPoint support. We're here to help with your questions and feedback.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
