const orderController = require('./controller');

orderController.saveOrder({
  items: [
    { name: 'pizza', count: 2 },
    { name: 'beer', count: 1 },
  ],
  time: 1555242804290,
  userId: '123'
});

console.log(express);

