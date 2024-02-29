const express = require("express");

const {
  createUser,
  getUser,
  updateUser,
} = require("../controller/users.controller");

const usersRouter = express.Router();

usersRouter.post("/create", createUser);
usersRouter.get("/", getUser);
usersRouter.put("/update/:id", updateUser);
// usersRouter.delete("/delete/:id", deleteUser);

module.exports = usersRouter;
