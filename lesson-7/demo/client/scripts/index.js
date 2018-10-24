import initChat from './socket';

const requestParams = {
  method: 'POST',
  mode: 'no-cors',
  headers: {
    'Content-Type': 'application/json'
  },
  body: {
    ownerId: "5bbe436478847559db89b3d8",
    newUserId: "5bbd954b245ea347fa3d2138",
    name: "Покупка квартиры"
  }
};

const connectToConversation = () =>
  fetch('http://localhost:8080/start-chat', requestParams);

const initChatButton = document.getElementById('init-chat');

initChatButton.addEventListener('click', () => {
  connectToConversation()
    .then(() => {
      // setTimeout(initChat, 2000);
    })
});
