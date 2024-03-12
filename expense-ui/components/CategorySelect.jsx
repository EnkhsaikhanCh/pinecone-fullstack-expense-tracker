import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

export function CategorySelect({ onSelectChange, open }) {
  const [categories, setCategories] = useState([]);

  function loadCategories() {
    axios.get(`http://localhost:3000/categories`).then((response) => {
      setCategories(response.data);
    });
  }

  const options = categories.map((category) => {
    return {
      value: category.id,
      label: category.name,
    };
  });

  useEffect(() => {
    if (open) {
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
        instanceId={"Category"}
        options={options}
        styles={colorStyle}
        onChange={(val) => {
          onSelectChange(val.value);
        }}
      />
    </label>
  );
}
