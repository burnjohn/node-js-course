const socketIo = require('../../modules/socket');
const getConversationEvents = require('./conversation-events');

const initChat = () => {
  console.log('Chat listener inited');

  // Создаем слушатель на сокет подключение к серверу
  socketIo.on('connection', (client) => {
    console.log('Connection: ', client.id);

    // Создаем обработчики для клиента
    const {
      onJoin,
      onLeave,
      onMessage,
      onDisconnect,
    } = getConversationEvents(client);

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