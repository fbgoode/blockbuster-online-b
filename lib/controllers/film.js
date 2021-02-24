const Film = require('../models/film');
const axios = require('axios');
const Settings = require('../../settings');
const tmdbSettings = Settings[Settings.env].tmdb;

class FilmController {

    constructor() {}

    async search(query) {
        let page = 1;
        if (query.page != undefined) page = query.page;
        let obj = {};
        if (query.query != undefined) obj.$text = {$search: query.query};
        if (query.genres != undefined) obj.genres = {$in: query.genres.split(',')};
        if (query.available_at != undefined) obj.available_at = {$in: query.available_at.split(',')};
        if (query.minvotes != undefined) obj.vote_count = {$gte: query.minvotes};
        let sort = "-createdAt";
        if (query.sortby != undefined) sort = query.sortby;
        return await Film.find(obj)
        .limit(20)
        .skip(20 * (page-1))
        .sort(sort);
    }

    async getById(id) {
        return await Film.findById(id);
    }

    async tmdbFetch(film) {
        return axios.get(`${tmdbSettings.apiUrl}${film.tmdb_id}?api_key=${tmdbSettings.apiKey}`)
        .then((res)=>{
            if (res.status>=200 && res.status<300) return res.data;
            else throw new Error(`The Request was unsuccessful. Code ${res.status}: ${res.statusText}`);
        }).then((data)=>{
            film.title = data.title;
            film.adult = data.adult;
            film.genres = data.genres.map(a => a.name);
            film.overview = data.overview;
            film.popularity = data.popularity;
            film.poster_path = `https://image.tmdb.org/t/p/w185${data.poster_path}`;
            film.poster_path_hd = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
            film.release_date = data.release_date;
            film.vote_average = data.vote_average;
            film.vote_count = data.vote_count;
            return film;
        }).catch(err=>err);
    }

    async add(film,query = {}) {
        if (film.tmdb_id != undefined && (query.tmdb_populate == 'true' || query.tmdb_populate == undefined)) {
            film = await this.tmdbFetch(film);
        }
        return Film.create(film);
    }

    async update(id, film) {
        if (film.tmdb_id != undefined) film = await this.tmdbFetch(film);
        return Film.findByIdAndUpdate(id,film);
    }

    async delete(id) {
        return Film.findByIdAndDelete(id);
    }

}


let filmController = new FilmController();
module.exports = filmController;