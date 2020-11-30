const Discord = require("discord.js");
const client = new Discord.Client();

const { Game } = require("./Game.js");
const { messageToEmbed } = require("./Utility/messageToEmbed");
const { getGameIndex } = require("./Utility/getGameIndex");
const { getGameStateActive } = require("./Utility/getGameStateActive");
const { readConfig } = require("./Utility/readConfig");
const { writeToConfig } = require("./Utility/writeToConfig");


client.on("ready", () => {
    console.log("ready!");
    let index = 0;
    console.log("ready!");
    let act = ["j!help", "Playe BlackJake now!", "c4llm3p3t3r.site"];
    setInterval(() => {
        if (index != 4) {
            client.user.setActivity(act[index], {
                type: "PLAYING",
            })
            index++;
        } else {
            index = 0;
        }
    }, 5000);
})


client.on("message", (message) => {
    if (message.author.bot) return;

    let args = message.content.split(" ");
    if (args[0] == "j!start") {

        if (!getGameStateActive(message)) {
            let game = new Game(message);
            game.start();

        } else message.channel.send("You already have an active game of black jack!");


    } else if (args[0] == "j!hit") {

        if (getGameStateActive(message)) {
            let game = new Game(message);
            game.hit();


        }
    } else if (args[0] == "j!stand") {
        if (getGameStateActive(message)) {
            let game = new Game(message);
            game.stand();


        }
    } else if (args[0] == "j!help") {
        messageToEmbed("The game of BlackJake is very simmilar to original BlackJack but without insurance, double down's etc.\n We're making it simple and allowing you and your friends to have fun!\n\n**Commands:**\n``j!start`` - starts the game of BlackJake!\n``j!hit`` - gives you one card to you deck\n``j!stand`` - stands (starts the dealer's round)", message)
    }

})

client.login("token");