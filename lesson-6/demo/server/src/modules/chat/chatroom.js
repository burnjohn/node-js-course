const createChatRoom = ({ name, image }) => {
  const members = {};
  let chatHistory = [];

  // Отправить сообщение всем юзерам в комнате
  const broadcastMessage = (message) => {
    console.log('Message got: ', message);

    const allRoomMembers = Object.values(members);

    allRoomMembers.forEach(member => {
      member.emit('message', message)
    });
  };

  // Добавить запись в историю сообщений комнаты
  const addEntry = (entry) => {
    chatHistory = chatHistory.concat(entry);
  };

  // Получить историю сообщений комнаты
  const getChatHistory = () => {
    return chatHistory.slice();
  };

  // Добавляем пользователя в комнату
  const addUser = (user) => {
    console.log('User added');
    members[user.id] =  user;
  };

  // Удаляем пользователя из комнаты
  const removeUser = (user) => {
    console.log('User removed');

    delete members[user.id];
  };

  // Получить информацию по комнате
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
