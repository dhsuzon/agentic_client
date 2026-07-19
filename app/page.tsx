"use client";

import { useState } from "react";
import { Button, Card, Accordion, Skeleton } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  FiBook,
  FiCpu,
  FiBarChart2,
  FiUsers,
  FiZap,
  FiGlobe,
  FiTrendingUp,
  FiChevronRight,
  FiStar,
} from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getCourses, getCategories, Course } from "@/lib/api";
import CourseCard from "@/components/CourseCard";

const features = [
  {
    icon: FiCpu,
    title: "AI-Powered Learning",
    description:
      "Generate course syllabi and lesson plans instantly with our AI content generator.",
  },
  {
    icon: FiBarChart2,
    title: "Smart Recommendations",
    description:
      "Get personalized course recommendations based on your learning history.",
  },
  {
    icon: FiUsers,
    title: "Expert Instructors",
    description:
      "Learn from industry professionals with real-world experience.",
  },
  {
    icon: FiZap,
    title: "Interactive Content",
    description:
      "Engage with multimedia content, quizzes, and hands-on projects.",
  },
  {
    icon: FiGlobe,
    title: "Learn Anywhere",
    description:
      "Access courses on any device, anytime, anywhere in the world.",
  },
  {
    icon: FiTrendingUp,
    title: "Track Progress",
    description:
      "Monitor your learning journey with detailed analytics and insights.",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    content:
      "The AI-generated syllabi saved me hours of planning. TutorialsPoint has transformed how I learn.",
    rating: 5,
  },
  {
    name: "Mark Chen",
    role: "Data Scientist",
    content:
      "The recommendation engine is incredible. It suggested courses I didn't know I needed but perfectly matched my goals.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    content:
      "I love how I can both learn and teach. The platform makes it easy to share knowledge with others.",
    rating: 5,
  },
  {
    name: "Alex Kim",
    role: "Student",
    content:
      "The interactive content and progress tracking keep me motivated. Best learning platform I've used.",
    rating: 4,
  },
];

const faqs = [
  {
    q: "How do I enroll in a course?",
    a: "Simply browse our course catalog, click on a course that interests you, and hit the Enroll button. Most courses are free to get started.",
  },
  {
    q: "Can I create and sell my own courses?",
    a: "Absolutely! Sign up as an instructor, use our AI Content Generator to create your syllabus, and publish your course for others to enjoy.",
  },
  {
    q: "How does the AI Content Generator work?",
    a: "Enter a topic, and our AI will generate a complete course syllabus with lesson plans, descriptions, and learning objectives. You can regenerate as needed.",
  },
  {
    q: "Is there a mobile app available?",
    a: "Our platform is fully responsive and works great on mobile browsers. A native mobile app is coming soon!",
  },
  {
    q: "How are course recommendations made?",
    a: "Our AI analyzes your enrollment history, learning pace, and preferences to suggest courses that match your learning journey.",
  },
];

const categoryPalette = ["bg-primary", "bg-secondary", "bg-primary/70", "bg-secondary/70", "bg-primary/50", "bg-danger"];

export default function LandingPage() {
  const router = useRouter();

  const { data: catData } = useQuery<{ categories: string[] }>({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const { data: featuredData, isLoading: featuredLoading } = useQuery<{ courses: Course[]; pagination: any }>({
    queryKey: ["courses", { limit: "6", sort: "newest" }],
    queryFn: () => getCourses({ limit: "6", sort: "newest" }),
  });

  const { data: allCourses } = useQuery<{ courses: Course[]; pagination: any }>({
    queryKey: ["courses", { limit: "4", sort: "newest" }],
    queryFn: () => getCourses({ limit: "4", sort: "newest" }),
  });

  const totalCourses = allCourses?.pagination?.total || 0;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative flex min-h-[65vh] items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground dark:text-white sm:text-5xl lg:text-6xl">
            Learn Anything with{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI-Powered
            </span>{" "}
            Courses
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-foreground/60">
            Create, explore, and master courses with intelligent content
            generation and personalized recommendations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              className="bg-primary text-white px-8"
              onPress={() => router.push("/explore")}
            >
              Explore Courses <FiChevronRight />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="px-8"
              onPress={() => router.push("/register")}
            >
              Start Teaching
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground dark:text-white">Why Choose TutorialsPoint?</h2>
          <p className="mx-auto max-w-2xl text-foreground/60">
            Our platform combines the power of AI with expert knowledge to
            deliver an unmatched learning experience.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Card.Root key={i} className="group rounded-xl transition-shadow hover:shadow-lg">
              <Card.Content className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <f.icon className="text-2xl" />
                </div>
                <Card.Title className="mb-2 text-lg text-foreground dark:text-white">{f.title}</Card.Title>
                <Card.Description className="text-sm text-foreground/60">
                  {f.description}
                </Card.Description>
              </Card.Content>
            </Card.Root>
          ))}
        </div>
      </section>

      {/* Top Categories Section */}
      <section className="bg-default-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-foreground dark:text-white">Top Categories</h2>
            <p className="mx-auto max-w-2xl text-foreground/60">
              Explore courses across popular categories
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {catData?.categories?.length
              ? catData.categories.map((cat, i) => (
                  <Card.Root key={cat} className="rounded-xl transition-shadow hover:shadow-lg">
                    <button
                      className="w-full text-left"
                      onClick={() => router.push(`/explore?category=${cat}`)}
                    >
                      <Card.Content className="flex items-center gap-4 p-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-lg text-white ${categoryPalette[i % categoryPalette.length]}`}
                        >
                          <FiBook className="text-xl" />
                        </div>
                        <div>
                          <Card.Title className="text-base">{cat}</Card.Title>
                        </div>
                      </Card.Content>
                    </button>
                  </Card.Root>
                ))
              : Array.from({ length: 6 }).map((_, i) => (
                  <Card.Root key={i} className="rounded-xl">
                    <Card.Content className="p-4">
                      <Skeleton className="h-5 w-32" />
                    </Card.Content>
                  </Card.Root>
                ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground dark:text-white">Latest Courses</h2>
          <p className="mx-auto max-w-2xl text-foreground/60">
            Discover our most recent courses
          </p>
        </div>
        {featuredLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card.Root key={i} className="overflow-hidden rounded-xl">
                <Skeleton className="aspect-video w-full" />
                <Card.Content className="p-4">
                  <Skeleton className="mb-2 h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </Card.Content>
              </Card.Root>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {featuredData?.courses?.map((course) => (
              <SwiperSlide key={course._id}>
                <CourseCard course={course} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      {/* Statistics Section */}
      <section className="bg-default-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-foreground dark:text-white">Platform at a Glance</h2>
            <p className="mx-auto max-w-2xl text-foreground/60">
              Track the growth of our AI-powered learning community
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <Card.Root className="rounded-xl">
              <Card.Content className="p-6">
                <Card.Title className="mb-4 text-foreground dark:text-white">Active Learners & AI Courses</Card.Title>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Jan", learners: 1200, aiCourses: 400 },
                        { month: "Feb", learners: 1900, aiCourses: 600 },
                        { month: "Mar", learners: 2800, aiCourses: 900 },
                        { month: "Apr", learners: 3600, aiCourses: 1300 },
                        { month: "May", learners: 4500, aiCourses: 1700 },
                        { month: "Jun", learners: 5200, aiCourses: 2100 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-default-200)" />
                      <XAxis
                        dataKey="month"
                        stroke="var(--color-default-400)"
                        fontSize={12}
                      />
                      <YAxis stroke="var(--color-default-400)" fontSize={12} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="learners"
                        stroke="var(--color-primary)"
                        strokeWidth={2}
                        name="Active Learners"
                      />
                      <Line
                        type="monotone"
                        dataKey="aiCourses"
                        stroke="var(--color-secondary)"
                        strokeWidth={2}
                        name="AI Courses"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card.Content>
            </Card.Root>
            <div className="grid grid-cols-2 gap-4">
              <Card.Root className="rounded-xl">
                <Card.Content className="flex flex-col items-center p-6 text-center">
                  <FiUsers className="mb-2 text-2xl text-primary" />
                  <p className="text-2xl font-bold text-foreground dark:text-white">{totalCourses * 2500}+</p>
                  <p className="text-xs text-foreground/60 dark:text-muted">Active Learners</p>
                </Card.Content>
              </Card.Root>
              <Card.Root className="rounded-xl">
                <Card.Content className="flex flex-col items-center p-6 text-center">
                  <FiCpu className="mb-2 text-2xl text-secondary" />
                  <p className="text-2xl font-bold text-foreground dark:text-white">{totalCourses}+</p>
                  <p className="text-xs text-foreground/60 dark:text-muted">Courses Available</p>
                </Card.Content>
              </Card.Root>
              <Card.Root className="rounded-xl">
                <Card.Content className="flex flex-col items-center p-6 text-center">
                  <FiStar className="mb-2 text-2xl text-primary" />
                  <p className="text-2xl font-bold text-foreground dark:text-white">95%</p>
                  <p className="text-xs text-foreground/60 dark:text-muted">Satisfaction Rate</p>
                </Card.Content>
              </Card.Root>
              <Card.Root className="rounded-xl">
                <Card.Content className="flex flex-col items-center p-6 text-center">
                  <FiBarChart2 className="mb-2 text-2xl text-secondary" />
                  <p className="text-2xl font-bold text-foreground dark:text-white">50K+</p>
                  <p className="text-xs text-foreground/60 dark:text-muted">Lessons Completed</p>
                </Card.Content>
              </Card.Root>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground dark:text-white">What Our Users Say</h2>
          <p className="mx-auto max-w-2xl text-foreground/60">
            Hear from our community of learners and instructors
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Card.Root key={i} className="rounded-xl transition-shadow hover:shadow-lg">
              <Card.Content className="p-6">
                <div className="mb-3 flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <FiStar key={j} fill={j < t.rating ? "currentColor" : "none"} />
                  ))}
                </div>
                <Card.Description className="mb-4 text-sm leading-relaxed text-foreground/70">
                  &ldquo;{t.content}&rdquo;
                </Card.Description>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-foreground/40">{t.role}</p>
                  </div>
                </div>
              </Card.Content>
            </Card.Root>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-default-50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-foreground dark:text-white">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-foreground/60">
              Everything you need to know about TutorialsPoint
            </p>
          </div>
          <Accordion.Root variant="default" className="rounded-xl border border-default-200">
            {faqs.map((faq, i) => (
              <Accordion.Item key={i}>
                <Accordion.Heading>
                  <Accordion.Trigger>{faq.q}</Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                  <Accordion.Body>{faq.a}</Accordion.Body>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Card.Root className="rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
          <Card.Content className="flex flex-col items-center gap-6 p-12 text-center">
            <Card.Title className="text-3xl font-bold">
              Ready to Start Learning?
            </Card.Title>
            <Card.Description className="max-w-md text-white/80">
              Join thousands of learners. Get started for free and transform your
              skills with AI-powered education.
            </Card.Description>
            <div className="flex gap-4">
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-primary px-8"
                onPress={() => router.push("/register")}
              >
                Get Started Free
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="border border-white/30 text-white px-8"
                onPress={() => router.push("/explore")}
              >
                Browse Courses
              </Button>
            </div>
          </Card.Content>
        </Card.Root>
      </section>
    </div>
  );
}
