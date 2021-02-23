const Mongoose = require('mongoose');

class ProductType extends mongoose.SchemaType {
    constructor(key, options) {
      super(key, options, 'productType');
    }
    cast(val) {
      let _val = String(val);
      if (_val != 'Film' && _val != 'Product') {
        throw new Error('productType: ' + val +
          ' does not match a valid product type.');
      }
      return _val;
    }
}
Mongoose.Schema.Types.ProductType = ProductType;

const orderSchema = new Mongoose.Schema({
    user_id: {
        type: Mongoose.Types.ObjectId,
        required: true
    },
    items: [{
        type: {
            type: Mongoose.Schema.Types.ProductType,
            required: true
        },
        item_id: {
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
        returnDate:Date
    }],
    total: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    paid: {
        type: Boolean,
        required: true
    }
});

module.exports = Mongoose.model('Order', orderSchema);