const UserService = require('./services/user');

const userService = new UserService('user-123');

console.log('From user consumer file: ', userService.getUserFromDB());

const newUser = {
  name: 'BILL',
  email: 'bill@gmail.com',
  age: 22,
};

userService.saveNewUser(newUser);
