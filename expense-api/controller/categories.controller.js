const { sql } = require("../config/database");
const { v4: uuidv4 } = require("uuid");

// Create ---------------------------------------------
const createCategory = async (req, res) => {
  const { name } = req.body;
  const response =
    await sql`INSERT INTO categories(id, name) VALUES(${uuidv4()}, ${name})`;

  res.json(response);
};

// Read ---------------------------------------------
const getCategories = async (req, res) => {
  const result = await sql`SELECT * FROM categories`;
  res.json(result);
};

// Read one ---------------------------------------------
const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await sql`SELECT * FROM categories WHERE id = ${id}`;
    if (result.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(result[0]);
  } catch (error) {
    console.error("Failed to retrieve category:", error);
    res.status(500).json({
      message: "Failed to retrieve category due to an internal error",
    });
  }
};

// Delete ---------------------------------------------
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const result = await sql`delete from categories where id = ${id}`;
  res.json(result);
};

module.exports = {
  createCategory,
  getCategories,
  deleteCategory,
  getCategoryById,
};
