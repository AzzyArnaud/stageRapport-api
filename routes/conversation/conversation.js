const express = require("express");
const conservation = express.Router();
const conversationController = require("../../controllers/conversation/conversationController");

// Route to fetch conversation ID based on article, buyer, and seller
conservation.get(
  "/conversation/:ID_ARTICLE/:ID_BUYER/:ID_SELLER",
  conversationController.getConversationId
);

module.exports = conservation;
