"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button, Card } from "@heroui/react";
import { FiPlus, FiShield, FiUsers, FiBookOpen, FiBook, FiGrid, FiTrendingUp, FiMonitor } from "react-icons/fi";
import { getAdminStats } from "@/lib/api";
import { useSession } from "@/lib/auth-client";

export default function AdminPage() {
  const router = useRouter();
  const { data: session, isPending: authLoading } = useSession();

  const { data: statsData } = useQuery<any>({
    queryKey: ["admin-stats"],
    queryFn: getAdminStats,
    enabled: !!session && session.user?.role === "admin",
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground dark:text-white">
            Admin Panel
          </h1>
          <p className="mt-1 text-foreground/60">
            Dashboard overview
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

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
        <Card.Root className="rounded-xl">
          <Card.Content className="flex flex-col items-center gap-1 p-4 text-center">
            <FiBookOpen className="text-2xl text-primary" />
            <p className="text-2xl font-bold">{statsData?.totalCourses ?? "-"}</p>
            <p className="text-sm text-foreground/60">Total Courses</p>
          </Card.Content>
        </Card.Root>
        <Card.Root className="rounded-xl">
          <Card.Content className="flex flex-col items-center gap-1 p-4 text-center">
            <FiUsers className="text-2xl text-primary" />
            <p className="text-2xl font-bold">{statsData?.totalUsers ?? "-"}</p>
            <p className="text-sm text-foreground/60">Total Users</p>
          </Card.Content>
        </Card.Root>
        <Card.Root className="rounded-xl">
          <Card.Content className="flex flex-col items-center gap-1 p-4 text-center">
            <FiBook className="text-2xl text-primary" />
            <p className="text-2xl font-bold">{statsData?.totalEnrollments ?? "-"}</p>
            <p className="text-sm text-foreground/60">Total Enrollments</p>
          </Card.Content>
        </Card.Root>
        <Card.Root className="rounded-xl">
          <Card.Content className="flex flex-col items-center gap-1 p-4 text-center">
            <FiGrid className="text-2xl text-primary" />
            <p className="text-2xl font-bold">{statsData?.totalCategories ?? "-"}</p>
            <p className="text-sm text-foreground/60">Total Categories</p>
          </Card.Content>
        </Card.Root>
        <Card.Root className="rounded-xl">
          <Card.Content className="flex flex-col items-center gap-1 p-4 text-center">
            <FiTrendingUp className="text-2xl text-primary" />
            <p className="text-2xl font-bold truncate max-w-full">{statsData?.topCategory ?? "-"}</p>
            <p className="text-sm text-foreground/60">Most Used Category</p>
          </Card.Content>
        </Card.Root>
        <Card.Root className="rounded-xl">
          <Card.Content className="flex flex-col items-center gap-1 p-4 text-center">
            <FiMonitor className="text-2xl text-primary" />
            <p className="text-2xl font-bold">1</p>
            <p className="text-sm text-foreground/60">Platform</p>
          </Card.Content>
        </Card.Root>
      </div>
    </div>
  );
}
