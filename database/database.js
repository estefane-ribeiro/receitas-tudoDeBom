const Sequelize = require('sequelize')

const connection = new Sequelize('receitas', 'root', 'root123', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00',
    logging: false
})

module.exports = connection