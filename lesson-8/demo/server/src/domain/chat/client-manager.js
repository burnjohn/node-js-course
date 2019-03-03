// Шаблон пользователей
const userTemplates = require('./templates/users');

// Все доступные устройства с пользователями что есть в чате
const clients = {};

// Добавить устройство
const addClient = (client) => {
  console.log('Client added', client.id);

  clients[client.id] = { client };
};

// Зарегистрировать пользователя
const registerClient = (client, user) => {
  // client - устройство/клиент
  // users - пользователь
  console.log('Client registered', client.id);

  clients[client.id] = { client, user };
};

const removeClient = (client) => {
  console.log('Client removed');

  delete clients[client.id];
};

// Взять всех свободных пользователей которых еще нет в чате из шаблона
const getAvailableUsers = () => {
  const allClients = Object.values(clients);

  const uniqueUsers = new Set(
    allClients
      .filter(c => c.user)
      .map(c => c.user.name),
  );

  return userTemplates.filter(u => !uniqueUsers.has(u.name));
};

const isUserAvailable = (userName) => {
  return getAvailableUsers().some(u => u.name === userName);
};

// Взять пользователя из шаблона по id устройства
const getUserByName = (userName) => {
  return userTemplates.find(u => u.name === userName);
};

// Взять пользователя по id устройства
const getUserByClientId = (clientId) => {
  const client = clients[clientId] || {};

  return client.user;
};



module.exports = {
  addClient,
  registerClient,
  removeClient,
  getAvailableUsers,
  isUserAvailable,
  getUserByName,
  getUserByClientId,
};
