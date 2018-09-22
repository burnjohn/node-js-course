const mainRoute = require('./main/main');
const motocycleRoute = require('./motocycle/motocycle');

const router = {
  '/': mainRoute,
  '/motocycle': motocycleRoute,
  default: mainRoute
};

module.exports = router;
