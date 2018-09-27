const mainRoute = require('./main/main');
const motocycleRoute = require('./motocycle/motocycle');
const getUser = require('./user/get-user');
const createUser = require('./user/create-user');

const router = {
  '/me': mainRoute,
  '/motocycle': motocycleRoute,
  '/user': getUser,
  '/user/create': createUser,
  default: mainRoute
};

module.exports = router;
