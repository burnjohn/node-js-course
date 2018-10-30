import io from 'socket.io-client';
import { renderMessage } from './render-service'
import { startMessagesService } from './messages-service'

const activateLeaveChatBtn = (onChatLeave) => {
  const leaveChatBtn = document.querySelector('.message__leave-btn');
  leaveChatBtn.addEventListener('click', onChatLeave);
};

const initChat = (userId, conversationId) => {
  const socket = io.connect('http://localhost:8080', );

  startMessagesService(sendMessage, joinToChat);

  socket.on('error', function(err) {
    console.log('received socket error:');
    console.log(err);
  });

  socket.on('message', function(message) {
    console.log('message: ', message);

    renderMessage(message, userId);
  });

  function joinToChat(cb) {
    socket.emit('join', userId, conversationId, cb);
    activateLeaveChatBtn(leaveChat)
  }

  function leaveChat(cb) {
    socket.emit('leave', conversationId, userId, cb);
  }

  function sendMessage(message, cb) {
    const data = {
      userId,
      message
    };
    socket.emit('message', data, conversationId, cb);
  }


};

export default initChat;

