const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/sequerize');
/**
 * Table profils
 *@author Vanny AZOSENGA
 *@date 31/08/2023
 */
const Profils = sequelize.define('profils',
    {
        ID_PROFIL: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        NOM_PROFIL: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: null
        }
    },
    {
        freezeTableName: true,
        tableName: 'profils',
        timestamps: false,
    })
module.exports = Profils