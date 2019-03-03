const makeHandleEvent = (client, clientManager, chatRoomManager) => {
  // проверка на то выбрали ли мы пользователя
  const ensureUserSelected = (clientId) => {
    const user = clientManager.getUserByClientId(clientId);

    if (!user) {
      console.log('select users first');
      return false;
    }

    return user;
  };

  // проверка на то существует ли комната (чат рум)
  const ensureValidChatRoom = (chatRoomName) => {
    const chatRoom = chatRoomManager.getChatRoomByName(chatRoomName);

    if (!chatRoom) {
      console.log(`invalid chatRoom name: ${chatRoomName}`);
      return false;
    }

    return chatRoom;
  };

  // сама проверка на чат рум и юзера
  const ensureValidChatRoomAndUserSelected = (chatRoomName) =>
    new Promise((resolve, reject) => {
        const chatRoom = ensureValidChatRoom(chatRoomName);
        const user = ensureUserSelected(client.id);

        if (chatRoom && user) {
          resolve({chatRoom, user});
        }

        reject();
    });

  // функция обработки событий со всеми проверками
  const handleEvent = (chatRoomName, createEntry) => (
    // проверяем правильный ли чат рум и юзер передан с клиента
    ensureValidChatRoomAndUserSelected(chatRoomName)
      .then(({ chatRoom, user }) => {

        // Создание самой записи сообщения для чат румы
        const message = Object.assign({ user }, createEntry());

        // Добавление записи в историю сообщений чат румы
        chatRoom.addEntry(message);

        const messageWithChat = Object.assign({chat: chatRoomName}, message );

        // отсылаем сообщение всем остальным участникам чат рума
        chatRoom.broadcastMessage(messageWithChat);

        return chatRoom;
      })
  );

  return handleEvent;
};

const getChatHandlers = (client, clientManager, chatRoomManager) => {
  // создаем обертку для функции чтобы проверить есть ли все данные для обработки
  const handleEvent = makeHandleEvent(client, clientManager, chatRoomManager);

  // обработчик на регистрацию клиента (устройства что подключилось к чату)
  const handleRegister = (userName, respondToClient) => {
    if (!clientManager.isUserAvailable(userName)) {
      return respondToClient('users is not available');
    }

    const user = clientManager.getUserByName(userName);

    clientManager.registerClient(client, user);

    return respondToClient(null, user);
  };

  // обработчик на добавления юзера в чат рум (но добавляем мы устройство-клиент, а не юзера)
  const handleJoin = (chatRoomName, respondToClient) => {
    // Создаем функцию что возвращает сообщение для чата, позже она будет передана в чат руму
    const createEntry = () => ({event: `joined ${chatRoomName}`});

    handleEvent(chatRoomName, createEntry).then(function(chatRoom) {
      // добавление юзера в чат рум
      chatRoom.addUser(client);

      // отсылаем историю другим участникам чата
      respondToClient(null, chatRoom.getChatHistory());
    }).catch(respondToClient);
  };

  // обработчик на удаление юзера в чат рум
  const handleLeave = (chatRoomName, respondToClient) => {
    // Создаем функцию что возвращает сообщение для чата, позже она будет передана в чат руму
    const createEntry = () => ({event: `left ${chatRoomName}`});

    handleEvent(chatRoomName, createEntry)
      .then(function(chatRoom) {
        // удаляем юзера с чат комнаты
        chatRoom.removeUser(client.id);

        respondToClient(null);
      })
      .catch(respondToClient);
  };

  // обработчик на сообщение в чат комнате
  const handleMessage = ({chatRoomName, message} = {}, respondToClient) => {
    // Создаем функцию что возвращает сообщение для чата, позже она будет передана в чат руму
    const createEntry = () => ({message});

    handleEvent(chatRoomName, createEntry)
      .then(() => respondToClient(null))
      .catch(respondToClient);
  };

  // обработчик для получения списка всех доступных чат комнат
  const handleGetChatRooms = (respondToClient) => {
    return respondToClient(null, chatRoomManager.getAllCharRooms());
  };

  // обработчик для получения списка всех доступных юзеров
  const handleGetAvailableUsers = (respondToClient) => {
    return respondToClient(null, clientManager.getAvailableUsers());
  };

  const handleDisconnect = () => {
    // remove users profile
    clientManager.removeClient(client);
    // remove member from all chatRooms
    chatRoomManager.removeClient(client);
  };

  return {
    handleRegister,
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetChatRooms,
    handleGetAvailableUsers,
    handleDisconnect,
  };
};

module.exports = getChatHandlers;
