const express = require("express");
const {
  createUser,
  getUser,
  updateUser,
  listUsers,
  checkUsername,
} = require("../controller/users.controller");
const { checkAuth } = require("../middleware/checkAuth");

const usersRouter = express.Router();

usersRouter.post("/signUp", createUser);
usersRouter.post("/login", getUser);
usersRouter.put("/update/:id", updateUser);
usersRouter.get("/", listUsers);
usersRouter.get("/checkUsername", checkUsername);

module.exports = usersRouter;
