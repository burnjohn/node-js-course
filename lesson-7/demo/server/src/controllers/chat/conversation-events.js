const User = require('../../models/user');
const Messages = require('../../models/message');
const { sendError } = require('./response-helper');
const conversationManager = require('./conversation-manager');

const getConversationHandlers = (client) => {

  const onJoin = (userId, conversationId) => {
    conversationManager.addClient(client, conversationId);

    Messages.find({ conversation: conversationId }, null, {
      skip:0, // Starting Row
      limit:20, // Ending Row
      sort:{
        createdAt: 1 //Sort by Date Added ASC
      }
    })
      .then(messageList => {
        messageList.forEach( message => {
          conversationManager.broadcastMessage(message, conversationId);
        });

        User.findById(userId).then(user => {
          const message = {
            conversation: conversationId,
            message: `joined ${user.firstName} ${user.lastName}`,
            author: user.id,
            createdAt: Date.now()
          };

          conversationManager.addUser(user, conversationId);
          conversationManager.broadcastMessage(message, conversationId);
          conversationManager.addMessage(message, conversationId);
        });
      })
  };

  const onLeave = (conversationId, userId) => {

    User.findById(userId).then(user => {
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

      conversationManager.broadcastMessage(message, conversationId);
      conversationManager.addMessage(message, conversationId);

      conversationManager.removeUser(user, conversationId);
    });
  };

  const onMessage = ({message, userId} = {}, conversationId, respondFunc) => {

    if (!message || !userId) {
      sendError(respondFunc, 'No required field');
    }

    const fullMessage = {
      conversation: conversationId,
      message,
      author: userId,
      createdAt: Date.now()
    };

    conversationManager.broadcastMessage(fullMessage, conversationId);
    conversationManager.addMessage(fullMessage, conversationId);
  };

  const onDisconnect = (error) => {
    console.log('client disconnect...', client.id, 'Error: ', error);
    const clientConversationIds = conversationManager.getClientConversationIds(client);

    clientConversationIds.forEach( conversationId => {
      conversationManager.removeClient(client, conversationId);
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
