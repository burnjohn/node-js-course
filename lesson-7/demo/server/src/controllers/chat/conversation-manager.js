const MessageSchema = require('../../models/message');

const createMessagesManager = conversationId => {
  const chatHistory = [];
  const clients = {};
  const users = {};

  // Отправить сообщение всем юзерам в комнате
  const broadcastMessage = (message) => {
    console.log('Message got: ', message);

    Object.values(clients).forEach(client => {
      client.emit('message', message)
    });
  };

  // Добавить запись в историю сообщений комнаты
  const addMessage = (data) => {
    chatHistory.push(data);

    console.log('message: ', data);

    const message = new MessageSchema(data);
    message.save()
      .then(console.log)
      .catch(console.error)
  };

  // Получить историю сообщений комнаты
  const getChatHistory = () => {
    return chatHistory;
  };

  const addUser = (user) => {
    if (!users[user.id]) {
      console.log('User added', user.id);
      users[user.id] = user;
    }
  };

  const addClient = (client) => {
    console.log('Client added', client.id);

    clients[client.id] = {client};
  };

  const removeClient = (client) => {
    console.log('Client removed');

    delete clients[client.id];
  };

  return {
    broadcastMessage,
    addMessage,
    getChatHistory,
    removeClient,
    addClient,
    addUser
  };
};

module.exports = createMessagesManager;
