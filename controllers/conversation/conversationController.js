// Import the response codes and statuses
const RESPONSE_STATUS = require("../../constants/RESPONSE_STATUS");
const RESPONSE_CODES = require("../../constants/RESPONSE_CODES");

const Conversation = require("../../models/Conversation");

// Controller function to get conversation ID based on article, buyer, and seller
const getConversationId = async (req, res) => {
  try {
    const { ID_ARTICLE, ID_BUYER, ID_SELLER } = req.params;

    // Find the conversation based on the article, buyer, and seller
    const conversation = await Conversation.findOne({
      where: {
        ID_ARTICLE,
        ID_BUYER,
        ID_SELLER,
      },
    });

    // If the conversation exists, return the conversation ID
    if (conversation) {
      return res.status(RESPONSE_CODES.OK).json({
        statusCode: RESPONSE_CODES.OK,
        httpStatus: RESPONSE_STATUS.OK,
        message: "Conversation found",
        result: { ID_CONVERSATION: conversation.ID_CONVERSATION },
      });
    } else {
      // If no conversation is found, return a not found response
      return res.status(RESPONSE_CODES.NOT_FOUND).json({
        statusCode: RESPONSE_CODES.NOT_FOUND,
        httpStatus: RESPONSE_STATUS.NOT_FOUND,
        message: "Conversation not found",
      });
    }
  } catch (error) {
    return res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
      httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
    });
  }
};

module.exports = { getConversationId };
