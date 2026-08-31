"use client";

import { Pencil, Trash2 } from "lucide-react";

export interface Category {
  id: string;
  name: string;
  createdAt?: string | Date;
}

interface CategoryTableProps {
  categories: Category[];
  onEdit?: (category: Category) => void;
  onDelete?: (id: string) => void;
}

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-white/10 bg-white/[0.04]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">
                Name
              </th>


              <th className="px-6 py-4 text-right text-sm font-semibold text-white/70">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-10 text-center text-sm text-white/40"
                >
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr
                  key={category.id}
                  className="transition-colors hover:bg-white/[0.03]"
                >
                  <td className="px-6 py-4 text-sm font-medium text-white">
                    {category.name}
                  </td>

                 

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit?.(category)}
                        className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                        aria-label="Edit category"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete?.(category.id)}
                        className="rounded-lg border border-red-400/10 bg-red-400/5 p-2 text-red-400 transition hover:bg-red-400/10"
                        aria-label="Delete category"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}