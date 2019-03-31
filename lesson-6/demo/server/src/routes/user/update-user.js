const User = require('../../db/schemas/user');
const bcrypt = require('bcrypt');

const updateUser = (request, response) => {
  const user = request.body;
  const id = request.params.id;

  if (user.password) {
    user.password = bcrypt.hashSync(user.password, 10);
  }

  const sendError = () => {
    response.status(400);
    response.json({
      status: 'error',
      text: 'there is no such user'
    });
  };

  const sendResponse = (newUser) => {
    if (!newUser) {
      return sendError();
    }

    response.json({
      status: 'success',
      user: newUser
    });
  };

  User
    .findOneAndUpdate(
      { _id: id },
      user,
      { new: true } // вернуть обновленный документ
    )
    .then(sendResponse)
    .catch(sendError)

};

module.exports = updateUser;