const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequerize");
const Utilisateurs = require("./Utilisateurs");
const Articles = require("./Articles");

/**
 * Table chatmessages
 *@author Yvan Illich
 *@date 4/09/2024
 * Ce modèle sera utilisé pour stocker les messages provenant du chat en temps réel
 */
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
    ID_UTILISATEUR: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Utilisateurs, // correction ici pour s'assurer que le modèle correspond
        key: "ID_UTILISATEUR",
      },
    },
    ID_ARTICLE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Articles, // correction ici aussi pour s'assurer que le modèle correspond
        key: "ID_ARTICLE",
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

// Associations
ChatMessage.belongsTo(Utilisateurs, {
  foreignKey: "ID_UTILISATEUR",
  as: "utilisateur",
});

ChatMessage.belongsTo(Articles, {
  foreignKey: "ID_ARTICLE",
  as: "article",
});

module.exports = ChatMessage;
