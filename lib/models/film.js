const Mongoose = require('mongoose');

const filmSchema = new Mongoose.Schema({
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
    title: {
        type: String,
        required: true
    },
    zipcodes: [String],
    tmdb_id: Number,
    adult: Boolean,
    genres: [String],
    overview: String,
    popularity: Number,
    poster_path: String,
    release_date: String,
    vote_average: Number,
    vote_count: Number
}, { timestamps: true });

const Film =  Mongoose.model('Film', filmSchema);
module.exports = Film;