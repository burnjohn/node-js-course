const mainRoute = require('./main/main');
const imageRoute = require('./image/get-image');
const getUser = require('./user/get-user');
const createUser = require('./user/create-user');

const router = {
  '/me': mainRoute,
  '/image': imageRoute,
  '/user': getUser,
  '/users': createUser,
  default: mainRoute
};

module.exports = router;
