const MessageSchema = require('../../../models/message');

const createMessagesManager = ({ image, conversationId, membersList }) => {
  const chatHistory = [];

  // Отправить сообщение всем юзерам в комнате
  const broadcastMessage = (message) => {
    console.log('Message got: ', message);

    membersList.forEach(member => {
      member.emit('message', message)
    });
  };

  // Добавить запись в историю сообщений комнаты
  const addMessage = (entry) => {
    chatHistory.push(entry);

    console.log('message: ', entry);

    const message = new MessageSchema(entry);
    message.save()
      .then(console.log)
      .catch(console.error)
  };

  // Получить историю сообщений комнаты
  const getChatHistory = () => {
    return chatHistory;
  };

  return {
    broadcastMessage,
    addMessage,
    getChatHistory,
  };
};

module.exports = createMessagesManager;
