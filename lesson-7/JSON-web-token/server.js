const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');
const findUser = require('./app/routes/find-user');
const createUser = require('./app/routes/create-user');
const auth = require('./app/routes/auth');
const app = require('./app/modules/app');
const verifyToken = require('./app/modules/check-token');

const port = process.env.PORT || 8080;

mongoose.connect(config.database, { useNewUrlParser: true });

app
  .set('superSecret', config.secret)
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(morgan('dev'));

const apiRoutes = express.Router();

apiRoutes
  .post('/authenticate', auth)
  .use(verifyToken)
  .get('/', (req, res) => {
    res.send({ message: 'Welcome to the API!' });
  })
  .get('/users', findUser)
  .post('/users', createUser);


app.use('/api', apiRoutes);

app.listen(port);
console.log('Server is running at http://localhost:' + port);

global.app = app;

