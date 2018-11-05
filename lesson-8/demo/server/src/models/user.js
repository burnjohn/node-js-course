const mongoose = require('mongoose');
const setTimestamp = require('./middleware/timestamp');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: Schema.Types.String,
  lastName: Schema.Types.String,
  telephone: Schema.Types.String,
  nickName: Schema.Types.String,
  location: Schema.Types.String,
  password: Schema.Types.String,
  email: Schema.Types.String,
  conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation'}]
});

userSchema.plugin(setTimestamp);

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;