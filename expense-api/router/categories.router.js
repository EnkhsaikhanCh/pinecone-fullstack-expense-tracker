const express = require("express");

const {
  createCategory,
  getCategory,
  deleteCategory,
} = require("../controller/categories.controller");

const categoriesRouter = express.Router();

categoriesRouter.post("/create", createCategory);
categoriesRouter.get("/", getCategory);
categoriesRouter.delete("/delete/:id", deleteCategory);

module.exports = categoriesRouter;
