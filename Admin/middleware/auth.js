const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')
const Cookies = require('cookies')

const auth = async (req, res, next) => {
    try {
        var cookies = new Cookies(req, res)
        const token = cookies.get('token')
        const decoded = jwt.verify(token, 'thisismynewcourse')
        const admin = await Admin.findOne({ _id: decoded._id, 'tokens.token':token })
        
        if (!admin) {
            throw new Error()
        }

        req.token = token
        req.admin = admin
        next()
    } catch(e) {
        const message = "Please Login"
        res.status(401).render('index',{message})
    }
}

module.exports = auth