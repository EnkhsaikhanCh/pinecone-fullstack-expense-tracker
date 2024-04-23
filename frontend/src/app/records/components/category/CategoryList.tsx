"use client";

import { useEffect } from "react";
import { useCategories } from "@/app/utils";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { CategorySkeleton } from "./CategorySkeleton";
import { CategoryCard } from "./CategoryCard";

export function CategoriesList() {
  const { categories, loadCategories, isLoading, error } = useCategories();

  useEffect(() => {
    loadCategories();
  }, []);

  async function deleteCategory(id: string) {
    if (window.confirm("Delete?")) {
      try {
        await axios.delete(`http://localhost:4000/categories/delete/${id}`);
        toast.success("Category successfully deleted");
        loadCategories();
      } catch (error) {
        console.error("Failed to delete category", error);
        toast.error("Failed to delete category");
      }
    }
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (isLoading) {
    return <CategorySkeleton />;
  }

  if (categories === null) {
    return <CategorySkeleton />;
  }

  if (categories.length === 0) {
    return (
      <div className="my-3 text-center text-sm font-semibold text-gray-500">
        No categories found.
      </div>
    );
  }

  return (
    <div className="mt-3 flex flex-col">
      <Toaster position="bottom-right" richColors />

      <h1 className="font-bold">Category</h1>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onDelete={deleteCategory}
        />
      ))}
    </div>
  );
}
