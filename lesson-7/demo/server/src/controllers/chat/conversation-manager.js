const Message = require('../../models/message');
const { sendError, sendSuccess } = require('./response-helper');

const conversations = {};

// Создать диалог где будут хранится все данные
const createConversation = (conversationId) => {
  conversations[conversationId] = {
    clients: {},
    users: {},
    messages: [],
  };
  console.log('Conversation ', conversationId, ' was created');
};

// Отправить сообщение всем юзерам в комнате
const broadcastMessageToAll = (message, conversationId) => {
  console.log('Message got: ', message);

  const currentConversation = conversations[conversationId];

  if (!currentConversation) {
    console.log('Conversation not found!');
    return;
  }

  Object.values(currentConversation.clients).forEach(client => {
    client.emit('message', message);
  });
};

// Добавить запись в историю сообщений диалога
const addMessage = (data, conversationId, respondFunc) => {
  const currentConversation = conversations[conversationId];

  if (!currentConversation) {
    console.log('Conversation not found!');
    return;
  }

  currentConversation.messages.push(data);

  console.log('message: ', data);

  const message = new Message(data);
  message.save()
    .then(data => sendSuccess(respondFunc, data))
    .catch(error => sendError(respondFunc, error));
};

// Получить историю сообщений комнаты
const getChatHistory = conversationId => (
  Message.find(
    { conversation: conversationId },
    null,
    { sort:{ createdAt: 1 } }//Сортировка по последнему созданому сообщению
  )
);

const addUser = (user, conversationId) => {
  const currentConversation = conversations[conversationId];

  if (!currentConversation.users[user.id]) {
    console.log('User added', user.id);
    currentConversation.users[user.id] = user;
  }
};

const removeUser = (user, conversationId) => {
  const currentConversation = conversations[conversationId];

  if (!currentConversation.users[user.id]) {
    console.log('User removed', user.id);
    currentConversation.users[user.id] = user;
  }
};

const addClient = (client, conversationId) => {
  console.log('Client added', client.id);

  if (!conversations[conversationId]) {
    createConversation(conversationId);
  }

  const currentConversation = conversations[conversationId];

  if (!currentConversation.clients[client.id]) {
    currentConversation.clients[client.id] = client;
  }
};

const getClientConversationIds = (client) => {
  const conversationsList = Object.values(conversations);
  const conversationsIdsList = Object.values(conversations);

  const clientConversations = conversationsList.filter(dialog => dialog.clients[client.id]);

  if (!clientConversations.length) {
    console.log('Client not found!');
    return [];
  }

  const clientConversationsIds = conversationsIdsList.filter(conversationId => {
    const conversationExists = !!conversations[conversationId];

    return conversationExists;
  });

  return clientConversationsIds;
};

const removeClient = (client, conversationId) => {
    delete conversations[conversationId].clients[client.id];
    console.log('Client removed from conversation:', conversationId);
};


module.exports = {
  removeClient,
  removeUser,
  addClient,
  addUser,
  addMessage,
  getChatHistory,
  broadcastMessageToAll,
  getClientConversationIds
};
