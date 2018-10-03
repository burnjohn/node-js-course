const fs = require('fs');
const path = require('path');

const motocycleRoute = (request, response) => {
  const filePath = path.join(__dirname, '../../../', 'assets', 'yamaha-v-star-1300-1.jpg');
  const image = fs.statSync(filePath);

  response.writeHead(200, {
    'Content-Type': 'image/jpeg',
    'Content-Length': image.size
  });

  const readStream = fs.createReadStream(filePath);

  readStream.pipe(response);
};

module.exports = motocycleRoute;
