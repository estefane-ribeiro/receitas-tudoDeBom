const express = require('express')
const Recipe = require('./Recipe')
const router = express.Router()
const  adminAuth = require('../middlewares/adminAuth')
const multer = require('multer')
const slugfy = require('slugify')
const Category = require('../categories/Category')

const storage = multer.diskStorage({
    destination: function(req, image, cb) {
        cb(null, 'public/images/')
    },
    filename: function(req, image, cb) {
        cb(null, Date.now() + image.originalname)
    }
})

const upload = multer({ storage })

router.get('/admin/recipes/create', adminAuth, (req, res) => {
    Category.findAll().then(categories => res.render('admin/recipes/new', { categories }))
    
})

router.post('/recipes/create', upload.single('image'), adminAuth, (req, res) => {
    const title = req.body.title
    const slug = slugfy(title)
    const body = req.body.body
    const nomeImage = req.file.filename

    Recipe.findOne({
        where: { title: title }
    }).then(recipe => {
        if(recipe == undefined) {
            Recipe.create({
                title: title,
                slug: slug,
                body: body,
                nomeImage: nomeImage
            }).then(() => res.redirect('/admin/recipes')).catch(() => res.redirect('/admin'))
        }else {
            res.redirect('/admin')
        }
    })

})

router.get('/admin/recipes', adminAuth,(req, res) => {
    Recipe.findAll({
        order: [['id', 'DESC']],
        include: [{ model: Category }]
    }).then(recipes => res.render('admin/recipes/index', {recipes}))
})

router.get('/admin/:slug', adminAuth, (req, res) => {
    const slug = req.params.slug
    Recipe.findOne({
        where: {
            slug: slug
        }
    }).then(recipe => {
        if(recipe != undefined) {
            res.render('admin/receita', { recipe })
        }else {
            res.redirect('/admin')
        }
    })
})

router.post('/recipe/delete', adminAuth,  (req, res) => {
    const id = req.body.id
    if(id != undefined && !isNaN(id)) {
        Recipe.destroy({
            where: {
                id: id
            }
        }).then(() => res.redirect('/admin/recipes'))
    } else {
        res.redirect('/admin/recipes')
    }
})

router.get('/admin/recipe/edit/:id', (req, res) => {
    const id = req.params.id
    if(isNaN(id)){
        res.redirect('/admin/recipes')
    } 
    Recipe.findByPk(id).then(recipe => {
        if(recipe != undefined) {
            Category.findAll().then(categories => {
                res.render('admin/recipes/edit', { recipe, categories })
            })
        }
    })
})

router.post('/recipe/update', adminAuth, upload.single('image'), (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const body = req.body.body
    // const nomeImage = req.body.nomeImage ? req.file.filename : ''
    const categoryId = req.body.categoryId

    Recipe.update({
        title: title,
        body: body,
        slug: slugfy(title),
        // nomeImage: nomeImage,
        categoryId: categoryId
    },
    {
        where: {
            id: id
        }
    }).then(() => res.redirect('/admin/recipes')).catch(() => res.redirect('/admin'))
})

module.exports = router