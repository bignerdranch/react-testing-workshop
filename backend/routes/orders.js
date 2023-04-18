const { Router } = require('express');
const WebSocket = require('ws');

const authMiddleware = require('../middleware/authMiddleware');
const webSocketServer = require('../webSocketServer');
const orderData = require('../data/orders');

const sendOrders = () => {
  webSocketServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(orderData.getOrders()));
    }
  });
};

webSocketServer.on('connection', (ws) => {
  ws.send(JSON.stringify(orderData.getOrders()));
});

const orderRoutes = Router();
orderRoutes.route('/')
  .post((req, res) => {
    const order = req.body;
    const result = orderData.createOrder(order);
    if (!result.success) {
      res.status(400).send(result);
    } else {
      res.status(201).send();
      sendOrders();
    }
  })
  .delete((req, res) => {
    orderData.deleteOrders();
    res.send('deleted all orders');
    sendOrders();
  })
  .get((req, res) => {
    res.json(orderData.getOrders());
  });

// Routes for a single model
orderRoutes.route('/:id')
  .get((req, res) => {
    const order = orderData.getOrders().find(({ id }) => id === req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).send('No order found');
    }
  })
  .put(authMiddleware, (req, res) => {
    if (!orderData.getOrders().some(({ id }) => id === req.params.id)) {
      res.status(404).send();
    } else {
      const editedOrder = req.body;
      const result = orderData.editOrder(req.params.id, editedOrder);
      if (!result.success) {
        res.status(400).send(result);
      } else {
        res.json(result.order);
        sendOrders();
      }
    }
  })
  .delete(authMiddleware, (req, res) => {
    if (!orderData.getOrders().some(({ id }) => id === req.params.id)) {
      res.status(404).send();
    } else {
      orderData.deleteOrder(req.params.id);
      res.json({ message: `Successfully deleted coffee order ${req.params.id}` });
      sendOrders();
    }
  });

module.exports = orderRoutes;
