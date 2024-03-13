const express = require("express");
const cors = require("cors");
const usersRouter = require("./router/users.router");
const transactionsRouter = require("./router/transactions.router");
const categoriesRouter = require("./router/categories.router");
const { sql } = require("./config/database");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/users", usersRouter);
app.use("/transactions", transactionsRouter);
app.use("/categories", categoriesRouter);

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const users = await sql`SELECT * FROM users WHERE email=${email}`;

  const user = users[0];

  console.log({ user });

  if (user.password === password) {
    res.json(user);
  } else {
    res.status(500).json({ message: "email or password incorrect" });
  }

  console.log({ email, password });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
