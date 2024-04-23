const { sql } = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

// Create ---------------------------------------------
const createTransaction = async (req, res) => {
  try {
    const { amount, category_id, date } = req.body;

    const response =
      await sql`INSERT INTO transactions(id, amount, category_id, date) values(${uuidv4()}, ${amount}, ${category_id}, ${date})`;
    res.status(201).json({ success: true, data: response });
  } catch (error) {
    console.error("Failed to create transaction:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Read ---------------------------------------------
const getTransaction = async (req, res) => {
  try {
    const result =
      await sql`SELECT transactions.id, amount, category_id, categories.name category_name, date FROM transactions LEFT JOIN categories on transactions.category_id = categories.id;`;
    res.json(result);
  } catch (err) {
    console.log({ err });
    return res.sendStatus(403);
  }
};

// Update ---------------------------------------------
const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { title, amount, description } = req.body;

  const result =
    await sql`UPDATE transactions SET title = ${title}, amount = ${amount}, description = ${description} WHERE id = ${id}`;
  res.json(result);
};

// Delete ---------------------------------------------
const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const result = await sql`delete from transactions where id = ${id}`;
  res.json(result);
};

// Expense & Income total amount ----------------------
const getTotalAmount = async (req, res) => {
  const incomeSum =
    await sql`SELECT SUM(amount::numeric::float8) AS sum FROM transactions WHERE amount::numeric::float8 > 0;`;
  const expenseSum =
    await sql`SELECT SUM(amount::numeric::float8) AS sum FROM transactions WHERE amount::numeric::float8 < 0;`;
  res.json({
    incomeSum: incomeSum[0].sum || 0,
    expenseSum: expenseSum[0].sum || 0,
  });
};

// Calculate Balance ----------------------------------
const getNetBalance = async (req, res) => {
  try {
    const result =
      await sql`SELECT SUM(amount) AS net_balance FROM transactions;`;
    const netBalance = result[0].net_balance;

    res.status(200).json({
      success: true,
      netBalance: netBalance,
    });
  } catch (error) {
    console.error("Failed to fetch net balance:", error);
    res.status(500).json({
      success: false,
      message: "Failed to calculate net balance",
      error: error.message,
    });
  }
};

module.exports = {
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  getTotalAmount,
  getNetBalance,
};
