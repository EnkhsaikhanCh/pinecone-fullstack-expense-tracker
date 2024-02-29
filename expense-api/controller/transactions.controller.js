const { sql } = require("../config/database");

// Create ---------------------------------------------
const createTransaction = async (req, res) => {
  const { title, amount, description } = req.body;
  const response =
    await sql`insert into transactions(title, amount, description) values(${title}, ${amount}, ${description})`;

  res.json(response);
};

// Read ---------------------------------------------
const getTransaction = async (req, res) => {
  const result = await sql`select * from transactions`;
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
  const result =
    await sql`delete from transactions where transaction_id = ${id}`;
  res.json(result);
};

module.exports = {
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
