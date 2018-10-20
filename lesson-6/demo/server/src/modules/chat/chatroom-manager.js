const createChatRoom = require('./chatroom');
const chatRoomTemplates = require('./config/chatrooms');

const createChatRoomManager = () => {
  // mapping of all available chatrooms
  const chatrooms = new Map(
    chatRoomTemplates.map(c => [
      c.name,
      createChatRoom(c),
    ]),
  );

  const removeClient = (client) => {
    chatrooms.forEach(c => c.removeUser(client));
  };

  const getChatRoomByName = (chatroomName) => {
    return chatrooms.get(chatroomName);
  };

  const getAllCharRooms = () => {
    return Array.from(chatrooms.values()).map(c => c.getChatRoomInfo());
  };

  return {
    removeClient,
    getChatRoomByName,
    getAllCharRooms,
  };
};

module.exports = createChatRoomManager;
