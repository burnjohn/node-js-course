const startServer = require('./src/server');
const connectToDB = require('./src/db/connect-db');
const { port, databaseUrl } = require('./config');
require('./src/cloud-storage');

startServer(port);
connectToDB(databaseUrl);

