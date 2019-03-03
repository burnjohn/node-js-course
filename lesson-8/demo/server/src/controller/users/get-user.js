const User = require('../../db/schemas/users');

const getUser = (request, response) => {
  const id = request.params.id;
  const sendResponse = ([user, product]) => {
    response.status(200);
    response.json(user);
  };

  const findUser = User.findById(id);
  const findProduct = Product.findById(id);

  Promise.all([findUser, findProduct])
    .then(sendResponse)
    .catch(err => {
      console.error(err)
    });
};

module.exports = getUser;
