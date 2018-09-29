const mainRoute = require('./main/main');
const motocycleRoute = require('./motocycle/motocycle');
const productsRoute = require('./products/productsRoute');

const router = {
  '/products': productsRoute,
  '/me': mainRoute,
  '/motocycle': motocycleRoute,
  default: mainRoute
};

module.exports = router;
