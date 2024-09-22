const Message = require("../../models/chatMessage");
const RESPONSE_STATUS = require("../../constants/RESPONSE_STATUS");
const RESPONSE_CODES = require("../../constants/RESPONSE_CODES");

// Fonction pour envoyer un message
const sendMessage = async (req, res, io) => {
  try {
    const { MESSAGE, ID_ARTICLE, ID_UTILISATEUR } = req.body;
    const newMessage = await Message.create({
      MESSAGE,
      ID_ARTICLE,
      ID_UTILISATEUR,
    });

    // Envoyer le message à tous les utilisateurs via Socket.IO
    io.emit("chatMessage", newMessage);

    res.status(RESPONSE_CODES.OK).json({
      statusCode: RESPONSE_CODES.OK,
      httpStatus: RESPONSE_STATUS.OK,
      message: "Message envoyé avec succès",
      result: newMessage,
    });
  } catch (error) {
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
      httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
      message: "Erreur interne du serveur",
    });
  }
};

// Fonction pour obtenir tous les messages
const getAllMessage = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.status(RESPONSE_CODES.OK).json({
      statusCode: RESPONSE_CODES.OK,
      httpStatus: RESPONSE_STATUS.OK,
      message: "Liste des messages",
      result: messages,
    });
  } catch (error) {
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
      httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
      message: "Erreur interne du serveur",
    });
  }
};

module.exports = { sendMessage, getAllMessage };
