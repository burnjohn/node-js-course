const CreateUser = require('../models/user');
const bcrypt = require('bcrypt');

const createUser = (req, res) => {
  const hashedPassword =  bcrypt.hashSync('password', 10);

  const nick = new CreateUser({
    name: 'Nick Cerminara',
    password: hashedPassword,
    admin: true
  });

  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });

};

module.exports = createUser;