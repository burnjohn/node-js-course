const fs = require('fs');

const myReadStream = fs.createReadStream(__dirname + '/readme.txt', {encoding: 'utf8'});

let chunkIndex = 0;

myReadStream.on('open', () => {
  console.log('WAS OPENED');
});

myReadStream.on('data', chunk => {
  chunkIndex++;

  if (chunkIndex === 3) {
    myReadStream.pause();
    console.log('WAS PAUSED: ', !myReadStream.isPaused());

    setTimeout(() => {

      myReadStream.resume();
      console.log('WAS STARTED: ', !myReadStream.isPaused());

    }, 3000)
  }

  console.log('New chunk received: ', chunkIndex);
});

myReadStream.on('close', () => {
  console.log('WAS CLOSED');
});

myReadStream.on('error', error => {
  console.log('Error was caught: ', error);
});