const createSocket = require('socket.io');
const createUserManager = require('./user-manager');
const createMessagesManager = require('./messages-manager');
const getChatHandlers = require('./handlers');

const initChat = (server, { conversation, userId1, userId2 }) => {
  // Создаем соккет
  const socketIo = createSocket(server);

  // Создаем обработчики событий для чата
  const userManager = createUserManager();
  const messagesManager = createMessagesManager(conversation.id, [userId1, userId2]);

  const {
    handleRegister,
    handleJoin,
    handleLeave,
    handleMessage,
    handleDisconnect,
  } = getChatHandlers(userManager, messagesManager, conversation);

  // Подписываемся на соединение к сокету
  socketIo.on('connection', (client) => {
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