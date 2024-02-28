const express = require("express");

const { createUser } = require("../controller/users.controller");

const usersRouter = express.Router();

usersRouter.post("/create", createUser);

module.exports = usersRouter;
