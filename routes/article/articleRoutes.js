const express = require("express")
const article_controller = require("../../controllers/article/articleController")

const ArticleRoutes = express.Router()

ArticleRoutes.post("/add", article_controller.AddArticle)
// categoriesRouter.get("/categories/articles", article_controller.getAllArticles)

module.exports = ArticleRoutes