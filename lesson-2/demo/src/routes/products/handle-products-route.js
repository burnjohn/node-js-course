const sendProduct = require('./send-product');
const createProduct = require('./create-product');

const handleProductsRoute = (request, response) => {
  const reqMethod = request.method;

  if (reqMethod === 'GET') {
    sendProduct(request, response);
    return;
  }

  if (reqMethod === 'POST') {
    createProduct(request, response);
  }
};

module.exports = handleProductsRoute;