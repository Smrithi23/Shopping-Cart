const express = require('express')
const path = require('path')
const User = require('../models/user')
const Item = require('../models/item')
const Cart = require('../models/cart')
const Order = require('../models/order')
const auth = require('../middleware/auth')
const hbs = require('hbs')
const Cookies = require('cookies')
const multer = require('multer')
const stripe = require('stripe')('sk_test_9d6kytSWrIB0OL8Zv6m8gtTO009uWKEqir')

// //send grid api
// const sgMail = require('@sendgrid/mail')
// const sendgridapikey = require('../config.js')
// sgMail.setApiKey(sendgridapikey)

// For the router to decode the body of the post request - urlencoded()

const router = new express.Router()
router.use(express.urlencoded())

//main page
router.get('', async (req, res) => {
    try {
        const items = await Item.find({})
        res.render('index', { items })
    } catch (e) {
        res.status(500).send('Error')
    }
})

//login page
router.get('/login', async (req, res) => {
    res.status(200).render('login')
})

//register page
router.get('/register', async (req, res) => {
    res.status(200).render('register')
})

// Register
router.post('/register', async (req, res) => {

    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        var cookies = new Cookies(req, res)
        cookies.set('token', token)
            // sgMail.send({
            //     to: req.body.email,
            //     from: 'onlineshoppingstore26@gmail.com',
            //     subject: 'Registration succesful',
            //     text: 'Thanks for registering. We hope you have a good time shopping.'
            // })
        res.status(201).redirect('/user')
    } catch (e) {
        var register = " "
        var email = " "
        var password = " "
        if (e.code === 11000) {
            register = "Already Registered"
        }
        else {
            if (e.errors.password) {
                password = "Password must contain atleast 7 characters"
            }
            if (e.errors.email) {
                email = "Email is invalid"
            }
        }
        res.status(400).render('register', { register, email, password })
    }
})
//Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        var cookies = new Cookies(req, res)
        cookies.set('token', token)
        res.status(200).redirect('/user')
    } catch (e) {
        const loginerror = "Incorrect email or password"
        res.status(400).render('login', { loginerror })
    }
})

//Dashboard
router.get('/user', auth, async (req, res) => {
    try {
        const user = req.user
        const items = await Item.find({})
        res.render('home', { user, items })
    } catch (e) {
        res.status(500).send('Error')
    }
})
//Logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.render('index')
    } catch (e) {
        res.status(500).send(e)
    }
})

//get change profile page
router.get('/users/me', auth, async (req, res) => {
    try {
        const user = req.user
        res.render('myAccount', { user })
    } catch (e) {
        res.status(500).send(e)
    }
})

//Updating User Profile
router.post('/users/me', auth, async (req, res) => {

    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'password']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid Operation' })
        }
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        const user = req.user
        res.render('myAccount', { user })
    } catch (e) {
        const user = req.user
        const error = "Password must contain atleast 7 characters"
        res.status(400).render('myAccount', { error, user })

    }
})

//buy an item
router.get('/buyNow/:id', auth, async (req, res) => {
    const id = req.params.id
    const item = await Item.findOne({ _id: id })
    image = item.image
    res.status(200).render('buy', { item, image })
})

router.post('/search', auth, async (req, res) => {
    try {
        const user = req.user
        const items = await Item.find({ name: { $regex: req.body.search, $options: 'i' } })
        if (items.length < 1) {
            const message = 'No results'
            res.status(200).render('home', { message })
        }
        else {
            res.status(200).render('home', { items, user })
        }

    } catch (e) {
        res.status(500).send('Error')
    }
})

//Search without logging in
router.post('/searchWithoutLoggingIn', async(req, res) => {
    try {
        const user = req.user
        const items = await Item.find({ name: { $regex: req.body.search, $options: 'i' } })
        if (items.length < 1) {
            const message = 'No results'
            res.status(200).render('index', { message })
        }
        else {
            res.status(200).render('index', { items, user })
        }

    } catch (e) {
        res.status(500).send('Error')
    }
})

//add item to cart
router.get('/addToCart/:id', auth, async (req, res) => {
    var productId = req.params.id
    var cart = new Cart(req.user.cart ? req.user.cart : {})
    console.log(cart)
    Item.findById(productId, async (err, product) => {
        const initialQty = cart.totalQty
        cart.add(product, req.params.id)
        const finalQty = cart.totalQty
        if (initialQty === finalQty) {
            const outOfStock = 'Out of stock'
            const user = req.user
            const items = await Item.find({})
            return res.render('home', { outOfStock, user, items })
        }
        else {
            req.user.cart = cart
            req.user.save()
            res.redirect('/user')
        }

    })

})

//Reduce quantity by one
router.get('/reduce/:id', auth, async (req, res) => {
    var productId = req.params.id
    var cart = new Cart(req.user.cart ? req.user.cart : {})
    
    cart.reduceByOne(productId)
    req.user.cart = cart
    await req.user.save()
    res.redirect('/cart')
})

//Remove Item
router.get('/remove/:id', auth, async (req, res) => {
    var productId = req.params.id
    var cart = new Cart(req.user.cart ? req.user.cart : {})
    
    cart.removeItem(productId)
    req.user.cart = cart
    await req.user.save()
    res.redirect('/cart')
})

//get cart
router.get('/cart', auth, async (req, res) => {
    if (!req.user.cart) {
        return res.render('cart', { products: null })
    }
    var cart = new Cart(req.user.cart)
    res.status(200).render('cart', { products: cart.generateArray(), totalPrice: cart.totalPrice })
})

router.get('/buy', auth, async (req, res) => {
    const cart = new Cart(req.user.cart)
    var flag = 0
    var count = 0
    var OutOfStockItems = []
    var i = 0
    var j
    await cart.generateArray().forEach(async (e) => {
        Item.find({ _id: e.item._id }).exec(function (err, item) {
            if (item) {
                if (item[0].quantity >= e.qty) {
                    flag++
                    count++
                }
                else {
                    console.log('hi')
                    flag = 0
                    count++
                    OutOfStockItems[i] = item[0].name
                    i++
                }
            }
            else {
                console.log(item)
                console.log('hi')
                flag = 0
                count++
                OutOfStockItems[i] = item[0].name
                i++
            }
            console.log(flag)
            if (flag === cart.generateArray().length && count === cart.generateArray().length) {
                res.render('buy')
            }
            if (flag !== cart.generateArray().length && count === cart.generateArray().length) {
                var message = ''
            if(OutOfStockItems.length > 1){
                for(j = 0; j < OutOfStockItems.length - 3; j++) {
                    message += OutOfStockItems[j]
                    message += ', '
                }
                message += OutOfStockItems[j]
                message += ' and '
                message += OutOfStockItems[++j]
            } else {
                message += OutOfStockItems[0]
            }
                res.render('cart', { products: cart.generateArray(), totalPrice: cart.totalPrice, message: 'Reduce Quantity of ' + message})
            }
        })
    })
})

var address

router.post('/buy', auth, async (req, res) => {
    address = req.body.address
    var cart = new Cart(req.user.cart)
    const price = cart.totalPrice * 100
    const totalPrice = cart.totalPrice
    console.log(price)
    res.status(200).render('pay', { products: cart.generateArray(), totalPrice: totalPrice, address: address, price: price })
})

//make payment
router.post('/charge', auth, async (req, res) => {
    var amount = req.body.chargeAmount
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
        .then(customer => stripe.charges.create({
            amount,
            description: 'Amazon',
            currency: 'usd',
            customer: customer.id
        }))
        .then(async (charge) => {
            var order = new Order({
                user: req.user,
                owner: req.user.name,
                cart: req.user.cart,
                address: address,
                paymentId: charge.id,
                date: new Date().toISOString()
            })
            await order.save()
            res.status(200).redirect('/paysuccess')
        })
        .then(async () => {
            const cart = new Cart(req.user.cart)
            cart.generateArray().forEach(async (e) => {
                console.log(e.item._id)
                const item = await Item.findOne({ _id: e.item._id })
                item.quantity -= e.qty
                if (item.quantity === 0) {
                    await Item.findOneAndDelete({ _id: e.item._id })
                }
                await item.save()
            })
        })
        .then(async () => {
            req.user.cart = {}
            await req.user.save()
        })
        .catch(function() {
            console.log('Payment failed')
        })
})

//display payment successful
router.get('/paysuccess', auth, async (req, res) => {
    res.status(200).render('success')
})

//view history of purchases
router.get('/myOrders', auth, async (req, res) => {
    Order.find({ user: req.user }, function (err, orders) {
        var cart
        orders.forEach(function (order) {
            console.log(order.address)
            cart = new Cart(order.cart)
            order.items = cart.generateArray()
        })
        res.status(200).render('orders', { orders: orders })
    })
})

module.exports = router