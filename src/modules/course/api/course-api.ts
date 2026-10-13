import type { CreateCourseInput, UpdateCourseInput } from "../course.schema";

export interface Course {
  id: string;
  title: string;
  description: string;
  price: string | number;
  level: CreateCourseInput["level"];
  language: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  categoryId: string;
  thumbnail: string | null;
  thumbnailUrl?: string | null;
  shortDescription?: string | null;
}

const endpoint = "/api/teacher/course";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, { credentials: "include", ...options });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Course request failed");
  return result.data as T;
}

export const getCourses = () => request<Course[]>(endpoint);
export const getCourse = (id: string) => request<Course>(`${endpoint}/${id}`);
export const createCourse = (data: CreateCourseInput) =>
  request<Course>(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
export const updateCourse = (id: string, data: UpdateCourseInput) =>
  request<Course>(`${endpoint}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
export const deleteCourse = (id: string) =>
  request<Course>(`${endpoint}/${id}`, { method: "DELETE" });
