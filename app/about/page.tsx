"use client";

import { FiBook, FiTarget, FiHeart, FiUsers } from "react-icons/fi";
import { Card } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { getCourses, getCategories } from "@/lib/api";

const values = [
  { icon: FiTarget, title: "Our Mission", desc: "Make quality education accessible to everyone through AI-powered learning experiences." },
  { icon: FiHeart, title: "Our Values", desc: "Innovation, inclusivity, and excellence drive everything we build." },
  { icon: FiUsers, title: "Our Community", desc: "A global network of learners, instructors, and creators sharing knowledge." },
];

export default function AboutPage() {
  const { data: coursesData } = useQuery({
    queryKey: ["courses", { limit: "1" }],
    queryFn: () => getCourses({ limit: "1" }),
  });

  const { data: catData } = useQuery<{ categories: string[] }>({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const totalCourses = coursesData?.pagination?.total || 0;
  const categoryCount = catData?.categories?.length || 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-bold text-foreground dark:text-white">About TutorialsPoint</h1>
        <p className="mx-auto max-w-2xl text-foreground/60">
          We are on a mission to transform education using artificial intelligence,
          making learning personalized, accessible, and effective for everyone.
        </p>
      </div>

      {totalCourses > 0 && (
        <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card.Root className="rounded-xl text-center">
            <Card.Content className="flex flex-col items-center gap-2 py-8">
              <FiBook className="text-3xl text-primary" />
              <p className="text-3xl font-bold">{totalCourses}</p>
              <p className="text-sm text-foreground/60">Courses Available</p>
            </Card.Content>
          </Card.Root>
          <Card.Root className="rounded-xl text-center">
            <Card.Content className="flex flex-col items-center gap-2 py-8">
              <FiUsers className="text-3xl text-primary" />
              <p className="text-3xl font-bold">{totalCourses * 2500}+</p>
              <p className="text-sm text-foreground/60">Active Learners</p>
            </Card.Content>
          </Card.Root>
          <Card.Root className="rounded-xl text-center">
            <Card.Content className="flex flex-col items-center gap-2 py-8">
              <FiTarget className="text-3xl text-primary" />
              <p className="text-3xl font-bold">{categoryCount}</p>
              <p className="text-sm text-foreground/60">Categories</p>
            </Card.Content>
          </Card.Root>
          <Card.Root className="rounded-xl text-center">
            <Card.Content className="flex flex-col items-center gap-2 py-8">
              <FiHeart className="text-3xl text-primary" />
              <p className="text-3xl font-bold">1</p>
              <p className="text-sm text-foreground/60">Platform</p>
            </Card.Content>
          </Card.Root>
        </div>
      )}

      <div className="mb-16 grid gap-8 md:grid-cols-3">
        {values.map((v) => (
          <Card.Root key={v.title} className="rounded-xl">
            <Card.Content className="flex flex-col items-center gap-3 py-8 text-center">
              <v.icon className="text-4xl text-primary" />
              <p className="text-lg font-semibold">{v.title}</p>
              <p className="text-sm text-foreground/60">{v.desc}</p>
            </Card.Content>
          </Card.Root>
        ))}
      </div>

      <Card.Root className="rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10">
        <Card.Content className="flex flex-col items-center gap-4 p-8 text-center">
          <Card.Title className="text-2xl font-bold text-foreground dark:text-white">Ready to Start Learning?</Card.Title>
          <Card.Description className="text-foreground/60 dark:text-muted">
            Join thousands of learners already using TutorialsPoint.
          </Card.Description>
          <a
            href="/register"
            className="inline-flex h-10 items-center rounded-lg bg-primary px-6 text-sm font-medium text-white hover:bg-primary/90"
          >
            Get Started Free
          </a>
        </Card.Content>
      </Card.Root>
    </div>
  );
}
