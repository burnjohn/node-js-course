// http.createServer - метод для создания веб сервера на node js https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener
// http incoming message - обьект 'request' что приходит в коллбек http.createServer https://nodejs.org/dist/latest-v10.x/docs/api/http.html#http_class_http_incomingmessage
// http server response - обьект 'response' что приходит 2м параметров в http.createServer https://nodejs.org/dist/latest-v10.x/docs/api/http.html#http_class_http_serverresponse

const http = require('http');
const fs = require('fs');
const path = require('path');


const server = http.createServer((request, response) => {

  console.log(request.url);

  if (request.url.includes('api')) {

    if (request.url.includes('products')) {
      const productFilePath = path.join(__dirname, 'products.json');
      const products = fs.readFileSync(productFilePath);

      response.writeHead(200, {'content-type': 'application/json'});
      response.write(products);
      response.end();
      return;
    }
  }

  if (request.url.includes('text')) {
    response.write('Hello world');
    response.end();
    return;
  }

  const productPageFilePath = path.join(__dirname, 'product-page.html');
  const productsHTML = fs.readFileSync(productPageFilePath);

  response.writeHead(200, {'content-type': 'text/html'});
  response.write(productsHTML);
  response.end();
});


server.listen(3000);

console.log('Server is running on port 3000');