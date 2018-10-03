const bodyParser = require('body-parser');
const app = require('./modules/app');
const morgan = require('morgan');
const router = require('./routes/router');

const errorHandler = (err, req, res)  => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
};

const startServer = port => {
  app
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(morgan('dev'))
    .use('/', router)
    .use(errorHandler);

  app.listen(port);

  console.log('Server was started at http://localhost:' + port);
};

module.exports = startServer;
