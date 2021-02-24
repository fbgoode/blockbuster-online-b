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
    price: Number,
    pricePerDay: Number,
    stocked: {
        type: Boolean,
        required: true
    },
    qty: Number,
    title: {
        type: String,
        required: true
    },
    available_at: [String],
    tmdb_id: Number,
    adult: Boolean,
    genres: [String],
    overview: String,
    popularity: Number,
    poster_path: String,
    poster_path_hd: String,
    release_date: String,
    vote_average: Number,
    vote_count: Number
}, { timestamps: true });
filmSchema.index( { title: "text", sku: "text" } );

const Film =  Mongoose.model('Film', filmSchema);
module.exports = Film;