const express = require('express');
const server = express();
require('dotenv').config();
const cors = require('cors')
const mongoose = require('mongoose');
const productRouter = require('./routes/Products')
const categoryRouter = require('./routes/Categories')
const brandsRouter = require('./routes/Brands')
const usersRouter = require('./routes/Users')
const authRouter = require('./routes/Auth')
const cartRouter = require('./routes/Cart')
const orderRouter = require('./routes/Order')



//middlewares
server.use(cors(
  {
    exposedheaders:['X-Total-Count']
  }
));
server.use(express.json());     // to parse req.body that we are expecting from front end.
server.use('/products', productRouter.router);
server.use('/categories', categoryRouter.router);
server.use('/brands', brandsRouter.router);
server.use('/users', usersRouter.router);
server.use('/auth', authRouter.router);
server.use('/cart', cartRouter.router);
server.use('/orders', orderRouter.router);


// DB Connection function
main().catch(err=>console.log(err));
async function main(){
    await mongoose.connect('mongodb://localhost:27017/ecommerceDB');
    console.log("Database Connected");
}

server.listen(process.env.PORT,()=>{
    console.log("server Started");
});