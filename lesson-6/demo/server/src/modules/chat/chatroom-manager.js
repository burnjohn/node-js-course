const createChatRoom = require('./chatroom');
const chatRoomTemplates = require('./templates/chatrooms');

// Все доступные комнаты
const chatRooms = {};

// Создание комнат с темплейта
chatRoomTemplates.forEach(chatRoom => {
  chatRooms[chatRoom.name] = createChatRoom(chatRoom);
});

// Удалить всех пользователей из комнаты
const removeClient = (client) => {
  Object.values(chatRooms).forEach(c => c.removeUser(client));
};

// взять комнату
const getChatRoomByName = (chatroomName) => {
  return chatRooms[chatroomName];
};

// взять все комнаты
const getAllCharRooms = () => {
  return Object.values(chatRooms).map(c => c.getChatRoomInfo());
};

module.exports = {
  removeClient,
  getChatRoomByName,
  getAllCharRooms,
};
