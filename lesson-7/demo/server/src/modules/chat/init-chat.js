const createSocket = require('socket.io');
const userManager = require('./controllers/user-manager');
const messagesManager = require('./controllers/messages-manager');
const getChatHandlers = require('./handlers');

const initChat = (server, conversation) => {
  // Создаем соккет
  const socketIo = createSocket(server);

  // Подписываемся на соединение к сокету
  socketIo.on('connection', (client) => {
    // Создаем обработчики событий для чата
    const {
      handleRegister,
      handleJoin,
      handleLeave,
      handleMessage,
      handleDisconnect,
    } = getChatHandlers(client, userManager, messagesManager, conversation);

    console.log('client connected...', client.id);
    userManager.addClient(client);

    // подписываемся на все события чата
    client
      .on('register', handleRegister)
      .on('join', handleJoin)
      .on('leave', handleLeave)
      .on('message', handleMessage)
      .on('disconnect', () => {
        console.log('client disconnect...', client.id);
        handleDisconnect();
      })
      .on('error', (err) => {
        console.log('received error from client:', client.id);
        userManager.removeClient(client);
        console.log(err);
      });
  });
};

module.exports = initChat;