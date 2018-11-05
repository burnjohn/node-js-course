const User = require('../../models/user');
const { sendError } = require('./response-helper');
const {
  getChatHistory,
  addClient,
  addMessage,
  addUser,
  broadcastMessageToAll,
  getClientConversationIds
} = require('./conversation-manager');

const findUser = userId => User.findById(userId);

const getConversationHandlers = (client) => {

  // Если с клиент присоединился
  const onJoin = (userId, conversationId, respondToClient) => {

    addClient(client, conversationId);

    // Получаем все сообщения чата
    getChatHistory(conversationId).then(messageList => {

      // Отправляем текущему клиенту все сообщения чата
      respondToClient(messageList);

      findUser(userId).then(user => {
        const message = {
          conversation: conversationId,
          message: `joined ${user.firstName} ${user.lastName}`,
          author: user.id,
          createdAt: Date.now()
        };

        // Сообщение всем клиентам что юзер присоединился к чату
        addUser(user, conversationId);
        broadcastMessageToAll(message, conversationId);
        addMessage(message, conversationId);
      });
    })
  };

  const onLeave = (conversationId, userId) => {

    findUser(userId).then(user => {
      if (!user) {
        console.log('No such user!');
        return;
      }

      const message = {
        conversation: conversationId,
        message: `left  ${user.firstName} ${user.lastName}`,
        author: user.id,
        createdAt: Date.now()
      };

      // Сообщение всем клиентам что юзер уходит с чата
      broadcastMessageToAll(message, conversationId);
      addMessage(message, conversationId);
      removeUser(user, conversationId);
    });
  };

  // Если с клиента пришло сообщение
  const onMessage = ({ message, userId }, conversationId, respondFunc) => {
    if (!message || !userId) {
      sendError(respondFunc, 'No required field');
    }

    const fullMessage = {
      conversation: conversationId,
      message,
      author: userId,
      createdAt: Date.now()
    };

    // Сообщение всем клиентам от текущего юзера
    broadcastMessageToAll(fullMessage, conversationId);
    addMessage(fullMessage, conversationId);
  };

  // Если с клиент отсоединился
  const onDisconnect = (error) => {
    console.log('client disconnect...', client.id, 'Error: ', error);
    const clientConversationIds = getClientConversationIds(client);

    clientConversationIds.forEach( conversationId => {
      removeClient(client, conversationId);
    });
  };

  return {
    onJoin,
    onLeave,
    onMessage,
    onDisconnect,
  };
};

module.exports = getConversationHandlers;
