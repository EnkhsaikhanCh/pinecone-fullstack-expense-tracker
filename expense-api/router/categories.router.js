const express = require("express");

const {
  createCategory,
  getCategories,
  deleteCategory,
  getCategoryById,
} = require("../controller/categories.controller");

const categoriesRouter = express.Router();

categoriesRouter.post("/create", createCategory);
categoriesRouter.get("/:id", getCategoryById);
categoriesRouter.get("/", getCategories);
categoriesRouter.delete("/delete/:id", deleteCategory);

module.exports = categoriesRouter;
