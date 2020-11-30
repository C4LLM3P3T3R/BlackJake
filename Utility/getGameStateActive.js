const { readConfig } = require("./readConfig");

function getGameStateActive(message) {
    let config = readConfig();
    for (let index = 0; index < config.length + 1; index++) {
        if (config.length != 0) {
            if (config[index] != undefined) {
                if (config[index].id == message.author.id) {

                    return true;
                }
            }


        }

    }
    return false;
}
exports.getGameStateActive = getGameStateActive;