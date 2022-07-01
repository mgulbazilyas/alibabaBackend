P = require( 'bluebird');
const TelegramBot = require("node-telegram-bot-api");


const token = '1748725653:AAHaeSnpq7Q4eXuLDVgf1tlf09L0crGEIxk';
const chatId = -618101321;
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: false});
// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//     console.log("chat ID: " + chatId.toString());
//     // send a message to the chat acknowledging receipt of their message
//     bot.sendMessage(chatId, 'Received your message');
// });
(async ()=> {



    await bot.sendMessage(chatId, "Test")
})();
