const User = require('../models/user');

const findUser = (req, res) => {
  User.find({}, function(err, users) {
    res.json(users);
  });
};

module.exports = findUser;
