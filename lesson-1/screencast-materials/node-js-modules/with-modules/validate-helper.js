
const getOrdersMissingFields = (order) => {
  if (!order.items) {
    return 'items are missing';
  }

  console.log('getOrdersMissingFields works');

  return null;
};

module.exports = {
  getOrdersMissingFields
};
