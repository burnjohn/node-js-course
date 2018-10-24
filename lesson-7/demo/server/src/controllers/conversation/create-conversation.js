const ConversationSchema = require('../../models/conversation');
const UserSchema = require('../../models/user');

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

const handleCreateRequest = (request, response) => {
  const userId1 = request.body.userId1;
  const userId2 = request.body.userId2;
  const name = request.body.name;

  const sendResponse = (conversation) => {
    console.log(conversation);

    response.json({
      status: 'success',
      conversation
    });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: 'user was not saved'
    });
  };

  createConversationInDB(userId1, userId2, name)
    .then(sendResponse)
    .catch(sendError)
};

module.exports = handleCreateRequest;
