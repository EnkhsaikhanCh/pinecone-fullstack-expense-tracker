const express = require("express");
const usersRouter = require("./router/users.router");
const transactionsRouter = require("./router/transactions.router");
var cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/users", usersRouter);
app.use("/transactions", transactionsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
