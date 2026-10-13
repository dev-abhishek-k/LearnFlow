"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCourse, deleteCourse, getCourse, getCourses, updateCourse } from "../api/course-api";

export function useCourses() {
  return useQuery({ queryKey: ["courses"], queryFn: getCourses });
}

export function useCourse(id: string) {
  return useQuery({ queryKey: ["courses", id], queryFn: () => getCourse(id) });
}

export function useUpdateCourse(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Parameters<typeof updateCourse>[1]) => updateCourse(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses", id] });
    },
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCourse,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses"] }),
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses"] }),
  });
}
