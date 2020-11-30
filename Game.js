const { getRandomInt } = require("./Utility/getRandomInt.js");
const { readConfig } = require("./Utility/readConfig.js");
const { getGameIndex } = require("./Utility/getGameIndex.js");
const { writeToConfig } = require("./Utility/writeToConfig.js");
const { messageToEmbed } = require("./Utility/messageToEmbed.js");

class Game {
    /**
     *
     * @param {Discord.Message} message
     * Passes the message object for the playerId that will be the game Id
     */
    constructor(message) {
        this.cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        this.playerId = message.author.id;
        this.dealerCards = [];
        this.playerCards = [];
        this.message = message;
        this.totalPlayerScore = 0;
        this.totalDealerScore = 0;

    }

    start() {
        console.log(this.cards);
        for (let index = 0; index < 2; index++) {
            this.playerCards.push(this.cards[getRandomInt(1, this.cards.length)]);
            this.dealerCards.push(this.cards[getRandomInt(1, this.cards.length)]);

        }
        console.log(this.playerCards);
        console.log(this.dealerCards);
        for (let index = 0; index < this.playerCards.length; index++) {
            this.totalPlayerScore += this.playerCards[index];

        }

        if (this.totalPlayerScore > 21) {
            this.playerBust();
        } else if (this.playerCards[0] == 10 && this.playerCards[1] == 11 && this.dealerCards[0] != 10 || this.playerCards[0] == 11 && this.playerCards[1] == 10 && this.dealerCards[0] != 11) {

            messageToEmbed(`BlackJack!\nYour cards: ${this.playerCards.toString().replace(/,/g, " + ")} = ${this.totalPlayerScore}\nDealer's cards: ${this.dealerCards.toString().replace(/,/g, " + ")} = ${this.totalDealerScore}`, this.message)
            let config = readConfig();
            config.splice(getGameIndex(this.message), 1);
            writeToConfig(config);

        } else if (this.playerCards[0] == 10 && this.playerCards[1] == 11 && this.dealerCards[0] == 10 && this.dealerCards[1] == 11 || this.playerCards[0] == 11 && this.playerCards[1] == 10 && this.dealerCards[0] == 11 && this.dealerCards[1] == 10) {

            messageToEmbed(`Push!\nYour cards: ${this.playerCards.toString().replace(/,/g, " + ")} = ${this.totalPlayerScore}\nDealer's cards: ${this.dealerCards.toString().replace(/,/g, " + ")} = ${this.totalDealerScore}`, this.message)
            let config = readConfig();
            config.splice(getGameIndex(this.message), 1);
            writeToConfig(config);
        } else if (this.playerCards[0] != 10 && this.playerCards[1] != 11 && this.dealerCards[0] == 10 && this.dealerCards[1] == 11 || this.playerCards[0] != 11 && this.playerCards[1] != 10 && this.dealerCards[0] == 11 && this.dealerCards[1] == 10) {
            let config = readConfig();
            config.splice(getGameIndex(this.message), 1);
            writeToConfig(config);
            messageToEmbed(`Dealer BlackJack!\nYour cards: ${this.playerCards.toString().replace(/,/g, " + ")} = ${this.totalPlayerScore}\nDealer's cards: ${this.dealerCards.toString().replace(/,/g, " + ")} = ${this.totalDealerScore}`, this.message)

        } else {
            let config = readConfig();
            config.push({ "id": this.playerId, "playerCards": this.playerCards, "dealerCards": this.dealerCards });
            writeToConfig(config);
            messageToEmbed(`Dealer cards: ${this.dealerCards[0]} + ? = ${this.dealerCards[0]}\nPlayer cards: ${(this.playerCards.toString()).replace(",", " + ")} = ${this.totalPlayerScore}`, this.message);
        }



    }

    hit() {
        let config = readConfig();
        this.dealerCards = config[getGameIndex(this.message)].dealerCards;
        this.playerCards = config[getGameIndex(this.message)].playerCards;

        for (let index = 0; index < this.playerCards.length; index++) {
            if (this.playerCards[index] == 11) {
                this.playerCards[index] = 1;
            }

        }

        this.playerCards.push(this.cards[getRandomInt(1, this.cards.length)]);

        for (let index = 0; index < this.playerCards.length; index++) {
            this.totalPlayerScore += this.playerCards[index];

        }

        if (this.totalPlayerScore == 21 && this.dealerCards[0] == 10 || this.totalPlayerScore == 21 && this.dealerCards[0] == 11) {
            this.stand();
        } else if (this.totalPlayerScore == 21 && this.dealerCards[0] != 10 || this.totalPlayerScore == 21 && this.dealerCards[0] != 11) {

            messageToEmbed(`BlackJack!\nYour cards: ${this.playerCards.toString().replace(/,/g, " + ")} = ${this.totalPlayerScore}\nDealer's cards: ${this.dealerCards.toString().replace(/,/g, " + ")} = ${this.totalDealerScore}`, this.message)
            let config = readConfig();
            config.splice(getGameIndex(this.message), 1);
            writeToConfig(config);

        }
        if (this.totalPlayerScore > 21) {
            this.playerBust();

        } else {

            config[getGameIndex(this.message)].playerCards = this.playerCards;

            messageToEmbed(`Dealer cards: ${this.dealerCards[0]} + ? = ${this.dealerCards[0]}\nPlayer cards: ${(this.playerCards.toString()).replace(/,/g, " + ")} = ${this.totalPlayerScore}`, this.message);
            writeToConfig(config);
        }

    }

    playerBust() {
        for (let index = 0; index < this.dealerCards.length; index++) {
            this.totalDealerScore += this.dealerCards[index];

        }
        messageToEmbed(`Bust!\nYour cards: ${this.playerCards.toString().replace(/,/g, " + ")} = ${this.totalPlayerScore}\nDealer's cards: ${this.dealerCards.toString().replace(/,/g, " + ")} = ${this.totalDealerScore}`, this.message)
        let config = readConfig();
        config.splice(getGameIndex(this.message), 1);
        writeToConfig(config);
    }


    stand() {
        let config = readConfig();
        this.dealerCards = config[getGameIndex(this.message)].dealerCards;
        this.playerCards = config[getGameIndex(this.message)].playerCards;
        for (let index = 0; index < this.dealerCards.length; index++) {
            this.totalDealerScore += this.dealerCards[index];

        }
        for (let index = 0; index < this.playerCards.length; index++) {
            this.totalPlayerScore += this.playerCards[index];
        }
        while (this.totalDealerScore <= 16) {

            this.dealerCards.push(this.cards[getRandomInt(1, this.cards.length)]);
            this.totalDealerScore = 0;
            for (let index = 0; index < this.dealerCards.length; index++) {

                this.totalDealerScore += this.dealerCards[index];

            }
        }
        if (this.totalDealerScore > 21) {
            messageToEmbed(`Dealer bust!\nYour cards: ${this.playerCards.toString().replace(/,/g, " + ")} = ${this.totalPlayerScore}\nDealer's cards: ${this.dealerCards.toString().replace(/,/g, " + ")} = ${this.totalDealerScore}`, this.message)
            let config = readConfig();
            config.splice(getGameIndex(this.message), 1);
            writeToConfig(config);
        } else if (this.totalDealerScore < this.totalPlayerScore) {
            messageToEmbed(`You won!\nYour cards: ${this.playerCards.toString().replace(/,/g, " + ")} = ${this.totalPlayerScore}\nDealer's cards: ${this.dealerCards.toString().replace(/,/g, " + ")} = ${this.totalDealerScore}`, this.message)
            let config = readConfig();
            config.splice(getGameIndex(this.message), 1);
            writeToConfig(config);
        } else if (this.totalDealerScore > this.totalPlayerScore) {
            messageToEmbed(`Dealer won\nYour cards: ${this.playerCards.toString().replace(/,/g, " + ")} = ${this.totalPlayerScore}\nDealer's cards: ${this.dealerCards.toString().replace(/,/g, " + ")} = ${this.totalDealerScore}`, this.message)
            let config = readConfig();
            config.splice(getGameIndex(this.message), 1);
            writeToConfig(config);
        } else {
            messageToEmbed(`Push\nYour cards: ${this.playerCards.toString().replace(/,/g, " + ")} = ${this.totalPlayerScore}\nDealer's cards: ${this.dealerCards.toString().replace(/,/g, " + ")} = ${this.totalDealerScore}`, this.message)
            let config = readConfig();
            config.splice(getGameIndex(this.message), 1);
            writeToConfig(config);

        }

    }
}
exports.Game = Game;