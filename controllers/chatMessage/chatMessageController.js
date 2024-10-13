const sequelize = require("../../utils/sequerize");
const ChatMessage = require("../../models/chatMessage");
const Conversation = require("../../models/Conversation");
const RESPONSE_STATUS = require("../../constants/RESPONSE_STATUS");
const RESPONSE_CODES = require("../../constants/RESPONSE_CODES");
const Utilisateurs = require("../../models/Utilisateurs");
const Articles = require("../../models/Articles");

const sendMessage = async (req, res, io) => {
  const transaction = await sequelize.transaction();
  try {
    const { MESSAGE, ID_ARTICLE, ID_BUYER, ID_SELLER } = req.body;

    // Validate required fields
    if (!ID_SELLER || !ID_BUYER || !ID_ARTICLE) {
      return res.status(400).json({
        statusCode: RESPONSE_CODES.BAD_REQUEST,
        httpStatus: RESPONSE_STATUS.BAD_REQUEST,
        message: "ID_SELLER, ID_BUYER, and ID_ARTICLE are required",
      });
    }

    // Check if a conversation already exists
    let conversation = await Conversation.findOne({
      where: { ID_ARTICLE, ID_BUYER, ID_SELLER },
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = await Conversation.create(
        {
          ID_BUYER,
          ID_SELLER,
          ID_ARTICLE,
          CREATED_AT: new Date(),
        },
        { transaction }
      );
    }

    // Create the new message
    const newMessage = await ChatMessage.create(
      {
        MESSAGE,
        ID_CONVERSATION: conversation.ID_CONVERSATION,
        DATE_ENVOYE: new Date(),
      },
      { transaction }
    );

    // Commit the transaction
    await transaction.commit();

    // Emit the message via socket.io
    if (io) {
      io.to(ID_ARTICLE).emit(
        `chatMessage:${conversation.ID_CONVERSATION}`,
        newMessage
      );
    }

    // Send success response
    res.status(RESPONSE_CODES.OK).json({
      statusCode: RESPONSE_CODES.OK,
      httpStatus: RESPONSE_STATUS.OK,
      message: "Message envoyé avec succès",
      result: {
        ID_ARTICLE: ID_ARTICLE,
        ID_BUYER: ID_BUYER,
        ID_SELLER: ID_SELLER,
        MESSAGE: newMessage.MESSAGE,
        DATE_ENVOYE: newMessage.DATE_ENVOYE,
        CONVERSATION_ID: conversation.ID_CONVERSATION,
      },
    });
  } catch (error) {
    // Rollback the transaction in case of an error
    await transaction.rollback();
    console.error("Error in sendMessage:", error);
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
      httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
      message: "Erreur interne du serveur",
    });
  }
};

const getAllMessagesForConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    // Fetch messages based on the conversationId
    const messages = await ChatMessage.findAll({
      where: {
        ID_CONVERSATION: conversationId,
      },
      order: [["DATE_ENVOYE", "ASC"]],
      include: [
        {
          model: Conversation,
          as: "conversation", // Utilisation correcte de l'alias 'conversation'
          include: [
            {
              model: Utilisateurs,
              as: "buyer", // Alias correct pour l'acheteur
              required: true,
            },
            {
              model: Utilisateurs,
              as: "seller", // Alias correct pour le vendeur
              required: true,
            },
            {
              model: Articles,
              as: "article", // Alias correct pour l'article
              required: true,
            },
          ],
        },
      ],
    });

    // Return messages as a response
    res.status(RESPONSE_CODES.OK).json({
      statusCode: RESPONSE_CODES.OK,
      httpStatus: RESPONSE_STATUS.OK,
      message: "Liste des messages",
      result: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
      httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
      message: "Erreur interne du serveur",
    });
  }
};

module.exports = { sendMessage, getAllMessagesForConversation };
