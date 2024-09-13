const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/sequerize');
/**
 * Table categories
 *@author Vanny AZOSENGA
 *@date 31/08/2023
 */
const Categories = sequelize.define('categories',
    {
        ID_CATEGORIE: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        NOM_CATEGORIE: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: null
        },
        STATUT_CATEGORIE: {
            type: DataTypes.TINYINT(4),
            allowNull: false,
            defaultValue:null
        }
    },
    {
        freezeTableName: true,
        tableName: 'categories',
        timestamps: false,
    })
module.exports = Categories