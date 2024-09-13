const express = require("express");
const Validation = require("../../class/Validation");
const RESPONSE_STATUS = require('../../constants/RESPONSE_STATUS');
const RESPONSE_CODES = require('../../constants/RESPONSE_CODES');
const Message = require("../../models/chatMessage");

/**
 * Send message Controler
 *@author Yvan illich
 *@date 4/09/2024
 *@num 68377382
 */

 const sendMessage = async (req, res) => {
    try {
        const { MESSAGE } = req.body;
        const data = {
            MESSAGE
        };

        // Validation des données
        const validation = new Validation(data, {
            MESSAGE: { required: true }
        }, {
            MESSAGE: { required: "Ce Champ est Obligatoire" }
        });
        
        await validation.run();
        const isValid = await validation.isValidate();

        if (!isValid) {
            const errors = await validation.getErrors();
            return res.status(422).json({
                message: "La validation des données est échouée !",
                data: errors
            });
        }

        const newMessage = await Message.create({ MESSAGE });
        res.status(RESPONSE_CODES.OK).json({
            statusCode: RESPONSE_CODES.OK,
            httpStatus: RESPONSE_STATUS.OK,
            message: "Message envoyé avec succès",
            result: newMessage
        });
    } catch (error) {
        console.error(error);
        res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
            message: "Erreur interne du serveur, réessayer plus tard"
        });
    }
};

const getAllMessage = async (req, res) => {
    try{
        const messages = await Message.findAndCountAll();
        res.status(RESPONSE_CODES.OK).json({
            statusCode: RESPONSE_CODES.OK,
            httpStatus: RESPONSE_STATUS.OK,
            message: "Liste des Messages",
            result: messages
    })
    } catch (error) {
        console.log(error)
        res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
            message: "Erreur interne du serveur, réessayer plus tard",
          });
    }
};

module.exports = {
    sendMessage,
    getAllMessage
};
