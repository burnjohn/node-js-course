import { startSelectUser } from './select-user-controller';

// Захардкоженые параметры юзеров для диалога
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
    .then(response => {
      return response.json();
    })
    .then(startSelectUser);
});
