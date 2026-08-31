"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCategories } from "@/modules/category/hooks/use-categories";
import { useUpdateCategory } from "@/modules/category/hooks/use-update-category";
import   Button from "@/components/common/button/Button";
interface CategoryEditFormProps {
  id: string;
}

export default function CategoryEditForm({
  id,
}: CategoryEditFormProps) {
  const router = useRouter();

  const {
    data: categories,
    isPending: isLoading,
    isError,
  } = useCategories();

const category = categories?.find(
  (category) => category.id === id
);
  const updateCategoryMutation =
    useUpdateCategory();

  const [name, setName] = useState("");

  // Data load hone ke baad state update
  // Iske liye controlled input ke default handling karenge.

  if (isLoading) {
    return (
      <p className="text-white">
        Loading category...
      </p>
    );
  }

  if (isError || !category) {
    return (
      <p className="text-red-400">
        Failed to load category.
      </p>
    );
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    updateCategoryMutation.mutate(
      {
        id,
        name,
      },
      {
        onSuccess: () => {
          router.push("/admin/categories");
        },
      }
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-white"
        >
          Category Name
        </label>

        <input
          id="name"
          type="text"
          defaultValue={category.name}
          onChange={(event) =>
            setName(event.target.value)
          }
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
        />
      </div>

      {updateCategoryMutation.isError && (
        <p className="text-red-400">
          Failed to update category.
        </p>
      )}

      <div className="flex gap-3">
        <Button
          type="button"
          onClick={() => router.back()}
          
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={updateCategoryMutation.isPending}
          
        >
          {updateCategoryMutation.isPending
            ? "Updating..."
            : "Update Category"}
        </Button>
      </div>
    </form>
  );
}