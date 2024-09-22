const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequerize");
const Categories = require("./Categories");

/**
 * Table Articles
 * @author Yvan illich
 * @date 31/08/2023
 */
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
    TELEPHONE: {
      type: DataTypes.STRING(25),
      allowNull: false,
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
  },
  {
    freezeTableName: true,
    tableName: "articles",
    timestamps: false,
  }
);

Articles.belongsTo(Categories, {
  foreignKey: "ID_CATEGORIE",
  as: "categorie_article",
});
Categories.hasMany(Articles, {
  foreignKey: "ID_CATEGORIE",
  as: "categorie_article",
});

module.exports = Articles;
