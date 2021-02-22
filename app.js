const express = require('express');
const app = express();
const Settings = require("./settings");
const routers = require('./lib/routers');

// JSON middleware
app.use(express.json());

// Add routers
for (let route in routers) {
    app.use(`/1/${route}`,routers[route]);
}

// Exit on error
process.on("unhandledRejection", err => {
    console.log(err);
    process.exit(1);
  });

// Start server
app.listen(Settings.port,()=>{console.log(`Server listening on port ${Settings.port}.`);});