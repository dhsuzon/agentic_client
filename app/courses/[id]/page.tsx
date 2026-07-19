"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Skeleton, Chip } from "@heroui/react";
import {
  FiArrowLeft,
  FiDollarSign,
  FiClock,
  FiUser,
  FiTag,
  FiBookOpen,
  FiStar,
} from "react-icons/fi";
import { toast } from "react-toastify";
import {
  getCourseById,
  getCourses,
  enrollCourse,
  getMyEnrollments,
  unenrollCourse,
  getReviewsByCourse,
} from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import CourseCard from "@/components/CourseCard";
import ReviewCard from "@/components/ReviewCard";
import Image from "next/image";

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseById(id),
  });

  const course = data?.course;

  const { data: session } = useSession();

  const { data: enrollmentData } = useQuery({
    queryKey: ["my-enrollments"],
    queryFn: getMyEnrollments,
    enabled: !!session,
  });

  const enrollment = enrollmentData?.enrollments?.find(
    (e: any) => e.courseId === id || e.course?._id === id,
  );
  const isEnrolled = !!enrollment;
  
  const queryClient = useQueryClient();

  const enrollMutation = useMutation({
    mutationFn: () => enrollCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-enrollments"] });
      toast.success("Enrolled successfully!");
    },
    onError: (err: any) => toast.error(err.message || "Enrollment failed"),
  });

  const unenrollMutation = useMutation({
    mutationFn: () => unenrollCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-enrollments"] });
      toast.success("Unenrolled");
    },
    onError: (err: any) => toast.error(err.message || "Failed to unenroll"),
  });

  const { data: related } = useQuery({
    queryKey: ["related-courses", course?.category],
    queryFn: () => getCourses({ category: course!.category, limit: "4" }),
    enabled: !!course?.category,
  });

  const { data: reviewsData } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getReviewsByCourse(id),
    enabled: !!id,
  });

  const reviews = reviewsData?.reviews || [];
  const averageRating = reviewsData?.averageRating || 0;
  const totalReviews = reviewsData?.totalReviews || 0;

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

  const relatedCourses =
    related?.courses?.filter((c) => c._id !== course._id) || [];

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
              <Image
                src={course.image}
                alt={course.title}
                className="h-full w-full object-cover"
                fill
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

          <h1 className="mb-2 text-3xl font-bold text-foreground dark:text-white">
            {course.title}
          </h1>

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

          <Card.Root className="mb-6 rounded-xl">
            <Card.Header>
              <Card.Title>Description</Card.Title>
            </Card.Header>
            <Card.Content>
              <Card.Description className="leading-relaxed text-foreground/80">
                {course.description}
              </Card.Description>
            </Card.Content>
          </Card.Root>

          <Card.Root className="rounded-xl">
            <Card.Header>
              <div className="flex items-center justify-between">
                <Card.Title>Reviews</Card.Title>
                <div className="flex items-center gap-2">
                  <FiStar className="text-yellow-400" />
                  <span className="font-semibold">{averageRating.toFixed(1)}</span>
                  <span className="text-sm text-foreground/60">({totalReviews})</span>
                </div>
              </div>
            </Card.Header>
            <Card.Content>
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review: any) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-foreground/60 py-4">
                  No reviews yet. Be the first to review!
                </p>
              )}
            </Card.Content>
          </Card.Root>
        </div>

        <div>
          {session && (
            <Card.Root className="sticky top-24 rounded-xl border border-success/20 bg-success/5">
              <Card.Content className="p-4">
                <div className="flex items-center gap-3">
                  <FiBookOpen className="text-xl text-success" />
                  <div>
                    <p className="text-sm font-semibold">
                      {isEnrolled ? "You are enrolled" : "Not enrolled"}
                    </p>
                    <p className="text-xs text-foreground/50 dark:text-muted">
                      {isEnrolled
                        ? "You have access to this course"
                        : "Enroll to get started"}
                    </p>
                  </div>
                </div>
                <Button
                  variant={isEnrolled ? "danger" : "primary"}
                  className="mt-3 w-full"
                  isDisabled={
                    enrollMutation.isPending ||
                    unenrollMutation.isPending
                  }
                  onPress={() =>
                    isEnrolled
                      ? unenrollMutation.mutate()
                      : enrollMutation.mutate()
                  }
                >
                  {isEnrolled ? "Unenroll" : "Enroll Now"}
                </Button>
              </Card.Content>
            </Card.Root>
          )}
          <Card.Root className="sticky top-24 mt-4 rounded-xl">
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
          {course.syllabus && (
            <Card.Root className="sticky top-24 mt-4 rounded-xl">
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
      </div>

      {relatedCourses.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-foreground dark:text-white">
            Related Courses
          </h2>
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
