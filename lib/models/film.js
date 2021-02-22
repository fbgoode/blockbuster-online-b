const Mongoose = require('mongoose');

const filmSchema = new Mongoose.Schema({
    sku: String,
    qty: Number,
    tmdb_id: Number,
    title: String,
    adult: Boolean,
    genres: [{id:Number,name:String}],
    overview: String,
    popularity: Number,
    poster_path: String,
    release_date: String,
    vote_average: Number,
    vote_count: Number
});

module.exports = Mongoose.model('Film', filmSchema);