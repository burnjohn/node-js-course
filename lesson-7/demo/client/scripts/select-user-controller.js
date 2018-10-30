import initChat from './socket';

export const startSelectUser = ({ conversation }) => {
  const usersContainer = document.querySelector('.select-user');
  const initChatBtn = document.querySelector('.init-chat');
  usersContainer.classList.remove('hidden');
  initChatBtn.classList.add('hidden');

  const usersList = document.querySelectorAll('.select-user__item');
  const chatNode = document.querySelector('.chat');

  const handleUserSelect = (event) => {
    const selectedNode = event.target;
    const userId = selectedNode.attributes['data-id'].value;

    usersContainer.classList.add('hidden');
    chatNode.classList.remove('hidden');

    initChat(userId, conversation._id);
  };

  Array.from(usersList).forEach(userNode => {
    userNode.addEventListener('click', handleUserSelect);
  })
};
