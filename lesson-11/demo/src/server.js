const startBot = require('./modules/telegram-bot');

const startServer = port => {
  startBot();

  console.log('Server was started at http://localhost:' + port);
};

module.exports = startServer;
