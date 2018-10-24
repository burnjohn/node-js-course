const io = require('socket.io-client');

const initChat = () => {
  const socket = io.connect('http://localhost:8080');

  socket.on('error', function(err) {
    console.log('received socket error:');
    console.log(err);
  });

  socket.on('message', function(message) {
    console.log('message: ', message);
  });

  function register(userId, cb) {
    socket.emit('register', userId, cb);
  }

  function join(conversationId, cb) {
    socket.emit('join', conversationId, cb);
  }

  function leave(chatRoomName, cb) {
    socket.emit('leave', chatRoomName, cb);
  }

  function message(chatRoomName, msg, cb) {
    socket.emit('message', msg, cb);
  }

  function getChatrooms(cb) {
    socket.emit('chatrooms', cb);
  }

  function getAvailableUsers(cb) {
    socket.emit('availableUsers', cb);
  }

  return {
    register,
    join,
    leave,
    message,
    getChatrooms,
    getAvailableUsers,
  };
};

export default initChat;

