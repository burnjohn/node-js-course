const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  telephone: String,
  nickName: String,
  location: String,
  password: String,
  email: String,
  conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation'}]
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;