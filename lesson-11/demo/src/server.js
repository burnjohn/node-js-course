const bodyParser = require('body-parser');
const app = require('./modules/app');
const morgan = require('morgan');
const startBot = require('./modules/telegram-bot');

const errorHandler = (err, req, res)  => {
  console.error(err.stack);

  res.json(500).send('Something broke!');
};

const startServer = port => {
  app
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(morgan('dev'))
    .use(errorHandler);

  app.listen(port);

  startBot();

  console.log('Server was started at http://localhost:' + port);
};

module.exports = startServer;
