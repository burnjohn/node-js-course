const messageBox = document.querySelector('.message__box');
const messageContainer = document.querySelector('.message__box-container');

const getMessageHTML = ({ author, message, createdAt }, userId) => {
  const myMessage = author === userId;
  const dateObj = new Date(createdAt);
  const dateString = `${ dateObj.getHours() }:${ dateObj.getMinutes() }:${ dateObj.getSeconds() }`;

  return (
    `<div class="message-item ${ myMessage ? 'message-item_my' : '' }">
          <p class="message-item__author">${ dateString }</p>
          <p class="message-item__text">${ message }</p>
      </div>`
  );
};

const scrollToContainerBottom = (node) => {
  node.scrollTo(0, messageBox.offsetHeight);
};

export const renderMessage = (messageObj, userId) => {
  const messageHTML = getMessageHTML(messageObj, userId);
  messageBox.insertAdjacentHTML('beforeend', messageHTML);

  scrollToContainerBottom(messageContainer);
};