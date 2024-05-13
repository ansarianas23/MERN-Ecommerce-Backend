const express = require('express');
const { createOrder, fetchOrdersByUser, deleteOrder, updateOrder } = require('../controllers/Order');

const router = express.Router();

// /orders is already added in base path which is index.js
router
    .post('/', createOrder)
    .get('/', fetchOrdersByUser)
    .delete('/:id', deleteOrder)
    .patch('/:id', updateOrder)

exports.router = router;