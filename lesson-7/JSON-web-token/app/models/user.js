const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  telephone: String,
  nickName: String,
  location: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
