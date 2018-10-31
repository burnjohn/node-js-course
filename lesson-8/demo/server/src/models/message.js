const mongoose = require('mongoose');
const setTimestamp = require('./middleware/timestamp');

const { Schema } = mongoose;

const MessageSchema = new Schema({
  conversation: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Conversation',
  },
  message: {
    type: Schema.Types.String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

MessageSchema.plugin(setTimestamp);

const Message = mongoose.model('Message', MessageSchema, 'messages');

module.exports = Message;
