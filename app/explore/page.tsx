"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@heroui/react";
import { FiSearch, FiX } from "react-icons/fi";
import CourseCard, { CourseCardSkeleton } from "@/components/CourseCard";
import { getCourses, getCategories, CoursesResponse } from "@/lib/api";

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const params: Record<string, string> = {};
  if (search) params.search = search;
  if (category) params.category = category;
  if (minPrice) params.minPrice = minPrice;
  if (maxPrice) params.maxPrice = maxPrice;
  if (sort) params.sort = sort;
  params.page = String(page);
  params.limit = "8";

  const { data, isLoading } = useQuery<CoursesResponse>({
    queryKey: ["courses", params],
    queryFn: () => getCourses(params),
  });

  const { data: catData } = useQuery<{ categories: string[] }>({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  useEffect(() => {
    setPage(1);
  }, [search, category, minPrice, maxPrice, sort]);

  const hasFilters = search || category || minPrice || maxPrice || sort !== "newest";

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSort("newest");
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Explore Courses</h1>
        <p className="mt-1 text-foreground/60">
          Discover courses powered by AI
        </p>
      </div>

      <div className="mb-6 flex flex-wrap items-end gap-3">
        <div className="relative min-w-[200px] flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-default-400" />
          <input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-default-200 bg-background pl-10 pr-3 text-sm outline-none focus:border-primary"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-10 w-40 rounded-lg border border-default-200 bg-background px-3 text-sm outline-none focus:border-primary"
        >
          <option value="">All Categories</option>
          {catData?.categories?.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-1">
          <input
            type="number"
            min="0"
            placeholder="Min $"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="h-10 w-20 rounded-lg border border-default-200 bg-background px-2 text-sm outline-none focus:border-primary [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="text-foreground/40">-</span>
          <input
            type="number"
            min="0"
            placeholder="Max $"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="h-10 w-20 rounded-lg border border-default-200 bg-background px-2 text-sm outline-none focus:border-primary [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-10 w-36 rounded-lg border border-default-200 bg-background px-3 text-sm outline-none focus:border-primary"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="price_asc">Price: Low</option>
          <option value="price_desc">Price: High</option>
        </select>

        {hasFilters && (
          <Button variant="ghost" size="sm" onPress={clearFilters}>
            <FiX /> Clear
          </Button>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))
          : data?.courses?.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
      </div>

      {data?.courses?.length === 0 && !isLoading && (
        <div className="py-16 text-center text-foreground/60">
          <p className="text-lg">No courses found</p>
          <p>Try adjusting your search or filters</p>
        </div>
      )}

      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            isDisabled={page <= 1}
            onPress={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <span className="px-4 text-sm">
            Page {page} of {data.pagination.totalPages}
          </span>
          <Button
            variant="ghost"
            isDisabled={page >= data.pagination.totalPages}
            onPress={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
