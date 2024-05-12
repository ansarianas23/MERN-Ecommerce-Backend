const express = require('express');
const server = express();
const mongoose = require('mongoose');
const { createProduct } = require('./controllers/Product');
const productRouter = require('./routes/Products')

//middlewares
server.use(express.json());     // to parse req.body that we are expecting from front end.
server.use('/products', productRouter.router);

main().catch(err=>console.log(err));
async function main(){
    await mongoose.connect('mongodb://localhost:27017/ecommerceDB');
    console.log("Database Connected");
}


server.get('/', (req, res)=> {
  res.send('Hello World');
});

server.post('/products', createProduct);

server.listen(8080,()=>{
    console.log("server Started");
});