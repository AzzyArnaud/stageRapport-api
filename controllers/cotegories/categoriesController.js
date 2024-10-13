const express = require("express");
const Validation = require("../../class/Validation");
const RESPONSE_STATUS = require("../../constants/RESPONSE_STATUS");
const RESPONSE_CODES = require("../../constants/RESPONSE_CODES");
const Categories = require("../../models/Categories");
const Articles = require("../../models/Articles");
const { Op } = require("sequelize");
const Utilisateurs = require("../../models/Utilisateurs");

const getAllCategory = async (req, res) => {
  try {
    const categories = await Categories.findAll({
      attributes: ["ID_CATEGORIE", "NOM_CATEGORIE", "STATUT_CATEGORIE"],
    });
    res.status(RESPONSE_CODES.OK).json({
      statusCode: RESPONSE_CODES.OK,
      httpStatus: RESPONSE_STATUS.OK,
      message: "List Des Categories",
      result: categories,
    });
  } catch (error) {
    console.log(error);
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
      httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
      message: "Erreur interne du serveur, réessayer plus tard",
    });
  }
};

/**
 * fonction pour recuperer tous les articles
 * @param {express} req
 * @param {express} res
 * @Author Vanny
 * @Date 31/08/2024
 */

const getAllArticles = async (req, res) => {
  try {
    const {
      rows = 10,
      first = 0,
      sortField,
      sortOrder,
      search,
      id_category,
    } = req.query;
    // searching

    const globalSearchColumns = [
      "NOM_ARTICLE",
      // "$categorie_article->categorie_article.NOM_CATEGORIE$",
    ];
    var globalSearchWhereLike = {};
    if (search && search.trim() != "") {
      const searchWildCard = {};
      globalSearchColumns.forEach((column) => {
        searchWildCard[column] = {
          [Op.substring]: search,
        };
      });
      globalSearchWhereLike = {
        [Op.or]: searchWildCard,
      };
    }

    // Construire la clause where
    const whereClause = {
      ...globalSearchWhereLike,
    };

    // Ajouter le filtre par ID_CATEGORIE si présent
    if (id_category) {
      whereClause.ID_CATEGORIE = id_category;
    }
    const articles = await Articles.findAndCountAll({
      attributes: [
        "ID_ARTICLE",
        "NOM_ARTICLE",
        "MARQUE_ARTICLE",
        "DESCRIPTION_ARTICLE",
        "STATUT_ARTICLE",
        "IMAGES_1",
        "IMAGES_2",
        "IMAGES_3",
        "ADRESSE_ARTICLE",
        "LONGITUDE_ARTICLE",
        "LATITUDE_ARTICLE",
        "DATE_INSERT",
        "ID_CATEGORIE",
        "ID_SELLER",
      ],
      where: {
        ...whereClause,
        STATUT_ARTICLE: { [Op.ne]: 0 }, // Exclure les articles avec un statut de 0
      },
      include: [
        {
          model: Categories,
          as: "categorie_article",
          required: true,
        },
        {
          model: Utilisateurs,
          as: "seller",
          required: true,
        },
      ],
      limit: parseInt(rows, 10),
      offset: parseInt(first, 10),
      order: [["DATE_INSERT", "DESC"]],
    });
    res.status(RESPONSE_CODES.OK).json({
      statusCode: RESPONSE_CODES.OK,
      httpStatus: RESPONSE_STATUS.OK,
      message: "Liste des articles",
      result: articles,
    });
  } catch (error) {
    console.log(error);
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
      httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
      message: "Erreur interne du serveur, réessayer plus tard",
    });
  }
};

module.exports = {
  getAllCategory,
  getAllArticles,
};
