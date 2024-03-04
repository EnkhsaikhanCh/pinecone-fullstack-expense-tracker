const { sql } = require("../config/database");

// Create ---------------------------------------------
const createTransaction = async (req, res) => {
  const { amount, category_id } = req.body;
  const response =
    await sql`INSERT INTO transactions(amount, category_id) values(${amount}, ${category_id})`;

  res.json(response);
};

// Read ---------------------------------------------
const getTransaction = async (req, res) => {
  const result =
    await sql`SELECT transactions.id, amount, category_id, categories.name category_name FROM transactions LEFT JOIN categories ON transactions.category_id = categories.id;`;
  res.json(result);
};

// Update ---------------------------------------------
const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { title, amount, description } = req.body;

  const result =
    await sql`UPDATE transactions SET title = ${title}, amount = ${amount}, description = ${description} WHERE transaction_id = ${id}`;
  res.json(result);
};

// Delete ---------------------------------------------
const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const result = await sql`delete from transactions where id = ${id}`;
  res.json(result);
};

module.exports = {
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
