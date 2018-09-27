const fs = require('fs');
const path = require('path');

function dirExists(pathToFile) {
  const exists = fs.existsSync(pathToFile);
  console.log(pathToFile + ' ' + exists);
}

dirExists(path.resolve(__dirname, 'data'));