const { sql } = require("../config/database");

// Create ---------------------------------------------
const createCategory = async (req, res) => {
  const { id, name } = req.body;
  const response =
    await sql`INSERT INTO categories(id, name) VALUES(${id}, ${name})`;

  res.json(response);
};

const getCategory = async (req, res) => {
  const result = await sql`SELECT * FROM categories`;
  res.json(result);
};

module.exports = {
  createCategory,
  getCategory,
};
