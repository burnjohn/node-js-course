const fs = require('fs');
const { Transform } = require('stream');

const myReadStream = fs.createReadStream(__dirname + '/readme.txt', {encoding: 'utf8'});
const myWriteStream = fs.createWriteStream(__dirname + '/readme_created.txt');

myWriteStream.on('open', () => {
  console.log('File processing was started');
});

myWriteStream.on('finish', () => {
  console.log('File was processed');
});

const upperCaseTransform = new Transform({
  transform: (chunk, encoding, next) => {
    const newData = chunk
      .toString()
      .split(' ')
      .map(str => str.toUpperCase())
      .reverse()
      .join(' ');


    next(null, newData);
  }
});

upperCaseTransform.on('error', console.log);

myReadStream
  .pipe(upperCaseTransform)
  .pipe(myWriteStream);