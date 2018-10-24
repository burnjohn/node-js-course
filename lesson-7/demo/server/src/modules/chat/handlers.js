const getChatHandlers = (client, userManager, messagesManager, conversation) => {
  const getUser = clientId => {
    const user = userManager.getUserByClientId(clientId);

    if (!user) {
      console.log('select user first');
      return false;
    }

    return user;
  };

  // обработчик на регистрацию клиента (устройства что подключилось к чату)
  const handleRegister = (userId, respondToClient) => {
    const user = userManager.getUserById(userId);

    userManager.registerClient(client, user);

    return respondToClient(null, user);
  };

  // обработчик на добавления юзера в чат рум (но добавляем мы устройство-клиент, а не юзера)
  const handleJoin = (conversationId, respondToClient) => {
    const user = getUser(client.id);

    const message = {
      conversationId: conversation.id,
      message: `joined ${user.firstName} ${user.lastName}`,
      author: user.id
    };

    messagesManager.addMessage(message);
    messagesManager.broadcastMessage(message);
    
    respondToClient(null);
  };


  const handleLeave = (conversationId, respondToClient) => {

    getUserAndChat(conversationId, client.id)
      .then(({ user }) => {
        const message = { conversationId, message: `left ${user}`, author: user.id };

        messagesManager.addMessage(message);
        messagesManager.broadcastMessage(message);

        userManager.removeClient(client.id);

        respondToClient(null);
      })
      .catch(respondToClient);
  };

  // обработчик на сообщение в чат комнате
  const handleMessage = ({ conversationId, message } = {}, respondToClient) => {

    getUserAndChat(conversationId, client.id)
      .then(({ user }) => {
        const message = { conversationId, message, author: user.id };

        messagesManager.addMessage(message);
        messagesManager.broadcastMessage(message);

        respondToClient(null);
      })
      .catch(respondToClient);
  };

  const handleDisconnect = () => {
    // remove user profile
    userManager.removeClient(client);
  };

  return {
    handleRegister,
    handleJoin,
    handleLeave,
    handleMessage,
    handleDisconnect,
  };
};

module.exports = getChatHandlers;
