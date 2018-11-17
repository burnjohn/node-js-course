const TelegramBot = require('node-telegram-bot-api');

const token = '763007650:AAFyABbLrRplzWw24OGg5r0_auackn93QuE';

const START_CHAT = 'startChat';
const FINISH_CHAT = 'finishChat';
const DEFAULT = 'default';

const getRouterKey = (message) => {
  if (message.includes('hello')) return START_CHAT;
  if (message.includes('bye')) return FINISH_CHAT;

  return DEFAULT;
};

const getHandler = (actionKey, bot) => {
  const actions = {
    [START_CHAT]: ({ firstName, lastName, chatId }) => {
      bot.sendMessage(chatId, `Hello ${ firstName } ${ lastName }, \u{1F63B}`);
    },
    [FINISH_CHAT]: ({ firstName, lastName, chatId }) => {
      bot.sendMessage(chatId, `Bye ${ firstName } ${ lastName } \u{1F416}`);
    },
    [DEFAULT]: ({ firstName, lastName, chatId }) => {
      bot.sendMessage(chatId, `<div>Hello world</div>`, {parse_mode: 'HTML'});
    }
  };

  return actions[actionKey] || actions[DEFAULT];
};

const startBot = () => {
  const bot = new TelegramBot(token, { polling: true });


  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const { first_name: firstName, last_name: lastName } = msg.from;

    const message = msg.text.toLowerCase();
    const userData = {
      firstName,
      lastName,
      chatId
    };

    const actionKey = getRouterKey(message);
    const handler = getHandler(actionKey, bot);

    handler(userData);
  });

};

module.exports = startBot;