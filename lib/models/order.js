const Mongoose = require('mongoose');

const orderSchema = new Mongoose.Schema({
    user: {
        type: Mongoose.Types.ObjectId,
        required: true
    },
    items: [{
        obj: {
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
            type: Number,
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
        default: "€"
    },
    paid: {
        type: Boolean,
        default: false
    },
    delivered: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'Order received'
    },
    estimatedDelivery: Date
}, { timestamps: true });

const Order = Mongoose.model('Order', orderSchema);
module.exports = Order;