const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  conversationId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Conversation',
  },
  message: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Message = mongoose.model('Message', MessageSchema, 'messages');

module.exports = Message;
