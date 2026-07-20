"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button, Card, Skeleton, Chip } from "@heroui/react";
import { FiPlus, FiTrash2, FiEye, FiBook, FiShield } from "react-icons/fi";
import { toast } from "react-toastify";
import { getCourses, deleteCourse } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import { useState } from "react";
import Image from "next/image";

export default function AdminPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session, isPending: authLoading } = useSession();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useQuery<any>({
    queryKey: ["courses", "all"],
    queryFn: () => getCourses({ limit: "100" }),
    enabled: !!session && session.user?.role === "admin",
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course deleted");
      setDeleteId(null);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to delete");
    },
  });

  if (authLoading) return null;

  if (!session) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-lg">Sign in to access the admin panel</p>
        <Button variant="primary" onPress={() => router.push("/login")}>
          Sign In
        </Button>
      </div>
    );
  }

  if (session.user?.role !== "admin") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <FiShield className="text-5xl text-danger" />
        <p className="text-lg">Access denied. Admin only.</p>
        <Button variant="ghost" onPress={() => router.push("/")}>
          Go Home
        </Button>
      </div>
    );
  }

  const courses = data?.courses || [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground dark:text-white">
            Admin Panel
          </h1>
          <p className="mt-1 text-foreground/60">
            Manage all courses on the platform
          </p>
        </div>
        <Button
          variant="primary"
          className="bg-primary text-white"
          onPress={() => router.push("/courses/new")}
        >
          <FiPlus /> Add Course
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card.Root key={i} className="rounded-xl">
              <Card.Content className="p-4">
                <Skeleton className="mb-2 h-40 w-full rounded-lg" />
                <Skeleton className="mb-2 h-5 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </Card.Content>
            </Card.Root>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
          <FiBook className="text-5xl text-default-300" />
          <p className="text-lg text-foreground/60">No courses yet</p>
          <Button
            variant="primary"
            className="bg-primary text-white"
            onPress={() => router.push("/courses/new")}
          >
            Create Your First Course
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course: any) => (
            <Card.Root key={course._id} className="overflow-hidden rounded-xl">
              <div className="relative aspect-video overflow-hidden bg-default-100">
                {course.image ? (
                  <Image
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="eager"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-3xl text-default-300">
                    <FiBook />
                  </div>
                )}
              </div>
              <Card.Content className="p-4">
                <div className="mb-1 flex items-center gap-2">
                  <Chip variant="soft" size="sm" className="text-xs">
                    {course.category}
                  </Chip>
                  <Chip variant="soft" size="sm" className="text-xs">
                    ${course.price}
                  </Chip>
                </div>
                <Card.Title className="mb-2 line-clamp-1 text-base">
                  {course.title}
                </Card.Title>
                <Card.Description className="mb-4 line-clamp-2 text-sm text-foreground/60">
                  {course.description}
                </Card.Description>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                    onPress={() => router.push(`/courses/${course._id}`)}
                  >
                    <FiEye /> View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                    onPress={() => router.push(`/courses/${course._id}/edit`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    isIconOnly
                    aria-label="Delete course"
                    onPress={() => setDeleteId(course._id)}
                  >
                    <FiTrash2 />
                  </Button>
                </div>
              </Card.Content>
            </Card.Root>
          ))}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card.Root className="w-full max-w-sm rounded-xl">
            <Card.Header>
              <Card.Title>Delete Course</Card.Title>
            </Card.Header>
            <Card.Content>
              <p className="text-sm text-foreground/70">
                Are you sure you want to delete this course? This action cannot
                be undone.
              </p>
            </Card.Content>
            <Card.Footer className="flex justify-end gap-2">
              <Button variant="ghost" onPress={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                isDisabled={deleteMutation.isPending}
                onPress={() => deleteId && deleteMutation.mutate(deleteId)}
              >
                Delete
              </Button>
            </Card.Footer>
          </Card.Root>
        </div>
      )}
    </div>
  );
}
