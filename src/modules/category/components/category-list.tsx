"use client";

import { FolderOpen } from "lucide-react";

import CategoryTable, {
  Category,
} from "./category-table";

interface CategoryListProps {
  categories: Category[];
  onEdit?: (category: Category) => void;
  onDelete?: (id: string) => void;
}

export default function CategoryList({
  categories,
  onEdit,
  onDelete,
}: CategoryListProps) {
  return (
    <section className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 shadow-lg shadow-blue-500/20">
          <FolderOpen className="h-5 w-5 text-white" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            Categories
          </h2>

          <p className="text-sm text-white/40">
            Manage your course categories
          </p>
        </div>
      </div>

      <CategoryTable
        categories={categories}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </section>
  );
}