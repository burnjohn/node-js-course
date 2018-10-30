const bodyParser = require('body-parser');
const app = require('./modules/app');
const server = require('./modules/server');
const morgan = require('morgan');
const router = require('./router');
const cors = require("cors");

const errorHandler = (err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({ status: 'error', error: 'Something broke!' });
  } else {
    next(err);
  }
};

// Обрабатываем CORS когда запускаем сервер и клиент на разных портах
const corsOptions = {
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
};

const initServer = port => {
    app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
      extended: true
    }))
    .use(morgan('dev'))
    .use(cors(corsOptions))
    .use('/', router)
    .use(errorHandler);

  server.listen(port);

  console.log('Server was started at http://localhost:' + port);
};

module.exports = initServer;
