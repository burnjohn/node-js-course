const User = require('../../models/user');

const getChatHandlers = (client, conversationManager, conversation) => {

  const onJoin = userId => {
    conversationManager.addClient(client);

    User.findById(userId).then( user => {
      const message = {
        conversationId: conversation.id,
        message: `joined ${user.firstName} ${user.lastName}`,
        author: user.id
      };

      conversationManager.addUser(user);
      conversationManager.addMessage(message);
      conversationManager.broadcastMessage(message);
    });
  };


  const onLeave = () => {
      const message = {
        conversationId: conversation.id,
        message: `left  ${user.firstName} ${user.lastName}`,
        author: user.id
      };

      conversationManager.addMessage(message);
      conversationManager.broadcastMessage(message);

      conversationManager.removeClient(client.id);
  };

  const onMessage = ({ message, authorId } = {}) => {

      const fullMessage = { conversationId, message, authorId: authorId };

      conversationManager.addMessage(fullMessage);
      conversationManager.broadcastMessage(fullMessage);
  };

  const onDisconnect = () => {
    console.log('client disconnect...', client.id);
    conversationManager.removeClient(client);
  };

  return {
    onJoin,
    onLeave,
    onMessage,
    onDisconnect,
  };
};

module.exports = getChatHandlers;
