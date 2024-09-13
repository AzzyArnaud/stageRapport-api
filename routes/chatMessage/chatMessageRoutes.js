const express = require("express")
const chatController = require("../../controllers/chatMessage/chatMessageController")

const chatRoutes = express.Router()

chatRoutes.post("/send", chatController.sendMessage),
chatRoutes.get("/allMessage", chatController.getAllMessage)

module.exports = chatRoutes