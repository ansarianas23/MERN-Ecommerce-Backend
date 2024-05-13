const express = require('express');
const { createUser } = require('../controllers/User');
const { loginUser } = require('../controllers/Auth');

const router = express.Router();

// /auth is already added in base path which is index.js
router
    .post('/signup', createUser)
    .post('/login', loginUser)

exports.router = router;