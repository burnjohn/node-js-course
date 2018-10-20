const createSocket = require('socket.io');

const ClientManager = require('./client-manager');
const ChatRoomManager = require('./chatroom-manager');
const makeHandlers = require('./handlers');

const clientManager = ClientManager();
const chatRoomManager = ChatRoomManager();

const initChat = (server) => {
  const socketIo = createSocket(server);

  socketIo.on('connection', (client) => {
    const {
      handleRegister,
      handleJoin,
      handleLeave,
      handleMessage,
      handleGetChatRooms,
      handleGetAvailableUsers,
      handleDisconnect,
    } = makeHandlers(client, clientManager, chatRoomManager);

    console.log('client connected...', client.id);
    clientManager.addClient(client);

    client.on('register', handleRegister).
      on('join', handleJoin).
      on('leave', handleLeave).
      on('message', handleMessage).
      on('chatrooms', handleGetChatRooms).
      on('availableUsers', handleGetAvailableUsers).
      on('disconnect', () => {
        console.log('client disconnect...', client.id);
        handleDisconnect();
      }).
      on('error', (err) => {
        console.log('received error from client:', client.id);
        console.log(err);
      });
  });
};

module.exports = initChat;