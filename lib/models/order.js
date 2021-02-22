const Mongoose = require('mongoose');

const orderSchema = new Mongoose.Schema({
    user_id: Number,
    items: [{id:Number,qty:Number,price:Number,returnDate:String}],
    total: Number,
    currency: String,
    date: String
});

module.exports = Mongoose.model('Order', orderSchema);