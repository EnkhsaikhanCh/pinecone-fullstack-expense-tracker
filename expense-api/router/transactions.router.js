const express = require("express");

const { createTransactions } = require("../controller/transactions.controller");

const usersRouter = express.Router();

usersRouter.post("/create", createTransactions);

module.exports = usersRouter;
