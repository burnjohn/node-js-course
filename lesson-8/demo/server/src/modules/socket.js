const createSocket = require('socket.io');
const server = require('./server');

const socketIo = createSocket(server);

console.log('socketIo was started');

module.exports = socketIo;


