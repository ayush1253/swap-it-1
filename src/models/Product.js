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
    enum: ['books', 'stationery', 'academic', 'electronics', 'clothing', 'other'],
  },
  condition: {
    type: String,
    required: [true, 'Please provide a condition'],
    enum: ['new', 'like-new', 'good', 'fair', 'poor'],
  },
  college: {
    type: String,
    required: [true, 'Please provide a college'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an image'],
  },
  userId: {
    type: String,
    required: [true, 'User ID is required'],
  },
  status: {
    type: String,
    enum: ['active', 'sold', 'archived'],
    default: 'active',
  },
  views: {
    type: Number,
    default: 0,
  },
  favorites: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
  },
  contact: {
    type: String,
    required: [true, 'Please provide contact information'],
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
ProductSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema); 