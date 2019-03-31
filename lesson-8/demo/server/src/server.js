const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const controller = require('./controller');

const errorHandler = (err, req, res, next)  => {
  console.error(err.stack);

  res.json(404).send('No such page');
};

const startServer = port => {
  const server = http.createServer(controller.app);

  controller.app
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(morgan('dev'))
    .use('/', contoller.routes)
    .use(errorHandler);

  contoller.chat(server);

  server.listen(port);

  console.log('Server was started at http://localhost:' + port);
};

module.exports = startServer;
