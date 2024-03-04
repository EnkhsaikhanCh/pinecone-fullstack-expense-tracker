const express = require("express");

const {
  createCategory,
  getCategory,
} = require("../controller/categories.controller");

const categoriesRouter = express.Router();

categoriesRouter.post("/create", createCategory);
categoriesRouter.get("/", getCategory);

module.exports = categoriesRouter;
