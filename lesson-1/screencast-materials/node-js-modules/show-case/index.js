require('./user-consumer');
const UserService = require('./services/user');

const userService = new UserService('batman-123');

console.log('From index file: ', userService.getUserFromDB());
