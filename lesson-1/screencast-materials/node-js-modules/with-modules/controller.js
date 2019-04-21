const helpers = require('./validate-helper');
const dataBase = require('./database');

const orderController = {};

orderController.saveOrder = (order) => {
  if (helpers.getOrdersMissingFields(order)) {
    return;
  }

  console.log('SaveOrder in controller');

  dataBase.saveOrder(order, order.userId);
};

orderController.getUserOrder = (userId) => {
  dataBase.getOrder(userId);
};

module.exports = orderController;
