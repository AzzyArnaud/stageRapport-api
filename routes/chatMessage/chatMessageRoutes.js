const express = require("express");
const {
  sendMessage,
  getAllMessagesForConversation,
} = require("../../controllers/chatMessage/chatMessageController");
const router = express.Router();

module.exports = (io) => {
  router.post("/send", (req, res) => sendMessage(req, res, io));
  router.get("/conversation/:conversationId", getAllMessagesForConversation);
  return router;
};
