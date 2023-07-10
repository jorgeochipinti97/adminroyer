const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  description: { type: String, required: true, default: '' },
  personalization: { type: String },
  images: [{ type: String }],
  inStock: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true, default: 0 },
  slug: { type: String, required: true, unique: true },
  tags: [{ type: String }],
  title: { type: String, required: true, default: '' },
  type: {
    type: String,
  },
  talles: [{
    size: { type: String },
    stock: { type: Number }
  }],
  gender: {
    type: String,
  },
  popular: {
    type: Boolean,
    default: false,
  },
  relacionados: {
    title: { type: String, required: true },
    description:{ type: String, required: true },
    images: { type: String, required: true },
    price: { type: Number, required: true },
  }
}, {
  timestamps: true
});

productSchema.index({ title: 'text', tags: 'text' });

const Product = mongoose.models.Product || model('Product', productSchema);

module.exports = Product;