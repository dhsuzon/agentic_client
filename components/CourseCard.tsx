"use client";

import { Card, Button, Skeleton } from "@heroui/react";
import Link from "next/link";
import { FiClock, FiDollarSign } from "react-icons/fi";
import type { Course } from "@/lib/api";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card.Root className="group h-full overflow-hidden rounded-xl transition-shadow hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden bg-default-100">
        {course.image ? (
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl text-default-300">
            <FiClock />
          </div>
        )}
        <div className="absolute right-2 top-2">
          <span className="rounded-full bg-primary/90 px-2 py-1 text-xs text-white">
            {course.category}
          </span>
        </div>
      </div>

      <Card.Content className="flex flex-1 flex-col gap-2 p-4">
        <Card.Title className="line-clamp-1 text-base">{course.title}</Card.Title>
        <Card.Description className="line-clamp-2 text-sm text-foreground/60">
          {course.description}
        </Card.Description>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 text-sm font-semibold text-primary">
            <FiDollarSign className="text-base" />
            {course.price === 0 ? "Free" : course.price}
          </div>
          <Link href={`/courses/${course._id}`}>
            <Button variant="primary" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </Card.Content>
    </Card.Root>
  );
}

export function CourseCardSkeleton() {
  return (
    <Card.Root className="overflow-hidden rounded-xl">
      <Skeleton className="aspect-video w-full" />
      <Card.Content className="p-4">
        <Skeleton className="mb-2 h-5 w-3/4" />
        <Skeleton className="mb-1 h-4 w-full" />
        <Skeleton className="mb-4 h-4 w-2/3" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-8 w-28 rounded-lg" />
        </div>
      </Card.Content>
    </Card.Root>
  );
}
