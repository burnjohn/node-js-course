const io = require('socket.io-client');

const initChat = () => {
  const socket = io.connect('http://localhost:8080');
  const userId = '5bbe436478847559db89b3d8';

  socket.on('error', function(err) {
    console.log('received socket error:');
    console.log(err);
  });

  socket.on('message', function(message) {
    console.log('message: ', message);
  });

  function join(cb) {
    socket.emit('join', userId, cb);
  }

  function leave(cb) {
    socket.emit('leave', userId, cb);
  }

  function message(message, cb) {
    const data = {
      userId,
      message
    };
    socket.emit('message', data, cb);
  }

  window.chat = {
    join,
    leave,
    message,
  };
};

export default initChat;

