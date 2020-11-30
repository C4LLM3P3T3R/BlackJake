const fs = require("fs");

/**
 * @returns {Array}
 */
function readConfig() {
    return JSON.parse(fs.readFileSync("config.json"));
}

exports.readConfig = readConfig;