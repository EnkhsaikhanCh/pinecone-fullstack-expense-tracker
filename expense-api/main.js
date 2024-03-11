const express = require("express");
const cors = require("cors");
const usersRouter = require("./router/users.router");
const transactionsRouter = require("./router/transactions.router");
const categoriesRouter = require("./router/categories.router");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/users", usersRouter);
app.use("/transactions", transactionsRouter);
app.use("/categories", categoriesRouter);

// Login
const dbUsername = "email@gmail.com";
const dbPass = "12345678";

app.post("/login", (req, res) => {
  const { email, pass } = req.body;

  if (email !== dbUsername) {
    res.sendStatus(401);
    return;
  }

  if (pass !== dbPass) {
    res.sendStatus(401);
    return;
  }

  console.log({ email, pass });
  res.json(["Success"]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
