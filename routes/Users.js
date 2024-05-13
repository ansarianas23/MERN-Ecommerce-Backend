const express = require('express');
const { fetchUserbyId, updateUser } = require('../controllers/User');

const router = express.Router();

// /product is already added in base path which is index.js
router
    .get('/:id', fetchUserbyId)
    .patch('/:id', updateUser)

exports.router = router;