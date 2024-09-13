const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/sequerize');

/**
 * Table Type_articles
 * @author Yvan Illich
 * @date 31/08/2023
 */
const Type_articles = sequelize.define('Type_articles',
    {
        ID_TYPE_ARTICLE: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        DESCRIPTION: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        tableName: 'type_articles',
        timestamps: false,
    }
);

module.exports = Type_articles;
