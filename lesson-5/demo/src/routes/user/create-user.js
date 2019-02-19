const User = require('../../modules/db/schemas/user');
const bcrypt = require('bcrypt');

const createUser = (request, response) => {
  const user = request.body;

  const hashedPassword =  bcrypt.hashSync(user.password, 10);
  const userData = { ...user, password: hashedPassword };

  const newUser = new User(userData);

  const sendResponse = (user) => {
    console.log(user);

    response.json({
      status: 'success',
      user
    });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: 'user was not saved'
    });
  };

  newUser.save()
    .then(sendResponse)
    .catch(sendError)

};

module.exports = createUser;