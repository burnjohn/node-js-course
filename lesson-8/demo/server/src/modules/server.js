const app = require('./app');
const http = require('https');

const options = {

};

const server = https.createServer(app, options);

module.exports = server;
