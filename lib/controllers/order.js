const Order = require('../models/order');
const axios = require('axios');
const Settings = require('../../settings');
const tmdbSettings = Settings[Settings.env].tmdb;

class OrderController {

    constructor() {}

    async search(query) {
        let page = 1;
        if (query.page != undefined) page = query.page;
        let obj = {};
        if (query.query != undefined) obj.$text = {$search: query.query};
        if (query.genres != undefined) obj.genres = {$in: query.genres.split(',')};
        if (query.minvotes != undefined) obj.vote_count = {$gte: query.minvotes};
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

    async tmdbFetch(order) {
        return axios.get(`${tmdbSettings.apiUrl}${order.tmdb_id}?api_key=${tmdbSettings.apiKey}`)
        .then((res)=>{
            if (res.status>=200 && res.status<300) return res.data;
            else throw new Error(`The Request was unsuccessful. Code ${res.status}: ${res.statusText}`);
        }).then((data)=>{
            order.title = data.title;
            order.adult = data.adult;
            order.genres = data.genres.map(a => a.name);
            order.overview = data.overview;
            order.popularity = data.popularity;
            order.poster_path = `https://image.tmdb.org/t/p/w185${data.poster_path}`;
            order.poster_path_hd = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
            order.release_date = data.release_date;
            order.vote_average = data.vote_average;
            order.vote_count = data.vote_count;
            return order;
        }).catch(err=>err);
    }

    async add(order,query = {}) {
        if (order.tmdb_id != undefined && (query.tmdb_populate == 'true' || query.tmdb_populate == undefined)) {
            order = await this.tmdbFetch(order);
        }
        return Order.create(order);
    }

    async update(id, order) {
        if (order.tmdb_id != undefined) order = await this.tmdbFetch(order);
        return Order.findByIdAndUpdate(id,order);
    }

    async delete(id) {
        return Order.findByIdAndDelete(id);
    }

}


let orderController = new OrderController();
module.exports = orderController;