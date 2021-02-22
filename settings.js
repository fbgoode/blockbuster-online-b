require("dotenv").config({ silent: true });

module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",

  // Environment-dependent settings
  development: {
    db: {
        host: process.env.MONGO_HOST || 'localhost',
        port: process.env.MONGO_PORT || '27017',
        dbname: process.env.MONGO_DBNAME || 'test',
        user: process.env.MONGO_USER || null,
        password: process.env.MONGO_PASSWORD || null
    }
  },
  production: {
    db: {
        host: process.env.MONGO_HOST || 'localhost',
        port: process.env.MONGO_PORT || '27017',
        dbname: process.env.MONGO_DBNAME || 'test',
        user: process.env.MONGO_USER || null,
        password: process.env.MONGO_PASSWORD || null
    }
  }
};