export const startMessagesService = (onMessage, onJoin) => {
  const joinChatBtn = document.querySelector('.message__join-btn');
  const messagesInputContainer = document.querySelector('.message__input-container');

  const activateMessages = () => {
    const messagesInput = document.querySelector('.message__input');
    const messagesSendBtn = document.querySelector('.message__send-btn');

    messagesSendBtn.addEventListener('click', () => {
      const messageText = messagesInput.value;

      if (!messageText) {
        console.warn('No message!!');
        return;
      }

      messagesInput.value = '';

      onMessage(messageText);
    })
  };

  joinChatBtn.addEventListener('click', () => {
    messagesInputContainer.classList.remove('hidden');
    activateMessages();
    joinChatBtn.classList.add('hidden');

    const messagesContainer = document.querySelector('.container');
    messagesContainer.classList.remove('hidden');

    onJoin();
  });
};