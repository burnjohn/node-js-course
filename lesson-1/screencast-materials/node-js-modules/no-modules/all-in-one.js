
const ordersStorage = {
  '12345-bob': {
    items: [
      { name: 'pizza', count: 2 },
      { name: 'beer', count: 1 },
    ],
    time: 1555242804290,
    id: 123
  }
};

const dataBase = {
  saveOrder(order, userId) {

    ordersStorage[userId] = order;

  }
};

const getMissedOrderFields = (order) => {
  if (!order.items) {
    return 'items are missing';
  }

  return null;
};

const orderController = {
  saveOrder(order) {

    if (getMissedOrderFields(order)) {
      return;
    }

    const storage = ordersStorage;

    storage[userId] = null;

    dataBase.saveOrder(order, userId);
  }
};

orderController.saveOrder({
  items: [
    { name: 'pizza', count: 2 },
    { name: 'beer', count: 1 },
  ],
  time: 1555242804290,
  userId: 123
});