const express = require('express');
const { createOrder, fetchOrdersByUser, deleteOrder, updateOrder, fetchAllorders } = require('../controllers/Order');

const router = express.Router();

// /orders is already added in base path which is index.js
router
    .post('/', createOrder)
    .get('/own/', fetchOrdersByUser)
    .delete('/:id', deleteOrder)
    .patch('/:id', updateOrder)
    .get('/', fetchAllorders)

exports.router = router;