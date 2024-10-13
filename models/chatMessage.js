const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequerize");
const Conversation = require("./Conversation");

const ChatMessage = sequelize.define(
  "chatmessages",
  {
    ID_MESSAGE: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    MESSAGE: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ID_CONVERSATION: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Conversation,
        key: "ID_CONVERSATION",
      },
    },
    DATE_ENVOYE: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
    tableName: "chatmessages",
    timestamps: false,
  }
);

ChatMessage.belongsTo(Conversation, {
  foreignKey: "ID_CONVERSATION",
  as: "conversation",
});

module.exports = ChatMessage;
