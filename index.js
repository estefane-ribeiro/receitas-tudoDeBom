const express = require('express')
const app = express()

// uso de arquivos estaticos
app.use(express.static('public'))

// ejs
app.set('view engine', 'ejs')

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