const bodyParser = require('body-parser');
const app = require('./modules/app');
const server = require('./modules/server');
const morgan = require('morgan');
const router = require('./router');

const errorHandler = (err, request, response)  => {
  console.error(err.stack);

  response.status(500);
  response.send('Something broke!');
};

const initServer = port => {
  app
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(morgan('dev'))
    .use('/', router)
    .use(errorHandler);

  server.listen(port);

  console.log('Server was started at http://localhost:' + port);
};

module.exports = initServer;
