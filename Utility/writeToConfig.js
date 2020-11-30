const fs = require("fs");

/**
 *
 * @param {Object} config
 * Not stringified json object
 */
function writeToConfig(config) {
    fs.writeFileSync("config.json", JSON.stringify(config));
}
exports.writeToConfig = writeToConfig;