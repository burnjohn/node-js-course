const express = require('express');
const mainRoute = require('../main');
const getUser = require('../users/get-user');
const deleteUser = require('../users/delete-user');
const getAllUser = require('../users/get-all-users');
const createUser = require('../users/create-user');
const updateUser = require('../users/update-user');

const apiRoutes = express.Router();

apiRoutes
  .get('/', mainRoute)
  .get('/users', getAllUser)
  .get('/users/:id', getUser)
  .delete('/users/:id', deleteUser)
  .put('/users/:id', updateUser)
  .post('/users', createUser);


module.exports = apiRoutes;
