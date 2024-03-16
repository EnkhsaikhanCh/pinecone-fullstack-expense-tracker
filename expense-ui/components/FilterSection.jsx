import { useEffect, useState } from "react";
import { AddRecordButton } from "./AddRecordButton";
import { AddCategoryButton } from "./AddCategoryButton";
import { PiTrashDuotone } from "react-icons/pi";
import axios from "axios";

const API_BASE_URL = `http://localhost:3000/categories`;

export function FilterSection({ loadTransactions }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadCategory() {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get(API_BASE_URL);
      setCategories(response.data);
    } catch (error) {
      console.error("Error loading categories", error.message);
      setError("Failed to load categories.");
    } finally {
      setIsLoading(false);
    }
  }

  function deleteCategory(id) {
    if (window.confirm("Delete?")) {
      axios
        .delete(`${API_BASE_URL}/delete/${id}`)
        .then(() => {
          loadCategory();
        })
        .catch((error) => {
          console.error("Error deleting category", error.message);
          setError("Failed to delete category.");
        });
    }
  }

  useEffect(() => {
    loadCategory();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (isLoading) {
    return <CategorySkeleton />;
  }

  return (
    <div className="card flex justify-between rounded-md bg-white px-4 py-2">
      <div>
        <AddRecordButton onComplete={loadTransactions} />
        <div className="mt-3 flex flex-col">
          <h1 className="font-bold">Category</h1>
          {categories.length > 0 ? (
            categories.map((category) => (
              <p
                key={category.id}
                className="mb-1 ml-2 flex items-center justify-between text-center"
              >
                {category.name}
                <button
                  className="btn btn-ghost btn-sm w-8 p-0"
                  onClick={() => deleteCategory(category.id)}
                >
                  <PiTrashDuotone />
                </button>
              </p>
            ))
          ) : (
            <div>No categories found.</div>
          )}
        </div>
      </div>
      <AddCategoryButton onComplete={loadCategory} />
    </div>
  );
}

function CategorySkeleton() {
  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="skeleton h-[30px] w-full rounded-md"></div>
        <div className="skeleton h-[30px] w-full rounded-md"></div>
        <div className="skeleton h-[30px] w-full rounded-md"></div>
      </div>
    </>
  );
}
