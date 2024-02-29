const express = require("express");

const {
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controller/transactions.controller");

const transactionsRouter = express.Router();

transactionsRouter.post("/create", createTransaction);
transactionsRouter.get("/", getTransaction);
transactionsRouter.put("/update/:id", updateTransaction);
transactionsRouter.delete("/delete/:id", deleteTransaction);

module.exports = transactionsRouter;
