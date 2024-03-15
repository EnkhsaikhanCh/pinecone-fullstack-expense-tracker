const express = require("express");

const {
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  getTotalAmount,
} = require("../controller/transactions.controller");

const transactionsRouter = express.Router();

transactionsRouter.post("/create", createTransaction);
transactionsRouter.get("/", getTransaction);
transactionsRouter.put("/update/:id", updateTransaction);
transactionsRouter.delete("/delete/:id", deleteTransaction);
transactionsRouter.get("/totalAmount", getTotalAmount);

module.exports = transactionsRouter;
