const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const jwtExpireIn = process.env.JWT_EXPIREIN;
const Order = require('../models/order');

class UserController {

    constructor() {}

    async login(email,password) {
        let user = await User.findOne({email}).select('+password');
        if (!user) throw new Error('User does not exist.');
        //let verified = await user.comparePassword(password);
        let verified = await bcrypt.compare(password,user.password);
        if (!verified) throw new Error('Password is incorrect');

        const payload = {
            userId: user.id,
            role: user.role,
            createdAt: new Date
        }

        return jwt.sign(payload, secret, {expiresIn: jwtExpireIn});
    }

    async search(query) {
        let page = 1;
        if (query.page != undefined) page = query.page;
        let obj = {};
        if (query.query != undefined) obj.$text = {$search: query.query};
        if (query.role != undefined) obj.role = {$in: query.role.split(',')};
        let sort = "-createdAt";
        if (query.sortby != undefined) sort = query.sortby;
        return await User.find(obj)
        .limit(20)
        .skip(20 * (page-1))
        .sort(sort);
    }

    async getByEmail(email) {
        return await User.find({email});
    }

    async getById(id) {
        return await User.findById(id);
    }

    async getOrders(id) {
        let user = await User.findById(id).populate('orders');
        return user.orders;
    }

    async getOrder(id,oid) {
        let orders = await this.getOrders(id);
        return orders.filter(order=>String(order._id)==oid);
    }

    async add(user) {
        user.password = await bcrypt.hash(user.password, 10);
        return User.create(user);
    }

    async update(id, user) {
        if (user.password != undefined) user.password = await bcrypt.hash(user.password, 10);
        return User.findByIdAndUpdate(id,user);
    }

    async delete(id) {
        return User.findByIdAndDelete(id);
    }

}


let userController = new UserController();
module.exports = userController;