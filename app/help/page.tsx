"use client";

import { Accordion } from "@heroui/react";

const faqs = [
  { q: "How do I create an account?", a: "Click 'Sign Up' in the top right, enter your name, email, and password. You can also sign up with Google." },
  { q: "How do I enroll in a course?", a: "Browse courses on the Explore page, click 'View Details' on any course, then click 'Enroll Now'." },
  { q: "How do I create my own course?", a: "Sign in and click 'Add Course' in the navbar. Use the AI generator to create content or fill in the form manually." },
  { q: "Can I edit or delete my courses?", a: "Go to 'My Classes' to view all your courses. Click 'Edit' to update or the trash icon to delete." },
  { q: "How does the AI content generator work?", a: "Enter a topic and click 'Generate'. AI creates a title, description, and syllabus. You can edit the result before publishing." },
  { q: "What payment methods are accepted?", a: "Courses can be free or paid. Payments are processed securely through our integrated payment system." },
  { q: "How do I reset my password?", a: "On the login page, click 'Forgot Password' and follow the instructions sent to your email." },
  { q: "Is my data secure?", a: "Yes. We use encryption, secure authentication, and follow industry best practices for data protection." },
];

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-3 text-4xl font-bold">Help & Support</h1>
        <p className="text-foreground/60">
          Find answers to common questions below.
        </p>
      </div>

      <Accordion.Root className="flex flex-col gap-2">
        {faqs.map((faq, i) => (
          <Accordion.Item key={i}>
            <Accordion.Heading>
              <Accordion.Trigger className="flex w-full items-center justify-between rounded-lg border border-default-200 px-4 py-3 text-left text-sm font-medium hover:bg-default-50">
                {faq.q}
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body className="px-4 py-3 text-sm text-foreground/60">
                {faq.a}
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>

      <div className="mt-12 rounded-xl border border-default-200 p-6 text-center">
        <p className="mb-2 font-semibold">Still need help?</p>
        <p className="mb-4 text-sm text-foreground/60">
          Contact our support team and we'll get back to you within 24 hours.
        </p>
        <a
          href="/contact"
          className="inline-flex h-10 items-center rounded-lg bg-primary px-6 text-sm font-medium text-white hover:bg-primary/90"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
