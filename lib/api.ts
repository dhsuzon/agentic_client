const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

let _bearerToken: string | null = null;

export function setApiToken(token: string | null) {
  _bearerToken = token;
}

export function getApiToken() {
  return _bearerToken;
}

export async function api<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (_bearerToken) {
    headers["Authorization"] = `Bearer ${_bearerToken}`;
  }
  const res = await fetch(`${API_URL}${endpoint}`, {
    credentials: "include",
    headers,
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || "Request failed");
  }
  return res.json();
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  ownerId: string;
  syllabus?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CoursesResponse {
  courses: Course[];
  pagination: Pagination;
}

export function getCourses(params?: Record<string, string>) {
  const query = params ? "?" + new URLSearchParams(params).toString() : "";
  return api<CoursesResponse>(`/api/courses${query}`);
}

export function getCourseById(id: string) {
  return api<{ course: Course }>(`/api/courses/${id}`);
}

export function createCourse(data: Partial<Course>) {
  return api<{ course: Course }>("/api/courses", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateCourse(id: string, data: Partial<Course>) {
  return api<{ course: Course }>(`/api/courses/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteCourse(id: string) {
  return api<{ message: string }>(`/api/courses/${id}`, {
    method: "DELETE",
  });
}

export function getMyCourses() {
  return api<{ courses: Course[] }>("/api/courses/my");
}

export function getCategories() {
  return api<{ categories: string[] }>("/api/courses/categories");
}

export function uploadToImgBB(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("image", file);
  return fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  ).then((r) => r.json());
}
