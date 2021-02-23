const Mongoose = require('mongoose');

const productSchema = new Mongoose.Schema({
    sku: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    stocked: {
        type: Boolean,
        required: true
    },
    qty: Number,
    name: {
        type: String,
        required: true
    },
    zipcodes: [String],
    categories: [String],
    description: String,
    img_path: String
}, { timestamps: true });

const Product = Mongoose.model('Product', productSchema);
module.exports = Product;