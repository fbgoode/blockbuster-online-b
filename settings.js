require("dotenv").config({ silent: true });

module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",

  // Environment-dependent settings
  development: {
    tmdb: {
      apiUrl: process.env.TMDB_APIURL || 'https://api.themoviedb.org/3/movie/',
      apiKey: process.env.TMDB_APIKEY || 'cac61624997edd865edf5c5c8caec2a2'
    },
    db: {
      pre: process.env.MONGO_PRE || 'mongodb://',
        host: process.env.MONGO_HOST || 'localhost',
        port: process.env.MONGO_PORT || '27017',
        dbname: process.env.MONGO_DBNAME || 'test',
        user: process.env.MONGO_USER || null,
        password: process.env.MONGO_PASSWORD || null,
        query: process.env.MONGO_QUERY || null
    }
  },
  production: {
    tmdb: {
      apiUrl: process.env.TMDB_APIURL || 'https://api.themoviedb.org/3/movie/',
      apiKey: process.env.TMDB_APIKEY || 'cac61624997edd865edf5c5c8caec2a2'
    },
    db: {
        pre: process.env.MONGO_PRE || 'mongodb+srv://',
        host: process.env.MONGO_HOST || 'blockbuster-online.1kmjp.mongodb.net',
        port: process.env.MONGO_PORT || '',
        dbname: process.env.MONGO_DBNAME || 'bbo',
        user: process.env.MONGO_USER || null,
        password: process.env.MONGO_PASSWORD || null,
        query: process.env.MONGO_QUERY || '?retryWrites=true&w=majority'
    }
  }
};