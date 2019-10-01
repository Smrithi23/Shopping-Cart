const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema ({
   user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User'
   },
   owner: {
       type: String,
       required: true
   },
   cart: {
       type: Object,
       required: true
   },
   address: {
       type: String,
       required: true
   },
   paymentId: {
       type: String,
       required: true
   },
   date: {
       type: Date,
       required: true
   }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order