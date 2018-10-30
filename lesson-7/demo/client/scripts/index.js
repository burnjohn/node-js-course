import { startSelectUser } from './select-user-controller';

const requestParams = {
  method: 'POST',
  body: {
    ownerId: "5bbe436478847559db89b3d8",
    newUserId: "5bbd954b245ea347fa3d2138",
    name: "Покупка квартиры"
  }
};

const connectToConversation = () =>
  fetch('http://localhost:8080/start-chat', requestParams);

const initChatButton = document.querySelector('.init-chat');

initChatButton.addEventListener('click', () => {
  connectToConversation()
    .then(function(response) {
      return response.json();
    })
    .then(startSelectUser);
});
