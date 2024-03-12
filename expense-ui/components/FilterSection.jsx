import { useEffect, useState } from "react";
import { AddRecordButton } from "./AddRecordButton";
import { AddCategoryButton } from "./AddCategoryButton";
import { PiTrashDuotone } from "react-icons/pi";

import axios from "axios";

const API_BASE_URL = `http://localhost:3000/categories`;

export function FilterSection({ loadTransactions }) {
  const [categories, setCategories] = useState([]);

  async function loadCategory() {
    try {
      const response = await axios.get(API_BASE_URL);
      console.log({ response });
      setCategories(response.data);
    } catch (error) {
      console.error("Error loading transactions", error.message);
    }
  }

  // Delete ---------------------------------------------
  function deleteCategory(id) {
    try {
      if (window.confirm("Delete?")) {
        axios.delete(`${API_BASE_URL}/delete/${id}`).then(() => {
          loadCategory();
        });
      }
    } catch (error) {
      console.error("Error loading transactions", error.message);
    }
  }

  useEffect(() => {
    loadCategory();
  }, []);

  return (
    <div className="card flex justify-between rounded-md bg-white px-4 py-2 md:w-[300px]">
      <div>
        <AddRecordButton onComplete={loadTransactions} />
        <div className="mt-3 flex flex-col">
          <h1 className="font-bold">Category</h1>
          {categories.map((category) => (
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
          ))}
        </div>
      </div>
      <AddCategoryButton onComplete={loadCategory} />
    </div>
  );
}
