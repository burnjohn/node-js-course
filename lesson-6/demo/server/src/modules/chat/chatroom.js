const createChatRoom = ({name, image}) => {
  const members = new Map();
  let chatHistory = [];

  const broadcastMessage = (message) => {
    console.log('Message got: ', message);
    members.forEach(member => {
      member.emit('message', message)
    });
  };

  const addEntry = (entry) => {
    chatHistory = chatHistory.concat(entry);
  };

  const getChatHistory = () => {
    return chatHistory.slice();
  };

  const addUser = (user) => {
    console.log('User added');
    members.set(user.id, user);
  };

  const removeUser = (user) => {
    console.log('User removed');
    members.delete(user.id);
  };

  const getChatRoomInfo = () => ({
    name,
    image,
    numMembers: members.size,
  });

  return {
    broadcastMessage,
    addEntry,
    getChatHistory,
    addUser,
    removeUser,
    getChatRoomInfo,
  };
};

module.exports = createChatRoom;
