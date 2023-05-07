const Sequelize = require('sequelize')
const connection = require('../database/database')

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

Recipe.sync({ force: true })

module.exports = Recipe