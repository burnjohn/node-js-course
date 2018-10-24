const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema defines how chat messages will be stored in MongoDB
const ConversationSchema = new Schema({
  name: String,
  participants: [{ type: Schema.Types.ObjectId, ref: 'User'}],
});

const Conversation = mongoose.model('Conversation', ConversationSchema, 'conversations');

module.exports = Conversation;
