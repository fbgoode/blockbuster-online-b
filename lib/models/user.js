const Mongoose = require('mongoose');
const validator = require('validator');

class UserRole extends Mongoose.SchemaType {
    constructor(key, options) {
      super(key, options, 'UserRole');
    }
    cast(val) {
      let _val = String(val);
      if (_val != 'Customer' && _val != 'Admin') {
        throw new Error('UserRole: ' + val +
          ' does not match a valid user role.');
      }
      return _val;
    }
}
Mongoose.Schema.Types.UserRole = UserRole;

const userSchema = new Mongoose.Schema({
    name: String,
    lastname: String,
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {validator: validator.isEmail, msg: 'Invalid email'}
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: Mongoose.Schema.Types.UserRole,
        default: 'Customer'
    },
    mobile: {
        type: String,
        validate: {validator: validator.isMobilePhone, msg: 'Invalid mobile phone number.'}
    },
    addresses: [{
        name: String,
        address: String,
        address2: String,
        zip: {
            type: String,
            validate: {validator: (str)=>validator.isPostalCode(str,'any'), msg: 'Invalid mobile phone number.'}
        },
        city: String,
        country: String
    }],
    defaultShippingAddress: String,
    defaultBillingAddress: String,
    payment_methods: [{
        method: String,
        data: {}
    }],
    orders: [{
        type: Mongoose.Types.ObjectId,
        ref: 'Order'
    }]
}, { timestamps: true });
userSchema.index( { name: "text", lastname: "text", email: "text", mobile: "text" } );

userSchema.set('toJSON', {
    transform: function(doc,ret,opt) {
        delete ret['password'];
        return ret;
    }
});

const User = Mongoose.model('User', userSchema);
module.exports = User;