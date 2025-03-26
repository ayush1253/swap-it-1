import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['books', 'stationery', 'academic'],
  },
  condition: {
    type: String,
    required: [true, 'Please provide a condition'],
    enum: ['new', 'like-new', 'good', 'fair'],
  },
  college: {
    type: String,
    required: [true, 'Please provide a college'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an image'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema); 