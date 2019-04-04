const express = require('express');
const mainRoute = require('./main/main');
const getUser = require('./user/get-user');
const getSaveImageHandlers = require('./image/save-image-multipart');
const createUser = require('./user/create-user');

const apiRoutes = express.Router();

const middlewareExample = (req, resp, next) => {
  if (req.body.userName) {
    next();
    return;
  }

  resp.status(400);
  resp.json({
    error: 'user has no "userName" field'
  })
};

apiRoutes
  .get('/', mainRoute)
  .get('/users/:userId', getUser)

  .post('/users', middlewareExample, createUser)
  .post('/image', getSaveImageHandlers())
  .get('*', (req, res, next) => {
      res.status(404).send('Route not exists');
  });


module.exports = apiRoutes;
