const express = require("express")
const category_controler = require("../../controllers/cotegories/categoriesController")

const categoriesRouter = express.Router()

categoriesRouter.get("/categories", category_controler.getAllCategory)
categoriesRouter.get("/categories/articles", category_controler.getAllArticles)

module.exports = categoriesRouter