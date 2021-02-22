const Fs = require("fs");
const Path = require("path");

const routers = {};

Fs.readdirSync(__dirname)
    .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
    .forEach(file => {
        const router = require(Path.join(__dirname, file));
        routers[file.split('.')[0]] = router;
    });

module.exports = routers;