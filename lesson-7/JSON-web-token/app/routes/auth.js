const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const errorResp = {
  success: false,
  message: 'Authentication failed.',
};

const passwMatches = (passw1, hash) => bcrypt.compareSync(passw1, hash);

const generateToken = paramsForTokenGeneration => {
  const secretKey = app.get('superSecret');

  return jwt.sign(paramsForTokenGeneration, secretKey, {
    expiresIn: 60 * 60 * 24
  })
};

const authenticate = (req, res) => {
  const { id: userId, password } = req.body;

  User.findById(userId, onFind);

  function onFind(err, user) {
    if (err) throw err;

    const correctPassword = passwMatches(password, user.password);

    if (!user || !correctPassword) {
      res.json(errorResp);
      return;
    }

    const payload = {
      password,
      userId
    };

    const token = generateToken(payload);

    res.json({
      success: true,
      message: 'Enjoy your token!',
      token: token,
    });

  }
};

module.exports = authenticate;