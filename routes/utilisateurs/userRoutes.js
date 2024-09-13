const express = require("express")
const user_controler = require("../../controllers/utilisateurs/UserController")

const UserRoutes = express.Router()

UserRoutes.post("/signup", user_controler.userSignUp)
UserRoutes.post("/login", user_controler.signInUser)

module.exports = UserRoutes