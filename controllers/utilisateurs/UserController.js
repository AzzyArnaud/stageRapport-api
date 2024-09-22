const express = require("express");
const bcrypt = require("bcrypt");
const Validation = require("../../class/Validation");
const RESPONSE_STATUS = require("../../constants/RESPONSE_STATUS");
const RESPONSE_CODES = require("../../constants/RESPONSE_CODES");
const Utilisateurs = require("../../models/Utilisateurs");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
const generateToken = require("../../utils/generateToken");

const userSignUp = async (req, res) => {
  try {
    const {
      NOM_UTILISATEUR,
      PRENOM_UTILISATEUR,
      GENRE,
      TELEPHONE,
      EMAIL,
      PASSWORD,
      ADRESSE_UTILISATEUR,
      CNI,
      NIF,
      RC,
    } = req.body;

    const data = {
      ...req.body,
    };

    const validation = new Validation(
      data,
      {
        NOM_UTILISATEUR: { required: true },
        PRENOM_UTILISATEUR: { required: true },
        GENRE: { required: true },
        TELEPHONE: { required: true },
        EMAIL: { required: true },
        PASSWORD: { required: true },
        ADRESSE_UTILISATEUR: { required: true },
        CNI: { required: true },
      },
      {
        NOM_UTILISATEUR: { required: "Ce champ est obligatoire" },
        PRENOM_UTILISATEUR: { required: "Ce champ est obligatoire" },
        GENRE: { required: "Ce champ est obligatoire" },
        TELEPHONE: { required: "Ce champ est obligatoire" },
        EMAIL: { required: "Ce champ est obligatoire" },
        PASSWORD: { required: "Ce champ est obligatoire" },
        ADRESSE_UTILISATEUR: { required: "Ce champ est obligatoire" },
        CNI: { required: "Ce champ est obligatoire" },
      }
    );

    await validation.run();
    const isValid = await validation.isValidate();

    if (!isValid) {
      const errors = await validation.getErrors();
      return res.status(422).json({
        message: "La validation des données a échoué",
        data: errors,
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(PASSWORD, salt);

    // Vérification de l'existence de l'email
    const userExists = await Utilisateurs.findOne({
      where: { EMAIL },
    });

    if (userExists) {
      return res.status(400).json({
        message: "L'email est déjà associé à un compte",
      });
    }

    // Création du nouvel utilisateur
    const newUser = await Utilisateurs.create({
      NOM_UTILISATEUR,
      PRENOM_UTILISATEUR,
      GENRE,
      TELEPHONE,
      EMAIL,
      PASSWORD: hashedPassword, // Utilisation du mot de passe hashé
      ADRESSE_UTILISATEUR,
      CNI,
      NIF,
      RC,
      ID_PROFIL: 2,
    });
    const user = newUser.toJSON();
    const token = generateToken(
      { user: user.ID_UTILISATEUR, ID_PROFIL: user.ID_PROFIL },
      3 * 12 * 30 * 24 * 3600
    );
    res.status(RESPONSE_CODES.OK).json({
      statusCode: RESPONSE_CODES.OK,
      httpStatus: RESPONSE_STATUS.OK,
      message: "Compte utilisateur créé avec succès !!",
      result: {
        ...user,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
      httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
      message: "Erreur interne du serveur, réessayez plus tard",
    });
  }
};

const signInUser = async (req, res) => {
  try {
    const { EMAIL, PASSWORD } = req.body;

    const user = await Utilisateurs.findOne({
      where: { EMAIL },
    });

    if (!user) {
      return res.status(404).json({ message: "Email non trouvé" });
    }

    // const passwordValid = await bcrypt.compare(PASSWORD, user.PASSWORD);
    // if (!passwordValid) {
    //   return res
    //     .status(401)
    //     .json({ message: "Email ou Mot de passe incorrecte" });
    // }

    const expiresIn = process.env.JWT_REFRESH_EXPIRATION;

    // Vérifiez si expiresIn est valide
    if (!expiresIn || (isNaN(expiresIn) && !/^(\d+[smhd])$/.test(expiresIn))) {
      throw new Error(
        'JWT_REFRESH_EXPIRATION must be a valid number or valid timespan string (e.g., "1h")'
      );
    }

    const token = jwt.sign(
      { id: user.ID_UTILISATEUR },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: expiresIn,
      }
    );

    res.status(RESPONSE_CODES.OK).json({
      statusCode: RESPONSE_CODES.OK,
      httpStatus: RESPONSE_STATUS.OK,
      message: "Connexion réussie !!",
      result: {
        // id: user.ID_UTILISATEUR,
        // name: user.NOM_UTILISATEUR,
        // email: user.EMAIL,
        // token: token,
        user,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
      httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
      message: "Erreur interne du serveur, réessayez plus tard",
    });
  }
};

module.exports = {
  userSignUp,
  signInUser,
};
