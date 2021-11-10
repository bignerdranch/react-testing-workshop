const { Router } = require('express');

const authRoutes = require('./auth');
const itemRoutes = require('./items');
const orderRoutes = require('./orders');

const routes = Router();

routes.use('/api/auth', authRoutes);
routes.use('/api/items', itemRoutes);
routes.use('/api/orders', orderRoutes);

module.exports = routes;
