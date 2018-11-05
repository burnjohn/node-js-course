const mongoose = require('mongoose');
const setTimestamp = require('./middleware/timestamp');
const { Schema } = mongoose;

// Schema defines how chat messages will be stored in MongoDB
const ConversationSchema = new Schema({
  name: Schema.Types.String,
  participants: [{ type: Schema.Types.ObjectId, ref: 'User'}],
});

ConversationSchema.plugin(setTimestamp);

const Conversation = mongoose.model('Conversation', ConversationSchema, 'conversations');

module.exports = Conversation;
