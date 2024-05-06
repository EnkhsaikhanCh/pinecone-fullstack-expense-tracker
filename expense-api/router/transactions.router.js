const express = require("express");

const {
  createTransaction,
  getTransactionById,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getTotalAmount,
  getNetBalance,
} = require("../controller/transactions.controller");

const transactionsRouter = express.Router();

transactionsRouter.post("/create", createTransaction);
transactionsRouter.get("/", getTransactions);
transactionsRouter.get("/totalAmount", getTotalAmount);
transactionsRouter.get("/balance", getNetBalance);
transactionsRouter.get("/:id", getTransactionById);
transactionsRouter.put("/:id", updateTransaction);
transactionsRouter.delete("/:id", deleteTransaction);

module.exports = transactionsRouter;
