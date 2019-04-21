
const ordersStorage = {};

const dataBase = {};

dataBase.saveOrder = (order, userId)  =>{
  ordersStorage[userId] = order;

  console.log('dataBase.saveOrder: ', ordersStorage);
};

dataBase.getOrder = (userId) => {
  return ordersStorage[userId];
};

module.exports = dataBase;
