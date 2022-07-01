P = require( 'bluebird');
const TelegramBot = require("node-telegram-bot-api");


const token = '1748725653:AAHaeSnpq7Q4eXuLDVgf1tlf09L0crGEIxk';
const chatId = '618101321';
// Create a bot that uses 'polling' to fetch new updates


(async ()=> {
    const bot = new TelegramBot(token, {polling: false});


    await bot.sendMessage(chatId, "Test")
})();
