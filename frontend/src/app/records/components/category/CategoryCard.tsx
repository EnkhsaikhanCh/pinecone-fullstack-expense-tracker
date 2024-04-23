import { Category } from "@/app/interface";
import { PiTrashDuotone } from "react-icons/pi";

export function CategoryCard({
  category,
  onDelete,
}: {
  category: Category;
  onDelete: (id: string) => void;
}) {
  return (
    <p
      key={category.id}
      className="mb-1 ml-2 flex items-center justify-between text-center"
    >
      {category.name}
      <button
        aria-label={`Delete category ${category.name}`}
        className="btn btn-ghost btn-sm w-8 p-0"
        onClick={() => onDelete(category.id)}
      >
        <PiTrashDuotone />
      </button>
    </p>
  );
}
