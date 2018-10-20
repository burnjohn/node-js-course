const createSocket = require('socket.io');
const clientManager = require('./client-manager');
const chatRoomManager = require('./chatroom-manager');
const getChatHandlers = require('./handlers');

const initChat = (server) => {
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
      handleGetChatRooms,
      handleGetAvailableUsers,
      handleDisconnect,
    } = getChatHandlers(client, clientManager, chatRoomManager);

    console.log('client connected...', client.id);
    clientManager.addClient(client);

    // подписываемся на все события чата
    client
      .on('register', handleRegister)
      .on('join', handleJoin)
      .on('leave', handleLeave)
      .on('message', handleMessage)
      .on('chatrooms', handleGetChatRooms)
      .on('availableUsers', handleGetAvailableUsers)
      .on('disconnect', () => {
        console.log('client disconnect...', client.id);
        handleDisconnect();
      })
      .on('error', (err) => {
        console.log('received error from client:', client.id);
        console.log(err);
      });
  });
};

module.exports = initChat;