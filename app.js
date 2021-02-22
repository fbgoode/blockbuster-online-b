// Imports
const Mongoose = require('mongoose');
const express = require('express');
const app = express();
const Settings = require("./settings");
const dbSettings = Settings[Settings.env].db;
const routers = require('./lib/routers');

// Exit on error if on development environment
if (Settings.env == "development") process.on("unhandledRejection", err => {
    console.log(err);
    process.exit(1);
  });

// Add API JSON middleware
app.use(express.json());

// Add API routers
for (let route in routers) {
    app.use(`/1/${route}`,routers[route]);
}

// Connect to DB
const dbpath = 'mongodb://'+((dbSettings.user)?`${dbSettings.user}:${dbSettings.password}@`:'')+`${dbSettings.host}:${dbSettings.port}/${dbSettings.dbname}`
Mongoose.connect(dbpath, {useNewUrlParser: true, useUnifiedTopology: true});
console.log(new Date,'Trying to connect to ' + dbpath);
const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
    console.log(new Date,'Connected to DB');

    // Start server
    app.listen(Settings.port,()=>{console.log(new Date,`Server listening on port ${Settings.port}.`);});

});

// To start development DB: docker run -p 27017:27017 mongo
