const Orders = require("../models/order.model");
const { isValidObjectId } = require("mongoose");

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { orderId, from, to, quantity, pickup, transporter ,userId } = req.body;
      const newOrder = new Orders(req.body);
      newOrder.messages.push(
        `orderid${orderId} source ${from} to ${to} total ${quantity} delivery ${pickup} by ${transporter}`
      );
      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while creating the order." });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching orders." });
    }
  },

  getOrderById: async (req, res) => {
    const orderId = req.params.id;
    if (!isValidObjectId(orderId)) {
      return res.status(400).json({ error: "Invalid order ID." });
    }

    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ error: "Order not found." });
      }
      res.status(200).json(order);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the order." });
    }
  },

  addMessageToOrder: async (req, res) => {
    const orderId = req.params.id;
    if (!isValidObjectId(orderId)) {
      return res.status(400).json({ error: "Invalid order ID." });
    }

    const { message, senderName, receiverName } = req.body;

    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ error: "Order not found." });
      }

      order.addMessage(message, senderName, receiverName);
      res.status(200).json(order);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while adding the message." });
    }
  },

  // Implement update and delete operations here if needed
};

module.exports = orderController;
