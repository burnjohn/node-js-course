const url = require('url');

const getId = url => {
  const lastIndex = url.lastIndexOf('/');

  if (lastIndex !== -1) {
    return url.slice(lastIndex +1);
  }
};

const getProducts = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const id = getId(parsedUrl.path);

  response.writeHead(200, {"Content-Type": "application/json"});
  response.write(JSON.stringify({ productid: id }));
  response.end();
};

module.exports = getProducts;
