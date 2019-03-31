const fs = require('fs');
const path = require('path');
const util = require('util');

const usersFolder = path.resolve(__dirname, '../../../', 'data/users');

const writeFile = util.promisify(fs.writeFile);

const saveNewUser = (fileName, data) => {
  const src = path.resolve(usersFolder, fileName + '.json');
  const dataStr = JSON.stringify(data);

  // returning promise
  return writeFile(src, dataStr);
};

const createUser = (request, response) => {
  let body = [];

  const handleDataLoad = () => {
    const data = Buffer.concat(body).toString();

    var fileStream = fs.createWriteStream(path.join(__dirname, 'user-image.json'));
    fileStream.write(body.toString());
    fileStream.end();

    fileStream.on('data', (chunk) => {
      console.log('chunk', chunk);
    });

    const userData = Object.assign({}, JSON.parse(data), { id: Date.now() });

    const fileName = userData.userName.toLowerCase() + userData.id;

    const sendResponse = () => {
      response.writeHead(200, {"Content-Type": "application/json"});
      response.write(JSON.stringify(userData));
      response.end();
    };

    saveNewUser(fileName, userData)
      .then(sendResponse)
      .catch(console.log);
  };

  request
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', handleDataLoad);
};

module.exports = createUser;
