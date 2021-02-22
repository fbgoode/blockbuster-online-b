require("dotenv").config({ silent: true });

module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",

  // Environment-dependent settings
  development: {
    db: {
      dialect: "mongo",
      storage: "db/database.mongo"
    }
  },
  production: {
    db: {
      dialect: "mongo",
      storage: "db/database.mongo"
    }
  }
};