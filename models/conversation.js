const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequerize");
const Utilisateurs = require("./Utilisateurs");
const Articles = require("./Articles");

const Conversation = sequelize.define(
  "conversations",
  {
    ID_CONVERSATION: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    ID_BUYER: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Utilisateurs,
        key: "ID_UTILISATEUR",
      },
    },
    ID_SELLER: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Utilisateurs,
        key: "ID_UTILISATEUR",
      },
    },
    ID_ARTICLE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Articles,
        key: "ID_ARTICLE",
      },
    },
    CREATED_AT: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
    tableName: "conversations",
    timestamps: false,
  }
);

Conversation.belongsTo(Utilisateurs, {
  foreignKey: "ID_BUYER",
  as: "buyer",
});

Conversation.belongsTo(Utilisateurs, {
  foreignKey: "ID_SELLER",
  as: "seller",
});

Conversation.belongsTo(Articles, {
  foreignKey: "ID_ARTICLE",
  as: "article",
});

module.exports = Conversation;
