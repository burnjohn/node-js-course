const ConversationSchema = require('../../models/conversation');
const UserSchema = require('../../models/user');

const findConversation = id => ConversationSchema.findById(id);

const getAllConversation = userId =>
  new Promise((resolve, reject) => {
    UserSchema
      .findById(userId, 'conversations')
      .then(user => {
        const promiseList = user.conversations.map(item => findConversation(item._id));

        Promise.all(promiseList)
          .then(items => {
            resolve(items);
          })
          .catch(err => {
            console.error(err);
            reject();
          })
      })
  });

const handleGetAllConversations = (request, response) => {
  const userId = request.params.userId;

  const sendResponse = (conversations) => {
    response.status(200);
    response.json(conversations);
  };

  getAllConversation(userId)
    .then(sendResponse)
    .catch(err => {
      console.error(err)
    });
};


module.exports = handleGetAllConversations;
