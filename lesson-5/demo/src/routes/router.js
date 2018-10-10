const express = require('express');
const mainRoute = require('./main/main');
const getImageRoute = require('./image/get-image');
const getUser = require('./user/get-user');
const deleteUser = require('./user/delete-user');
const getAllUser = require('./user/get-all-users');
const getSaveImageHandlers = require('./image/save-image-multipart');
const createUser = require('./user/create-user');
const updateUser = require('./user/update-user');

const apiRoutes = express.Router();

apiRoutes
  .get('/', mainRoute)
  .get('/image', getImageRoute)
  .post('/image', getSaveImageHandlers())

  .get('/users', getAllUser)
  .get('/users/:id', getUser)
  .delete('/users/:id', deleteUser)
  .put('/users/:id', updateUser)
  .post('/users', createUser);


module.exports = apiRoutes;
