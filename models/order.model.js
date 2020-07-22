const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    amount: {
        type: Number,
        required: true
    }
})

const orderDetail = mongoose.model('orderDetail', orderSchema, 'orderDetail');
module.exports = orderDetail;