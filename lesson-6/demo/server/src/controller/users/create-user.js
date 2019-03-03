const domain = require('../../domain');

const createUser = (request, response) => {
  const user = request.body;

  const sendResponse = (user) => {


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

  domain.userAPI.createUser(user)
    .then(sendResponse)
    .catch(sendError)

};

module.exports = createUser;