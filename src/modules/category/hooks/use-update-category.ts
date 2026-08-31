"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "@/modules/category/api/category-api";

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      name,
    }: {
      id: string;
      name: string;
    }) => updateCategory(id, { name }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}