const express = require("express");
const cors = require("cors");
const usersRouter = require("./router/users.router");
const transactionsRouter = require("./router/transactions.router");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/users", usersRouter);
app.use("/transactions", transactionsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
