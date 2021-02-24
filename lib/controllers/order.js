const Order = require('../models/order');
const axios = require('axios');
const Settings = require('../../settings');
const tmdbSettings = Settings[Settings.env].tmdb;
const User = require('../models/user');
const Film = require('../models/film');

class OrderController {

    constructor() {}

    async search(query) {
        let page = 1;
        if (query.page != undefined) page = query.page;
        let obj = {};
        if (query.status != undefined) obj.status = {$in: query.status.split(',')};
        if (query.paid != undefined) obj.paid = query.paid;
        if (query.delivered != undefined) obj.delivered = query.delivered;
        let sort = "-createdAt";
        if (query.sortby != undefined) sort = query.sortby;
        return await Order.find(obj)
        .limit(20)
        .skip(20 * (page-1))
        .sort(sort);
    }

    async getById(id) {
        return await Order.findById(id);
    }

    async add(order) {
        const user = await User.findById(order.user);
        if (!user) throw new Error('User not found.');
        let total = 0;
        let toreduce = [];
        for (let item of order.items) {
            const obj = await Film.findById(item.obj);
            if (!obj) throw new Error('Product not found.');
            if (!item.sku) item.sku = obj.sku;
            if (!item.qty) item.qty = 1;
            else if (item.sku != obj.sku) throw new Error('Product id and sku do not match.');
            if (item.rental && item.rentalDuration>0) item.price = obj.pricePerDay * item.rentalDuration; // Return date will be managed when delivery is confirmed
            else {
                item.price = obj.price;
                item.rental = false;
                delete item.rentalDuration;
            }
            total += item.price*item.qty;
            toreduce.push({obj,qty:item.qty});
        }
        order.total = total;
        for (let item of toreduce) {
            if (isNaN(item.obj.qty)) continue;
            if (item.obj.qty<item.qty) throw new Error('Not enough stock'); // Check if enough stock
        }
        for (let item of toreduce) {
            if (isNaN(item.obj.qty)) continue;
            item.obj.qty -= item.qty; // Reduce stock of items (Future: implement increase stock when rented movies are returned)
            item.obj.save();
        }
        let neworder = await Order.create(order);
        user.orders.push(neworder);
        user.save();
        return neworder;
    }

    async update(id, order) { // Warning: Does not adjust product stock, must be done manually
        if (order.tmdb_id != undefined) order = await this.tmdbFetch(order);
        if (order.user == undefined) return Order.findByIdAndUpdate(id,order);
        let oldorder = await Order.findById(id);
        if (order.user == String(oldorder.user)) return Order.findByIdAndUpdate(id,order);
        const user = await User.findById(order.user);
        if (!user) throw new Error('User not found.');
        const olduser = await User.findById(oldorder.user);
        olduser.orders = user.orders.filter(oid => String(oid) !== id);
        olduser.save();
        let neworder = await Order.findByIdAndUpdate(id,order);
        user.orders.push(neworder);
        user.save();
        return neworder;
    }

    async delete(id) { // Warning: Does not adjust product stock, must be done manually
        const order = await Order.findById(id);
        const user = await User.findById(order.user);
        user.orders = user.orders.filter(oid => String(oid) !== id);
        user.save();
        return Order.findByIdAndDelete(id);
    }

}


let orderController = new OrderController();
module.exports = orderController;