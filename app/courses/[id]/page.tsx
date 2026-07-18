"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Skeleton, Chip } from "@heroui/react";
import { FiArrowLeft, FiDollarSign, FiClock, FiUser, FiTag } from "react-icons/fi";
import { getCourseById, getCourses } from "@/lib/api";
import CourseCard from "@/components/CourseCard";

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseById(id),
  });

  const course = data?.course;

  const { data: related } = useQuery({
    queryKey: ["related-courses", course?.category],
    queryFn: () => getCourses({ category: course!.category, limit: "4" }),
    enabled: !!course?.category,
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Skeleton className="mb-4 h-8 w-32" />
        <Skeleton className="mb-6 aspect-video w-full rounded-xl" />
        <Skeleton className="mb-2 h-10 w-2/3" />
        <Skeleton className="mb-1 h-5 w-1/3" />
        <Skeleton className="mb-4 h-24 w-full" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-lg">Course not found</p>
        <Button variant="ghost" onPress={() => router.push("/explore")}>
          Back to Explore
        </Button>
      </div>
    );
  }

  const relatedCourses = related?.courses?.filter((c) => c._id !== course._id) || [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Button
        variant="ghost"
        className="mb-4"
        onPress={() => router.push("/explore")}
      >
        <FiArrowLeft /> Back to Explore
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative mb-6 aspect-video overflow-hidden rounded-xl bg-default-100">
            {course.image ? (
              <img
                src={course.image}
                alt={course.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-6xl text-default-300">
                <FiClock />
              </div>
            )}
          </div>

          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Chip variant="soft" color="accent">
              {course.category}
            </Chip>
            <Chip variant="soft">
              {course.price === 0 ? "Free" : `$${course.price}`}
            </Chip>
          </div>

          <h1 className="mb-2 text-3xl font-bold">{course.title}</h1>

          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-foreground/60">
            <span className="flex items-center gap-1">
              <FiUser /> Owner
            </span>
            <span className="flex items-center gap-1">
              <FiClock />{" "}
              {new Date(course.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {course.tags && course.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  <FiTag className="text-[10px]" /> {tag}
                </span>
              ))}
            </div>
          )}

          <Card.Root className="mb-6">
            <Card.Header>
              <Card.Title>Description</Card.Title>
            </Card.Header>
            <Card.Content>
              <Card.Description className="leading-relaxed text-foreground/80">
                {course.description}
              </Card.Description>
            </Card.Content>
          </Card.Root>

          {course.syllabus && (
            <Card.Root>
              <Card.Header>
                <Card.Title>Syllabus</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="whitespace-pre-wrap leading-relaxed text-foreground/80">
                  {course.syllabus}
                </div>
              </Card.Content>
            </Card.Root>
          )}
        </div>

        <div>
          <Card.Root className="sticky top-24">
            <Card.Header>
              <Card.Title>Course Info</Card.Title>
            </Card.Header>
            <Card.Content className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/60">Price</span>
                <span className="font-semibold">
                  {course.price === 0 ? "Free" : `$${course.price}`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/60">Category</span>
                <span>{course.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/60">Published</span>
                <span>
                  {new Date(course.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/60">Updated</span>
                <span>
                  {new Date(course.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </Card.Content>
          </Card.Root>
        </div>
      </div>

      {relatedCourses.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Related Courses</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedCourses.slice(0, 4).map((c) => (
              <CourseCard key={c._id} course={c} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
