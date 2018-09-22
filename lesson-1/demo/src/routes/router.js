const mainRoute = require('./main/main');
const motocycleRoute = require('./motocycle/motocycle');

const router = {
  '/me': mainRoute,
  '/motocycle': motocycleRoute,
  default: mainRoute
};

module.exports = router;
