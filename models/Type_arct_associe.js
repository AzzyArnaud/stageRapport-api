const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/sequerize');
const Articles = require('./Articles');
const Type_articles = require('./TypeArticle');
/**
 * Table type_arct_associe
 *@author Vanny AZOSENGA
 *@date 31/08/2023
 */
const Type_arct_associe = sequelize.define('type_arct_associe',
    {
        ID_TYPE_ASSOCIE: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        ID_ARTICLE: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: null
        },
        ID_TYPE_ARTICLE: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: null
        }
    },
    {
        freezeTableName: true,
        tableName: 'type_arct_associe',
        timestamps: false,
    })
    Type_arct_associe.belongsTo(Articles, { foreignKey: "ID_ARTICLE", as: 'articles' })
    Type_arct_associe.belongsTo(Type_articles, { foreignKey: "ID_TYPE_ARTICLE", as: 'type_articles' })

module.exports = Type_arct_associe