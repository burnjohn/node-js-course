const core = require('../../core');
const { pick } = require('lodash');
const User = require('../db/schemas/user');
const bcrypt = require('bcrypt');

const saveUserInDB = (userData) => new User(userData);

const pickUserFields = (user) =>
  pick(user, [
    'username',
    'telephone',
    'password',
    'email'
  ]);

const createUser = (userInput) => new Promise((resolve, reject) =>{
  const errorsList = core.inputCheck.user(userInput);

  if (errorsList.length) {
    reject(errorsList);
    return;
  }

  const hashedPassword = bcrypt.hashSync(user.password, 10);
  const userData = Object.assign({}, user, {
    password: hashedPassword
  });

  return saveUserInDB(userData)
    .then(pickUserFields)
    .then(resolve)
    .catch(reject);
});

export default createUser