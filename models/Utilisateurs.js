const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequerize");
const Profils = require("./Profils");
/**
 * Table utilisateurs
 *@author Vanny AZOSENGA
 *@date 31/08/2023
 */
const Utilisateurs = sequelize.define(
  "utilisateurs",
  {
    ID_UTILISATEUR: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    NOM_UTILISATEUR: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
    },
    PRENOM_UTILISATEUR: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
    },
    GENRE: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: null,
    },
    TELEPHONE: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: null,
    },
    EMAIL: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
    },
    PASSWORD: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
    },
    ADRESSE_UTILISATEUR: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
    },
    CNI: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: null,
    },
    NIF: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: null,
    },
    RC: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    IMAGE_UTILISATEUR: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    PROFILE_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    IS_ACTIVE: {
      type: DataTypes.TINYINT(4),
      allowNull: true,
      defaultValue: 1,
    },
  },
  {
    freezeTableName: true,
    tableName: "utilisateurs",
    timestamps: false,
  }
);

Utilisateurs.belongsTo(Profils, {
  foreignKey: "PROFILE_ID",
  as: "profil_user",
});
module.exports = Utilisateurs;
