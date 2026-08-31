"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "@/modules/category/api/category-api";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
        
      });
    },
  });
}