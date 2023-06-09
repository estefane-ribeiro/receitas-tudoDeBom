const Sequelize = require('sequelize')
const connection = require('../database/database')
const Category = require('../categories/Category')

const Recipe = connection.define('recipes', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    nomeImage: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Category.hasMany(Recipe)
Recipe.belongsTo(Category)

Recipe.sync({ force: false })

module.exports = Recipe