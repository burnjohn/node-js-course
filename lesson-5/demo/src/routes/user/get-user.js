const User = require('../../db/schemas/user');

const getUser = (request, response) => {
  const id = request.params.id;
  const sendResponse = (user) => {
    response.status(200);
    response.json(user);
  };

  User
    .find({ _id: id })
    .then(sendResponse)
    .catch(err => {
      console.error(err)
    });
};

module.exports = getUser;
