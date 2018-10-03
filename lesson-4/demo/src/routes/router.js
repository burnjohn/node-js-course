const express = require('express');
const mainRoute = require('./main/main');
const motocycleRoute = require('./motocycle/motocycle');
const getUser = require('./user/get-user');
const createUser = require('./user/create-user');

const apiRoutes = express.Router();

apiRoutes
  .get('/', mainRoute)
  .get('/image', motocycleRoute)
  .get('/users/:id', getUser)
  .post('/users', createUser);


module.exports = apiRoutes;
