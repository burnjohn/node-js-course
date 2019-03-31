const io = require('socket.io-client');

const getChatHandlers = () => {
  const socket = io.connect('http://localhost:80');

  function registerHandler(onMessageReceived) {
    socket.on('message', onMessageReceived);
  }

  function unregisterHandler() {
    socket.off('message');
  }

  socket.on('error', function(err) {
    console.log('received socket error:');
    console.log(err);
  });

  function register(name, cb) {
    socket.emit('register', name, cb);
  }

  function join(chatRoomName, cb) {
    socket.emit('join', chatRoomName, cb);
  }

  function leave(chatRoomName, cb) {
    socket.emit('leave', chatRoomName, cb);
  }

  function message(chatRoomName, msg, cb) {
    socket.emit('message', {chatRoomName, message: msg}, cb);
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
    registerHandler,
    unregisterHandler,
  };
};

export default getChatHandlers;

