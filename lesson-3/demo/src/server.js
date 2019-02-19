const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = require('./modules/app');
const morgan = require('morgan');
const router = require('./routes/router');

const errorHandler = (req, res, next)  => {
  res.status(500).send('No such page');
  next();
};

const checkAuth = (req, res, next)  => {
  // check if user is logged it
  const userLoggedIn = checkUserAuth(req.headers);

  if (!userLoggedIn) {
    res.status(403).send('access forbidden');
    return;
  }

  next();
};

const staticPath = path.join(__dirname, '..', 'assets');

const startServer = port => {
  app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(morgan('dev'))
    // .use(checkAuth)
    .use(express.static(staticPath))
    .use('/', router)
    .use(errorHandler);

  app.listen(port);

  console.log('Server was started at http://localhost:' + port);
};

module.exports = startServer;
