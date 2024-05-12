const express = require('express');
const { createProduct, fetchAllProducts } = require('../controllers/Product');

const router = express.Router();

// /product is already added in base path which is index.js
router.post('/', createProduct)
    .get('/', fetchAllProducts)

exports.router = router;