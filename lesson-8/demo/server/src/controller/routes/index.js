const express = require('express');
const mainRoute = require('../main');
const getUser = require('../users/get-user');
const deleteUser = require('../users/delete-user');
const getAllUser = require('../users/get-all-users');
const createUser = require('../users/create-user');
const updateUser = require('../users/update-user');

const apiRoutes = express.Router();

const checkAuth = (req, resp, next) => {
  const userId = req.params.id;
  const userToken = req.body.authToken;
  const userData = decryptUser(userToken);

  if (userData.id === userId) {
    next();
  } else {
    resp.text('Not authorised');
  }
};

apiRoutes
  .get('/', mainRoute)
  .get('/users', getAllUser)


  .get('/users/:id', checkAuth, getUser)

  .delete('/users/:id', deleteUser)
  .put('/users/:id', updateUser)
  .post('/users', createUser);


module.exports = apiRoutes;
