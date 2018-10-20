const makeHandleEvent = (client, clientManager, chatRoomManager) => {

  const ensureExists = (getter, rejectionMessage) => {
    return new Promise(function(resolve, reject) {
      const res = getter();
      return res
        ? resolve(res)
        : reject(rejectionMessage);
    });
  };

  const ensureUserSelected = (clientId) => {
    return ensureExists(
      () => clientManager.getUserByClientId(clientId),
      'select user first',
    );
  };

  const ensureValidChatRoom = (chatRoomName) => {
    return ensureExists(
      () => chatRoomManager.getChatRoomByName(chatRoomName),
      `invalid chatRoom name: ${chatRoomName}`,
    );
  };

  const ensureValidChatRoomAndUserSelected = (chatRoomName) => {
    return Promise.all([
      ensureValidChatRoom(chatRoomName),
      ensureUserSelected(client.id),
    ]).then(([chatRoom, user]) => Promise.resolve({chatRoom, user}));
  };

  const handleEvent = (chatRoomName, createEntry) => {
    return ensureValidChatRoomAndUserSelected(chatRoomName)
      .then(({ chatRoom, user }) => {
        // append event to chat history
        const entry = Object.assign({ user }, createEntry());
        chatRoom.addEntry(entry);

        // notify other clients in chatRoom
        chatRoom.broadcastMessage(Object.assign({chat: chatRoomName}, entry));
        return chatRoom;
      });
  };

  return handleEvent;
};

module.exports = function(client, clientManager, chatRoomManager) {

  const handleEvent = makeHandleEvent(client, clientManager, chatRoomManager);

  const handleRegister = (userName, callback) => {
    if (!clientManager.isUserAvailable(userName))
      return callback('user is not available');

    const user = clientManager.getUserByName(userName);

    clientManager.registerClient(client, user);

    return callback(null, user);
  };

  const handleJoin = (chatRoomName, callback) => {
    const createEntry = () => ({event: `joined ${chatRoomName}`});

    handleEvent(chatRoomName, createEntry).then(function(chatRoom) {
      // add member to chatRoom
      chatRoom.addUser(client);

      // send chat history to client
      callback(null, chatRoom.getChatHistory());
    }).catch(callback);
  };

  const handleLeave = (chatRoomName, callback) => {
    const createEntry = () => ({event: `left ${chatRoomName}`});

    handleEvent(chatRoomName, createEntry).then(function(chatRoom) {
      // remove member from chatRoom
      chatRoom.removeUser(client.id);

      callback(null);
    }).catch(callback);
  };

  const handleMessage = ({chatRoomName, message} = {}, callback) => {
    const createEntry = () => ({message});

    handleEvent(chatRoomName, createEntry).
      then(() => callback(null)).
      catch(callback);
  };

  const handleGetChatRooms = (_, callback) => {
    return callback(null, chatRoomManager.getAllCharRooms());
  };

  const handleGetAvailableUsers = (_, callback) => {
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
