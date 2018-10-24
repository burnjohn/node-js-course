const createUserManager = () => {
// Все доступные устройства с пользователями что есть в чате
  const clients = {};

// Добавить устройство
  const addClient = (client) => {
    console.log('Client added', client.id);

    clients[client.id] = {client};
  };

// Зарегистрировать пользователя
  const registerClient = (client, user) => {
    // client - устройство/клиент
    // user - пользователь
    console.log('Client registered', client.id);

    clients[client.id] = {client, user};
  };

  const removeClient = (client) => {
    console.log('Client removed');

    delete clients[client.id];
  };

// Взять пользователя  по id устройства
  const getUserById = (userId) => {
    console.log(userTemplates.find(u => u.id === userId));
    return userTemplates.find(u => u.id === userId);
  };

// Взять пользователя по id устройства
  const getUserByClientId = (clientId) => {
    const client = clients[clientId] || {};

    return client.user;
  };

  return {
    addClient,
    registerClient,
    removeClient,
    getUserById,
    getUserByClientId
  }
};


module.exports = createUserManager;
