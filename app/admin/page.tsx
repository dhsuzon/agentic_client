"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button, Card, Skeleton } from "@heroui/react";
import { FiPlus, FiShield, FiUsers, FiBookOpen, FiBook, FiGrid, FiTrendingUp, FiMonitor } from "react-icons/fi";
import { getAdminStats } from "@/lib/api";
import { useSession } from "@/lib/auth-client";

const statCards = [
  { icon: FiBookOpen, label: "Total Courses", key: "totalCourses" as const },
  { icon: FiUsers, label: "Total Users", key: "totalUsers" as const },
  { icon: FiBook, label: "Total Enrollments", key: "totalEnrollments" as const },
  { icon: FiGrid, label: "Total Categories", key: "totalCategories" as const },
  { icon: FiTrendingUp, label: "Most Used Category", key: "topCategory" as const },
  { icon: FiMonitor, label: "Platform", key: "platform" as const },
];

function StatCardSkeleton() {
  return (
    <Card.Root className="rounded-xl">
      <Card.Content className="flex flex-col items-center gap-3 p-4 text-center">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-7 w-16 rounded-lg" />
        <Skeleton className="h-4 w-20 rounded-lg" />
      </Card.Content>
    </Card.Root>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const { data: session, isPending: authLoading } = useSession();

  const { data: statsData, isPending } = useQuery<any>({
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
        {isPending
          ? Array.from({ length: 6 }).map((_, i) => <StatCardSkeleton key={i} />)
          : statCards.map((card) => {
              const Icon = card.icon;
              let value: string | number;
              if (card.key === "platform") {
                value = 1;
              } else if (card.key === "topCategory") {
                value = statsData?.[card.key] ?? "-";
              } else {
                value = statsData?.[card.key] ?? "-";
              }
              return (
                <Card.Root key={card.key} className="rounded-xl">
                  <Card.Content className="flex flex-col items-center gap-1 p-4 text-center">
                    <Icon className="text-2xl text-primary" />
                    <p className={`text-2xl font-bold ${card.key === "topCategory" ? "truncate max-w-full" : ""}`}>
                      {value}
                    </p>
                    <p className="text-sm text-foreground/60">{card.label}</p>
                  </Card.Content>
                </Card.Root>
              );
            })}
      </div>
    </div>
  );
}
