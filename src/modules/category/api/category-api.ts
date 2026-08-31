
import { CategoryInput, CategoryUpdateInput } from "@/modules/category/category.schema";
const CATEGORY_API = "/api/admin/categories";

// Get all categories
export async function getCategories() {
  const response = await fetch(CATEGORY_API, {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to fetch categories"
    );
  }

  return result.data;
}

// Create category
export async function createCategory(
  data: CategoryInput
) {
  const response = await fetch(CATEGORY_API, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to create category"
    );
  }

  return result;
}

// Update category
export async function updateCategory(
  id: string,
  data: CategoryUpdateInput
) {
  const response = await fetch(`${CATEGORY_API}/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to update category"
    );
  }

  return result;
}

// Delete category
export async function deleteCategory(id: string) {
  const response = await fetch(`${CATEGORY_API}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to delete category"
    );
  }

  return result;
}