const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  instagram: { type: String },
  status: { type: String },
  orderItems: [{
    _id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    title: { type: String, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
  }],
  shippingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    address2: { type: String },
    zip: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    taxId: { type: String },
    email: { type: String, required: true },
  },
  numberOfItems: { type: Number, required: true },
  total: { type: Number, required: true },
  isPaid: { type: Boolean, required: true, default: false },
  paidAt: { type: String },
  transactionId: { type: String },
  discountCode: { type: String },
  discountPrice: { type: Number, default: 0 },
  isShipping: { type: Boolean, default: false }
}, {
  timestamps: true,
});

const Order = mongoose.models.Order || model('Order', orderSchema);

module.exports = Order;