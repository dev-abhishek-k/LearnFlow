"use client";

import { useRouter } from "next/navigation";

import { useCreateCategory } from "@/modules/category/hooks/use-create-category";
import { useCategories } from "@/modules/category/hooks/use-categories";
import { useDeleteCategory } from "@/modules/category/hooks/use-delete-category";

import CategoryForm from "@/modules/category/components/category-form";
import CategoryList from "@/modules/category/components/category-list";

import type { Category } from "@/modules/category/components/category-table";

export default function AdminCategoriesPage() {
  const router = useRouter();

  const categoriesQuery = useCategories();

  const createCategoryMutation =
    useCreateCategory();

  const deleteCategoryMutation =
    useDeleteCategory();

  function handleCreateCategory(name: string) {
    createCategoryMutation.mutate({
      name,
    });
  }

  function handleDeleteCategory(id: string) {
    deleteCategoryMutation.mutate(id);
  }

  function handleEditCategory(category: Category) {
    router.push(`/admin/categories/${category.id}/edit`);
  }

  if (categoriesQuery.isLoading) {
    return (
      <main className="min-h-screen p-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-white/50">
            Loading categories...
          </p>
        </div>
      </main>
    );
  }

  if (categoriesQuery.isError) {
    return (
      <main className="min-h-screen p-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-red-400">
            {categoriesQuery.error.message}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">

        <div>
          <p className="text-sm font-medium text-cyan-400">
            Administration
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white">
            Categories
          </h1>

          <p className="mt-2 text-white/40">
            Create and manage course categories.
          </p>
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl backdrop-blur-2xl">

          <h2 className="mb-5 text-lg font-semibold text-white">
            Create Category
          </h2>

          <CategoryForm
            onSubmit={handleCreateCategory}
            isPending={createCategoryMutation.isPending}
          />
        </section>

        <CategoryList
          categories={categoriesQuery.data ?? []}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
        />

      </div>
    </main>
  );
}