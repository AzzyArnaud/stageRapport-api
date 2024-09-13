const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/sequerize');
const Type_avis = require('./Type_avis');
/**
 * Table avis
 *@author Vanny AZOSENGA
 *@date 31/08/2023
 */
const Avis = sequelize.define('avis',
    {
        ID_AVIS: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        ID_TYPE_AVIS: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: null
        },
        DATE_AVIS: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        UTILISATEUR_ID: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
            defaultValue: null
        }
    },
    {
        freezeTableName: true,
        tableName: 'avis',
        timestamps: false,
    })
    Avis.belongsTo(Type_avis, { foreignKey: "ID_TYPE_AVIS", as: 'type_avis' })
module.exports = Avis