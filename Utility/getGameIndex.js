const { readConfig } = require("./readConfig");


/**
 * 
 * @param {Discord.Message} message 
 * @returns {Object} Retruns the object of the game that the game id is in
 * 
 */
function getGameIndex(message) {
    let config = readConfig();
    for (let index = 0; index < config.length + 1; index++) {
        if (config.length != 0) {
            if (config[index].id == message.author.id) {

                return index;
            }

        }

    }
    return "";
}
exports.getGameIndex = getGameIndex;