const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
   name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    store: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {
        type: String
    }
})

const Item = mongoose.model('Item', userSchema)

module.exports = Item