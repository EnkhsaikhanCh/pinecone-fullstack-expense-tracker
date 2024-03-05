import { useEffect, useState } from "react";
import Select from "react-select";

const options = categories.map((category) => {
  return {
    value: category.id,
    label: category.name,
  };
});

export function CategorySelect() {
  const [categories, setCategories] = useState();

  useEffect(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error loading transactions", error.message);
    }
  }, []);

  return <Select options={options} />;
}
