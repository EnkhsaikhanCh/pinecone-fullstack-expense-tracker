import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

export function CategorySelect({ onSelectChange }) {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState();

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
    loadCategories();
  }, []);

  return (
    <label>
      <div className="label">
        <p className="label-text text-[#808080]">Category</p>
      </div>
      <Select
        options={options}
        className="text-black "
        onChange={(val) => {
          setSelected(val);
          onSelectChange(val.value);
        }}
      />
    </label>
  );
}
