var Admin = require('../models/admin')

var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/WebProject',
{
    useNewUrlParser : true
})

var admin = new Admin({
        email : 'admin@gmail.com',
        name : 'Admin',
        password : '$2a$08$DR/iJ.T8XgT6OMcAbcpfj.QPC4fK/crty4JeTXiUmzdQzUlE0/Iqe',
        tokens : []
})

admin.save(function() {
    exit()
})

function exit() {
    mongoose.disconnect()
}