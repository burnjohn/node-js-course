const startServer = require('./src/server');
const connectToDB = require('./src/connect-db');
const { port, databaseUrl } = require('./config');

startServer(port);
connectToDB(databaseUrl);
