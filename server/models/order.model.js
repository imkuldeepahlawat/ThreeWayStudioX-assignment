const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  receiverName: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  pickup: {
    type: String,
    required: true,
  },
  transporter: {
    type: String,
    required: true,
    default: 'FedEx',
  },
  initialMessage: {
    type: String,
  },
  messages: [messageSchema], // Array of message objects
});

orderSchema.pre('save', function (next) {
  if (this.isNew && !this.initialMessage) {
    this.initialMessage = `Initial order submission: From ${this.from} to ${this.to}, Quantity: ${this.quantity}, Pickup: ${this.pickup}`;
  }
  next();
});

orderSchema.methods.addMessage = function (message, senderName, receiverName) {
  this.messages.push({
    message,
    senderName,
    receiverName,
  });
  return this.save();
};

const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;
