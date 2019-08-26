const TelegramBot = require('node-telegram-bot-api');

const token = '763007650:AAFyABbLrRplzWw24OGg5r0_auackn93QuE';

const START_CHAT = 'START_CHAT';
const FINISH_CHAT = 'FINISH_CHAT';
const DEFAULT = 'DEFAULT';
const DO_YOU_LOVE_ME = 'DO_YOU_LOVE_ME';
const CHOSE_JOY = 'CHOSE_JOY';
const THANK_YOU = 'THANK_YOU';
const REJECT = 'REJECT';
const GIVE_BEER = 'GIVE_BEER';
const REMIND_ABOUT_GIRL = 'REMIND_ABOUT_GIRL';
const OFFER_SOMETHING = 'OFFER_SOMETHING';

const getResponseKey = (message) => {
  // Give me some beer

  if (message.includes('hello')) return START_CHAT;
  if (message.includes('bye')) return FINISH_CHAT;
  if (message.match(/confess/)) return DO_YOU_LOVE_ME;
  if (message.includes('you are the bot of my life')) return THANK_YOU;
  if (message.includes('sorry there is another one')) return REJECT;
  if (message.match(/sudo/)) return GIVE_BEER;
  if (message.match(/beer/)) return REJECT;
  if (message.match(/ask/)) return OFFER_SOMETHING;
  if (message.match(/no,/)) return DO_YOU_LOVE_ME;
  if (message.match(/money/)) return REJECT;
  if (message.match(/girls/)) return REMIND_ABOUT_GIRL;
  if (message.match(/alcohol/)) return GIVE_BEER;

  return DEFAULT;
};

const getResponseFunction = (actionKey, bot) => {
  const hideKeyboard =  {reply_markup: JSON.stringify({ hide_keyboard: true })};

  const actions = {
    [START_CHAT]: ({ firstName, lastName, chatId }) => {
      bot.sendMessage(chatId, `Hello ${ firstName } ${ lastName }, \u{1F63B}`);
    },
    [FINISH_CHAT]: ({ firstName, lastName, chatId }) => {
      bot.sendMessage(chatId, `Bye ${ firstName } ${ lastName } \u{1F416}`);
    },
    [DEFAULT]: ({ firstName, lastName, chatId }) => {
      bot.sendMessage(chatId, `I don't understand you \u{23F0}`);
    },
    [THANK_YOU]: ({ firstName, lastName, chatId }) => {
      bot.sendMessage(chatId, `I love you too ${firstName} \u{2764}`, hideKeyboard );
    },
    [REJECT]: ({ firstName, lastName, chatId }) => {
      bot.sendMessage(chatId, `Go away ${firstName}`, hideKeyboard);
    },
    [REMIND_ABOUT_GIRL]: ({ firstName, lastName, chatId }) => {
      bot.sendMessage(chatId, `Don't you love your girl, ${firstName}?`, hideKeyboard);
    },
    [GIVE_BEER]: ({ firstName, lastName, chatId }) => {
      bot.sendMessage(chatId, `Here is your beer ${firstName}`, hideKeyboard);
    },
    [OFFER_SOMETHING]: (userData, msg) => {
      const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
          keyboard: [
            ['Money'],
            ['Girls'],
            ['Alcohol'],
          ]
        })
      };
      bot.sendMessage(msg.chat.id, 'What do you want?', opts);
    },
    [DO_YOU_LOVE_ME]: (userData, msg) => {
      const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
          keyboard: [
            ['Yes, you are the bot of my life'],
            ['No, sorry there is another one...']
          ]
        })
      };
      bot.sendMessage(msg.chat.id, 'Do you love me?', opts);
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

    const actionKey = getResponseKey(message);
    const respond = getResponseFunction(actionKey, bot);

    respond(userData, msg);
  });

};

module.exports = startBot;