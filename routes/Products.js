const express = require('express');
const { createProduct, fetchAllProducts, fetchProductById, updateProduct } = require('../controllers/Product');

const router = express.Router();

// /product is already added in base path which is index.js
router.post('/', createProduct)
    .get('/', fetchAllProducts)
    .get('/:id', fetchProductById)
    .patch('/:id', updateProduct)

exports.router = router;