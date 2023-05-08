const express = require('express')
const User = require('./User')
const router = express.Router()
const bcrypt = require('bcryptjs')
const adminAuth = require('../middlewares/adminAuth')

router.get('/admin/users/create', (req, res) => {
    res.render('admin/users/create')
})

router.post('/users/create', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    User.findOne({ where: {email: email} }).then(user => {
        if(user == undefined) {
            User.create({
                email: email,
                password: hash
            }).then(() => res.redirect('/login')).catch(() => res.redirect('/'))
        } else {
            res.redirect('/')
        }
    })
})

router.get('/login', (req, res) => {
    res.render('admin/users/login.ejs')
})

router.get('/admin', adminAuth, (req, res) => {
    res.render('admin/index.ejs')
})

router.post('/authenticate', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    
    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if(user != undefined){ // se existir um usuário com esse email
            // Validar a senha
            const correct = bcrypt.compareSync(password, user.password)
            if(correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect('/admin')
            }else {
                res.redirect('/login')
            }
        }else {
            res.redirect('/')
        }
    }) 

    
})


module.exports = router