const express = require("express");

const {
  createUser,
  getUser,
  updateUser,
  listUsers,
} = require("../controller/users.controller");

const usersRouter = express.Router();

usersRouter.post("/signUp", createUser);
usersRouter.post("/login", getUser);
usersRouter.put("/update/:id", updateUser);
usersRouter.get("/", listUsers);

module.exports = usersRouter;
