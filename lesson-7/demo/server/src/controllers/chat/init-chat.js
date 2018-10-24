const createSocket = require('socket.io');
const createConversationManager = require('./conversation-manager');
const getConversationEvents = require('./conversation-events');

const initChat = (server, conversation) => {
  const socketIo = createSocket(server);

  // Создаем обработчики событий для чата
  const conversationManager = createConversationManager(conversation.id);

  socketIo.on('connection', (client) => {
    const {
      onJoin,
      onLeave,
      onMessage,
      onDisconnect,
    } = getConversationEvents(client, conversationManager, conversation);

    // подписываемся на все события чата
    client
      .on('join', onJoin)
      .on('leave', onLeave)
      .on('message', onMessage)
      .on('disconnect', onDisconnect)
      .on('error', (err) => {
        console.log('received error from client:', client.id);
        console.log(err);
      });
  });

};

module.exports = initChat;