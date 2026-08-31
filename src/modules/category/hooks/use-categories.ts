"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from"@/modules/category/api/category-api";
import type{Category} from"@/modules/category/components/category-table";
export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
        queryFn: async () => {
      const result = await getCategories();

      return result;
        }

  });
}