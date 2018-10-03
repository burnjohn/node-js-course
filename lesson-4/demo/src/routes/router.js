const express = require('express');
const mainRoute = require('./main/main');
const getImageRoute = require('./image/get-image');
const getUser = require('./user/get-user');
const createUser = require('./user/create-user');

const apiRoutes = express.Router();

const middlewareExample = (req, resp, next) => {
  if (req.body.userName) {
    next();
    return;
  }

  resp.status(400);
  resp.json({
    error: 'user has no "name" field'
  })
};

apiRoutes
  .get('/', mainRoute)
  .get('/image', getImageRoute)
  .get('/users/:id', getUser)
  .post('/users', middlewareExample, createUser);


module.exports = apiRoutes;
