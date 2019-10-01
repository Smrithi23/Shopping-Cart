const express = require('express')
const path = require('path')
const Admin = require('../models/admin')
const Item = require('../models/item')
const Cart = require('../models/cart')
const Order = require('../models/order')
const User = require('../models/user')
const auth = require('../middleware/auth')
const hbs = require('hbs')
const Cookies = require('cookies')
const multer = require('multer')

// For the router to decode the body of the post request - urlencoded()

const router = new express.Router()
router.use(express.urlencoded())

//main page
router.get('', async (req, res) => {
    res.status(200).render('index')
})

//Login
router.post('/login', async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.password)
        const token = await admin.generateAuthToken()
        var cookies = new Cookies(req, res)
        cookies.set('token', token)
        res.status(200).redirect('/admin')
    } catch (e) {
        const loginerror = "Incorrect username or password"
        res.status(400).render('index', { loginerror })
    }
})

//admin
router.get('/admin', auth, async (req, res) => {
    const admin = req.admin
    const items = await Item.find({})
    res.status(200).render('admin', {admin, items})
})

//Logout
router.post('/admin/logout', auth, async (req, res) => {
    try {
        req.admin.tokens = req.admin.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.admin.save()

        res.redirect('/')
    } catch (e) {
        res.status(500).send(e)
    }
})

//get change profile page
router.get('/me', auth, async (req, res) => {
    try {
        const admin = req.admin
        res.render('myAccount', { admin })
    } catch (e) {
        res.status(500).send(e)
    }
})

//Updating User Profile
router.post('/me', auth, async (req, res) => {

    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'password']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid Operation' })
        }
        updates.forEach((update) => req.admin[update] = req.body[update])
        await req.admin.save()
        const admin = req.admin
        res.render('myAccount', { admin })
    } catch (e) {
        const admin = req.admin
        const error = "Password must contain atleast 7 characters"
        res.status(400).render('myAccount', { error, admin })

    }
})

router.post('/search', auth, async (req, res) => {
    try {
        const admin = req.admin
        const items = await Item.find({name: { $regex: req.body.search, $options: 'i' }})
        if(items.length < 1) {
            const message = 'No results'
            res.status(200).render('admin',{ message, admin })
        }
        else{
            res.status(200).render('admin',{ items, admin }) 
        }
          
    } catch (e) {
        res.status(500).send('Error')
    }
})

router.get('/addItem', auth, async (req, res) => {
    res.status(200).render('addItem')
})

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        //Saves the file
        cb(null, true)
    } else {
        //Rejects a file and does not throw an error
        cb(null, true)
    }
}

//Initialize multer
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

//add an item
router.post('/addItem', auth, upload.single('image'), async (req, res) => {
    const item = new Item
    item.name = req.body.name
    item.description = req.body.description
    item.store = req.body.store
    item.price = req.body.price
    item.quantity = req.body.quantity
    item.image = req.file.path
    await item.save()
    res.status(200).redirect('/admin')
})

//get page for updating an item
router.get('/update/:id', auth, async (req, res) => {
    const item = await Item.findOne({ _id: req.params.id})
    res.status(200).render('updateItem', { item })
})

//update a particular item
router.post('/update/:id', auth, upload.single('image'), async (req, res) => {
    const id = req.params.id
    const item = await Item.findOne({_id: id})
    const image = item.image
    item.name = req.body.name
    item.description = req.body.description
    item.store = req.body.store
    item.price = req.body.price
    item.quantity = req.body.quantity
    if(req.file){
        item.image = req.file.path
    } else {
        item.image = image
    }
    await item.save()
    const message = 'Updated'
    res.status(200).render('updateItem', {message})
})

//view order
router.get('/orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({})
        orders.forEach(function (order) {
            console.log(order.date)
            console.log(order.owner)
            console.log(order.address)
            cart = new Cart(order.cart)
            order.items = cart.generateArray()
            
        })
        res.status(200).render('orders', { orders: orders })
     } catch (err) {
        throw err;
     }
})


module.exports = router