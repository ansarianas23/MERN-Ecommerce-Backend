const express = require('express');
const server = express();
require('dotenv').config();
const cors = require('cors')
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const cookieParser = require('cookie-parser')
const productRouter = require('./routes/Products')
const categoryRouter = require('./routes/Categories')
const brandsRouter = require('./routes/Brands')
const usersRouter = require('./routes/Users')
const authRouter = require('./routes/Auth')
const cartRouter = require('./routes/Cart')
const orderRouter = require('./routes/Order');
const { User } = require('./model/User');
const { isAuth, sanitizeUser, cookieExtractor } = require('./services/common');
const path = require('path');

// JWT options
const SECRET_KEY = 'SECRET_KEY'
const opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY;  // TODO: should not be in code


//middlewares

server.use(express.static('dist'));
server.use(cookieParser());
server.use(
  session({
  secret: process.env.SESSION_KEY,
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  })
);
server.use(passport.authenticate('session'));
server.use(cors({exposedheaders:['X-Total-Count']}));
server.use(express.json());     // to parse req.body that we are expecting from front end.
server.use('/products', productRouter.router);   // we can also use JWT Token for client auth only
server.use('/categories', categoryRouter.router);
server.use('/brands', brandsRouter.router);
server.use('/users',isAuth(), usersRouter.router);
server.use('/auth', authRouter.router);
server.use('/cart',isAuth(), cartRouter.router);
server.use('/orders',isAuth(), orderRouter.router);


// Passport Strategies
passport.use('local', new LocalStrategy(
  {usernameField: 'email'},
  async function(email, password, done) {
    // by default passport uses username 
    try {
      const user = await User.findOne({email: email});
      if(!user){
        return done(null, false, {message: "invalid credentials"})  // for safety
      }

      crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', async function(err, hashedPassword) {
        // it will check if given password by user is maches with hashed paswword or not
        if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
          return done(null, false, {message: "invalid credentials"});
        }

        const token = jwt.sign(sanitizeUser(user), SECRET_KEY)
        done(null, {token});   // this line sends to serializer
      })

    } catch (err) {
        done(err);
    }
  }
));

// JWT Strategies
passport.use('jwt', new JwtStrategy(opts, async function(jwt_payload, done) {

  try {
    const user = await User.findOne({id: jwt_payload.sub})
    if (user) {
        return done(null, sanitizeUser(user));  // this calls serializer
    } else {
      return done(null, false);
      // or you could create a new account
    }
  } catch (error) {
    return done(err, false); 
  }
}));

// this creates session variable req.user on being called from callback
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {id: user.id, role:user.role});
  });
});

// this changes session variable req.user when called from authorized request
passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});


// DB Connection function
main().catch(err=>console.log(err));
async function main(){
    await mongoose.connect('mongodb://localhost:27017/ecommerceDB');
    console.log("Database Connected");
}

server.listen(process.env.PORT,()=>{
    console.log("server Started");
});