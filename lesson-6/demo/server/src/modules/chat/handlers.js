const makeHandleEvent = (client, clientManager, chatRoomManager) => {
  // промисифай функция
  const ensureExists = (getter, rejectionMessage) => {
    return new Promise(function(resolve, reject) {
      const res = getter();
      return res
        ? resolve(res)
        : reject(rejectionMessage);
    });
  };

  // проверка на то существует ли пользователь
  const ensureUserSelected = (clientId) => {
    return ensureExists(
      () => clientManager.getUserByClientId(clientId),
      'select user first',
    );
  };

  // проверка на то существует ли комната (чат рум)
  const ensureValidChatRoom = (chatRoomName) => {
    return ensureExists(
      () => chatRoomManager.getChatRoomByName(chatRoomName),
      `invalid chatRoom name: ${chatRoomName}`,
    );
  };

  // сама проверка на чат рум и юзера
  const ensureValidChatRoomAndUserSelected = (chatRoomName) => {
    return Promise.all([
      ensureValidChatRoom(chatRoomName),
      ensureUserSelected(client.id),
    ]).then(([chatRoom, user]) => Promise.resolve({chatRoom, user}));
  };

  // функция обработки событий со всеми проверками
  const handleEvent = (chatRoomName, createEntry) => (
    // проверяем правильный ли чат рум и юзер передан с клиента
    ensureValidChatRoomAndUserSelected(chatRoomName)
      .then(({ chatRoom, user }) => {

        // Создание самой записи сообщения для чат румы
        const entry = Object.assign({ user }, createEntry());

        // Добавление записи в историю сообщений чат румы
        chatRoom.addEntry(entry);

        // отсылаем сообщение всем остальным участникам чат рума
        chatRoom.broadcastMessage(Object.assign({chat: chatRoomName}, entry));
        return chatRoom;
      })
  );

  return handleEvent;
};

const getChatHandlers = (client, clientManager, chatRoomManager) => {
  // создаем обертку для функции чтобы проверить есть ли все данные для обработки
  const handleEvent = makeHandleEvent(client, clientManager, chatRoomManager);

  // обработчик на регистрацию клиента (устройства что подключилось к чату)
  const handleRegister = (userName, callback) => {
    if (!clientManager.isUserAvailable(userName))
      return callback('user is not available');

    const user = clientManager.getUserByName(userName);

    clientManager.registerClient(client, user);

    return callback(null, user);
  };

  // обработчик на добавления юзера в чат рум (но добавляем мы устройство-клиент, а не юзера)
  const handleJoin = (chatRoomName, callback) => {
    // Создаем функцию что возвращает сообщение для чата, позже она будет передана в чат руму
    const createEntry = () => ({event: `joined ${chatRoomName}`});

    handleEvent(chatRoomName, createEntry).then(function(chatRoom) {
      // добавление юзера в чат рум
      chatRoom.addUser(client);

      // отсылаем историю другим участникам чата
      callback(null, chatRoom.getChatHistory());
    }).catch(callback);
  };

  // обработчик на удаление юзера в чат рум
  const handleLeave = (chatRoomName, callback) => {
    // Создаем функцию что возвращает сообщение для чата, позже она будет передана в чат руму
    const createEntry = () => ({event: `left ${chatRoomName}`});

    handleEvent(chatRoomName, createEntry)
      .then(function(chatRoom) {
        // удаляем юзера с чат комнаты
        chatRoom.removeUser(client.id);

        callback(null);
      })
      .catch(callback);
  };

  // обработчик на сообщение в чат комнате
  const handleMessage = ({chatRoomName, message} = {}, callback) => {
    // Создаем функцию что возвращает сообщение для чата, позже она будет передана в чат руму
    const createEntry = () => ({message});

    handleEvent(chatRoomName, createEntry)
      .then(() => callback(null))
      .catch(callback);
  };

  // обработчик для получения списка всех доступных чат комнат
  const handleGetChatRooms = (callback) => {
    return callback(null, chatRoomManager.getAllCharRooms());
  };

  // обработчик для получения списка всех доступных юзеров
  const handleGetAvailableUsers = (callback) => {
    return callback(null, clientManager.getAvailableUsers());
  };

  const handleDisconnect = () => {
    // remove user profile
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
