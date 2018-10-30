const startServer = require('./src/start-server');
const connectToDB = require('./src/connect-db');
const initChatListener = require('./src/controllers/chat/init');
const { port, databaseUrl } = require('./config');

startServer(port);
connectToDB(databaseUrl);
initChatListener();
