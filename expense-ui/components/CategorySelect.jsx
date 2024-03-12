import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

export function CategorySelect({ onSelectChange, open }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (open) {
      const loadCategories = () => {
        axios
          .get(`http://localhost:3000/categories`)
          .then((response) => {
            const categoryOptions = response.data.map((category) => ({
              value: category.id,
              label: category.name,
            }));
            setCategories(categoryOptions);
          })
          .catch((error) => console.error("Failed to load categories:", error));
      };

      loadCategories();
    }
  }, [open]);

  const colorStyle = {
    control: (styles) => ({ ...styles, backgroundColor: "#F3F4F6" }),
  };

  return (
    <label>
      <div className="label">
        <p className="label-text text-[#808080]">Category</p>
      </div>
      <Select
        instanceId="CategorySelect"
        options={categories}
        styles={colorStyle}
        onChange={(val) => {
          onSelectChange(val.value);
        }}
        aria-activedescendant={open ? "your-activedescendant-id" : undefined}
      />
    </label>
  );
}
