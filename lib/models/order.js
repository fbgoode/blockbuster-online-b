const Mongoose = require('mongoose');

const orderSchema = new Mongoose.Schema({
    user: {
        type: Mongoose.Types.ObjectId,
        required: true
    },
    items: [{
        item: {
            type: Mongoose.Types.ObjectId,
            required: true
        },
        sku: {
            type: String,
            required: true
        },
        qty: {
            type: Number,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        rental: {
            type: Boolean,
            default: false
        },
        rentalDuration:Number,
        returnDate:Date,
        returned:Boolean,
        returnedDate:Date
    }],
    total: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    paid: {
        type: Boolean,
        required: true
    },
    delivered: {
        type: Boolean,
        default: false
    },
    delivery_status: {
        type: String,
        default: 'Order received'
    },
    estimatedDelivery: Date
}, { timestamps: true });

const Order = Mongoose.model('Order', orderSchema);
module.exports = Order;