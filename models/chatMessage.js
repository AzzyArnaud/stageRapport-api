const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/sequerize');
/**
 * Table chatmessages
 *@author Yvan illich
 *@date 4/09/2024
 *cette model sera utilise pour stocke les message provenant du chat
 *en temps reel
 */
const ChatMessage = sequelize.define('chatmessages',
    {
        ID_MESSAGE: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        MESSAGE: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        DATE_ENVOYE: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        freezeTableName: true,
        tableName: 'chatmessages',
        timestamps: false,
    })
module.exports = ChatMessage