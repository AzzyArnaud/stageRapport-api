const express = require("express");
const chatController = require("../../controllers/chatMessage/chatMessageController");

const chatRoutes = express.Router();

// Route pour envoyer un message
chatRoutes.post("/send", (req, res) =>
  chatController.sendMessage(req, res, req.app.get("io"))
);

// Route pour récupérer tous les messages
chatRoutes.get("/allMessage", chatController.getAllMessage);

module.exports = chatRoutes;
