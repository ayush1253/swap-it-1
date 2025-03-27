import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

const chatSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  participant1Id: {
    type: String,
    required: true,
  },
  participant2Id: {
    type: String,
    required: true,
  },
  messages: [messageSchema],
  lastMessage: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
chatSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Create a compound index for unique chats between participants for a product
chatSchema.index({ productId: 1, participant1Id: 1, participant2Id: 1 }, { unique: true });

const Chat = mongoose.models.Chat || mongoose.model('Chat', chatSchema);

export default Chat; 