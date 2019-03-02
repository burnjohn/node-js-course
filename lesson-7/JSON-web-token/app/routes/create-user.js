const User = require('../models/user');
const bcrypt = require('bcrypt');

const createUser = (req, res) => {
  const { firstName, lastName, telephone, nickName, location, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const nick = new User({
    firstName,
    lastName,
    telephone,
    nickName,
    location,
    email,
    password: hashedPassword
  });

  nick.save((err) => {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });

};

module.exports = createUser;