const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/sequerize');
/**
 * Table type_avis
 *@author Vanny AZOSENGA
 *@date 31/08/2023
 */
const Type_avis = sequelize.define('type_avis',
    {
        ID_TYPE_AVIS: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        DESCRIPTION_AVIS: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: null
        }
    },
    {
        freezeTableName: true,
        tableName: 'type_avis',
        timestamps: false,
    })
module.exports = Type_avis