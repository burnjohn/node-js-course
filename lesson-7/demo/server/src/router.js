const express = require('express');
const mainRoute = require('./controllers/main/main');
const getImageRoute = require('./controllers/image/get-image');
const getUser = require('./controllers/user/get-user');
const deleteUser = require('./controllers/user/delete-user');
const getAllUser = require('./controllers/user/get-all-users');
const getSaveImageHandlers = require('./controllers/image/save-image-multipart');
const createUser = require('./controllers/user/create-user');
const updateUser = require('./controllers/user/update-user');
const createConversation = require('./controllers/conversation/create-conversation');
const getAllConversations = require('./controllers/conversation/get-all-conversations');

const apiRoutes = express.Router();

apiRoutes
  .get('/', mainRoute)
  .get('/image', getImageRoute)
  .post('/image', getSaveImageHandlers())

  .get('/users', getAllUser)
  .get('/users/:id', getUser)
  .delete('/users/:id', deleteUser)
  .put('/users/:id', updateUser)
  .post('/users', createUser)

  .get('/conversations/:userId', getAllConversations)
  .post('/conversations', createConversation);



module.exports = apiRoutes;
