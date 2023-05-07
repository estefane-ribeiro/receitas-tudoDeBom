const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const usersController = require('./user/usersController')
const User = require('./user/User')
const connection = require('./database/database')
const recipesController = require('./recipe/recipeController')

// uso de arquivos estaticos
app.use(express.static('public'))

// ejs
app.set('view engine', 'ejs')

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session ({
    secret: 'hddhdhndjsisabhasmkdsdmsmdmmdmmslalalal', cookie: {maxAge: 10080000}
}))

// connection database
connection.authenticate().then(() => ('Conectado ao banco de dados')).catch(e => console.log(`Erro de autentificação com o banco: ${e}`))

app.use('/', usersController)
app.use('/', recipesController)

// home
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/receitas', (req, res) => {
    res.render('receitas.ejs')
})

app.get('/sugestao', (req, res) => res.render('sugestao.ejs'))

app.get('/tiposDePrato', (req, res) => res.render('tiposDePrato.ejs'))



app.listen(3000, () => console.log('Rodando'))