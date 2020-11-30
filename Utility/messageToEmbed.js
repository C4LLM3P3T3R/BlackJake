const Discord = require("discord.js");

/**
 *
 * @param {String} text
 * @param {Discord.Message} message
 */
function messageToEmbed(text, message) {

    let embed = new Discord.MessageEmbed()
        .setColor("#08bffc")
        .setAuthor(message.author.username, message.author.avatarURL())
        .addField("BlackJake!", text, false)
        .setFooter("BlackJake created with <3 by C4LLM3P3T3R");

    message.channel.send(embed);

}
exports.messageToEmbed = messageToEmbed;