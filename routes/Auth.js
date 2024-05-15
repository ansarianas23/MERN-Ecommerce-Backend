const express = require('express');
const { loginUser, checkUser, createUser } = require('../controllers/Auth');
const passport = require('passport');

const router = express.Router();

// /auth is already added in base path which is index.js
router
    .post('/signup', createUser)
    .post('/login', passport.authenticate('local'), loginUser)
    .get('/check',passport.authenticate('jwt'), checkUser)

exports.router = router;