const ConversationSchema = require('../../models/conversation');
const UserSchema = require('../../models/user');
const server = require('../../modules/server');
const initChat = require('../chat/init-chat');

const createConversationInDB = (userId1, userId2, name) => {
  const conversation = new ConversationSchema({
    name,
    participants: [userId1, userId2]
  });

  return conversation.save().then(savedConversation => {
    updateUsers(userId1, userId2, savedConversation.id).then(() => {
      console.log('Users updated with conversation: ', savedConversation.id);
    });

    return savedConversation;
  });
};

const updateUser = (userId, conversationId) => {
  return UserSchema.findOneAndUpdate({ _id: userId }, { $push: { conversations: conversationId } });
};

const updateUsers = (userId1, userId2, conversationId) => {
  return Promise.all([updateUser(userId1, conversationId), updateUser(userId2, conversationId)]);
};

const checkUserConversations = (ownerId, newUserId) => {
  return ConversationSchema.find({ participants: [ownerId ,newUserId ] })
};

const handleStartConversation = (request, response) => {
  const convesationOwnerId = request.body.ownerId;
  const newUserId = request.body.newUserId;
  const name = request.body.name;

  const sendResponse = (conversationList) => {
    const conversation = conversationList[0];

    initChat(server, conversation);

    response.json({
      status: 'success',
      conversation
    });
  };

  const sendError = (error) => {
    response.status(400);
    response.json({
      error: error.message
    });
  };

  checkUserConversations(convesationOwnerId, newUserId)
    .then( conversation => {
      if (!conversation.length) {
        return createConversationInDB(convesationOwnerId, newUserId, name)
      }
      return conversation;
    })
    .then(sendResponse)
    .catch(sendError)
};

module.exports = handleStartConversation;
