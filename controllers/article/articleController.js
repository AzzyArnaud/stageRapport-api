const express = require("express");
// const bcrypt = require("bcrypt");
const Validation = require("../../class/Validation");
const RESPONSE_STATUS = require("../../constants/RESPONSE_STATUS");
const RESPONSE_CODES = require("../../constants/RESPONSE_CODES");
const ndangiraArticle = require("../../models/Articles");
const ArticlesUpload = require("../../class/uploads/ArticlesUpload");
const IMAGES_DESTINATIONS = require("../../constants/IMAGES_DESTINATIONS");
// const Task = require("../models/taskModels")

const AddArticle = async (req, res) => {
  try {
    const {
      NOM_ARTICLE,
      MARQUE_ARTICLE,
      DESCRIPTION_ARTICLE,
      STATUT_ARTICLE,
      ADRESSE_ARTICLE,
      LONGITUDE_ARTICLE,
      LATITUDE_ARTICLE,
      // DATE_INSERT,
      ID_CATEGORIE,
    } = req.body;
    const { IMAGE_1, IMAGE_2, IMAGE_3 } = req.files || {};
    const data = {
      ...req.body,
      ...req.files,
    };
    // return console.log(req.body);
    const validation = new Validation(
      data,
      {
        NOM_ARTICLE: { required: true },
        MARQUE_ARTICLE: { required: true },
        DESCRIPTION_ARTICLE: { required: true },
        STATUT_ARTICLE: { required: true },
        IMAGE_1: {
          required: false, // Rendre l'image optionnelle
          image: 4000000, // Toujours valider la taille de l'image si elle est fournie
        },
        ADRESSE_ARTICLE: { required: true },
        LONGITUDE_ARTICLE: { required: true },
        LATITUDE_ARTICLE: { required: true },
        ID_CATEGORIE: { required: true },
      },
      {
        NOM_ARTICLE: { required: "Ce Champ est Obligatoire" },
        MARQUE_ARTICLE: { required: "Ce Champ est Obligatoire" },
        DESCRIPTION_ARTICLE: { required: "Ce Champ est Obligatoire" },
        STATUT_ARTICLE: { required: "Ce Champ est Obligatoire" },
        IMAGE_1: { required: "Ce Champ est Obligatoire" },
        ADRESSE_ARTICLE: { required: "Ce Champ est Obligatoire" },
        LONGITUDE_ARTICLE: { required: "Ce Champ est Obligatoire" },
        LATITUDE_ARTICLE: { required: "Ce Champ est Obligatoire" },
        ID_CATEGORIE: { required: "Ce Champ est Obligatoire" },
      }
    );

    await validation.run();
    const isValid = await validation.isValidate();
    if (!isValid) {
      const errors = await validation.getErrors();
      return res.status(422).json({
        message: "La validation des données est echouée !",
        data: errors,
      });
    }
    const productUpload = new ArticlesUpload();
    var filename_1;
    var filename_2;
    var filename_3;
    if (IMAGE_1) {
      const { fileInfo: fileInfo_1, thumbInfo: thumbInfo_1 } =
        await productUpload.upload(IMAGE_1, false);
      filename_1 = fileInfo_1;
    }
    if (IMAGE_1) {
      const { fileInfo } = await productUpload.upload(IMAGE_1, false);
      filename_1 = `${req.protocol}://${req.get("host")}/${
        IMAGES_DESTINATIONS.aticles
      }/${fileInfo.fileName}`;
    }
    if (IMAGE_2) {
      const { fileInfo } = await productUpload.upload(IMAGE_2, false);
      filename_2 = `${req.protocol}://${req.get("host")}/${
        IMAGES_DESTINATIONS.aticles
      }/${fileInfo.fileName}`;
    }

    if (IMAGE_3) {
      const { fileInfo } = await productUpload.upload(IMAGE_3, false);
      filename_3 = `${req.protocol}://${req.get("host")}/${
        IMAGES_DESTINATIONS.aticles
      }/${fileInfo.fileName}`;
    }

    const newArticle = await ndangiraArticle.create({
      NOM_ARTICLE,
      MARQUE_ARTICLE,
      DESCRIPTION_ARTICLE,
      STATUT_ARTICLE,
      IMAGES_1: filename_1,
      IMAGES_2: filename_2,
      IMAGES_3: filename_3,
      ADRESSE_ARTICLE,
      LONGITUDE_ARTICLE,
      LATITUDE_ARTICLE,
      // DATE_INSERT,
      ID_CATEGORIE,
    });
    res.status(RESPONSE_CODES.OK).json({
      statusCode: RESPONSE_CODES.OK,
      httpStatus: RESPONSE_STATUS.OK,
      message: "Details d' un article cree",
      result: newArticle,
    });
  } catch (error) {
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
      httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
      message: "Erreur interne du serveur, réessayer plus tard",
    });
  }
};

module.exports = {
  AddArticle,
};
