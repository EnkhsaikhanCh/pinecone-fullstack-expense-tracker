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
const getCategory = async (req, res) => {
  const result = await sql`SELECT * FROM categories`;
  res.json(result);
};

// Delete ---------------------------------------------
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const result = await sql`delete from categories where id = ${id}`;
  res.json(result);
};

module.exports = {
  createCategory,
  getCategory,
  deleteCategory,
};

// drop table transactions
// create table transactions again

// drop table categories
// create table categories (change id logic)
