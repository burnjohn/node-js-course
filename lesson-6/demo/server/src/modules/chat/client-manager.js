const userTemplates = require('./config/users');

const createClientManager = () => {
  // mapping of all connected clients
  const clients = new Map();

  const addClient = (client) => {
    console.log('Client added', client.id);

    clients.set(client.id, {client});
  };

  const registerClient = (client, user) => {
    console.log('Client registered', client.id);

    clients.set(client.id, {client, user});
  };

  const removeClient = (client) => {
    console.log('Client removed');

    clients.delete(client.id);
  };

  const getAvailableUsers = () => {
    const usersTaken = new Set(
      Array.from(clients.values())
        .filter(c => c.user)
        .map(c => c.user.name),
    );
    return userTemplates.filter(u => !usersTaken.has(u.name));
  };

  const isUserAvailable = (userName) => {
    return getAvailableUsers().some(u => u.name === userName);
  };

  const getUserByName = (userName) => {
    return userTemplates.find(u => u.name === userName);
  };

  const getUserByClientId = (clientId) => {
    return (clients.get(clientId) || {}).user;
  };

  return {
    addClient,
    registerClient,
    removeClient,
    getAvailableUsers,
    isUserAvailable,
    getUserByName,
    getUserByClientId,
  };
};

module.exports = createClientManager;
