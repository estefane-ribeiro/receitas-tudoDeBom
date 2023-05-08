const express = require('express')
const router = express.Router()
const Category = require('./Category')
const adminAuth = require('../middlewares/adminAuth')
const slugfy = require('slugify')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, image, cb) {
        cb(null, 'public/images/')
    },
    filename: function(req, image, cb) {
        cb(null, Date.now() + image.originalname)
    }
})

const upload = multer({ storage })

router.get('/admin/categories/category', adminAuth, (req, res) => {
        Category.findAll({
            order: [['id', 'DESC']],
        }).then(categories => res.render('admin/categories/index.ejs', {categories}))
    })


router.get('/admin/categories/create', adminAuth, (req, res) => {
    res.render('admin/categories/new')
})

router.post('/categories/create', upload.single('image'), adminAuth, (req, res) => {
    const title = req.body.title
    const slug = slugfy(title)
    const nomeImage = req.file.filename

    Category.findOne({
        where: { title: title }
    }).then(recipe => {
        if(recipe == undefined) {
            Category.create({
                title: title,
                slug: slug,
                nomeImage: nomeImage
            }).then(() => res.redirect('/admin/categories/category')).catch(() => res.redirect('/admin'))
        }else {
            res.redirect('/admin')
        }
    })
})



module.exports = router