const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequerize");
const Utilisateurs = require("./Utilisateurs");
const Categories = require("./Categories");
const Articles = sequelize.define(
  "articles",
  {
    ID_ARTICLE: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    NOM_ARTICLE: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    MARQUE_ARTICLE: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    DESCRIPTION_ARTICLE: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    STATUT_ARTICLE: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    IMAGES_1: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    IMAGES_2: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    IMAGES_3: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ADRESSE_ARTICLE: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    LONGITUDE_ARTICLE: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    LATITUDE_ARTICLE: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    DATE_INSERT: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    ID_CATEGORIE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "ID_CATEGORIE",
      },
    },
    ID_SELLER: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "utilisateurs", // Linking to the "utilisateurs" table (users table)
        key: "ID_UTILISATEUR", // Foreign key referring to the user who is selling
      },
    },
  },
  {
    freezeTableName: true,
    tableName: "articles",
    timestamps: false,
  }
);

// Association between Articles and Utilisateurs (Sellers)
Articles.belongsTo(Utilisateurs, { foreignKey: "ID_SELLER", as: "seller" });
Utilisateurs.hasMany(Articles, { foreignKey: "ID_SELLER", as: "seller" });
Articles.belongsTo(Categories, {
  foreignKey: "ID_CATEGORIE",
  as: "categorie_article",
});
Categories.hasMany(Articles, {
  foreignKey: "ID_CATEGORIE",
  as: "categorie_article",
});
module.exports = Articles;
