const { Product } = require("../model/Product")

exports.createProduct = async(req, res)=>{
    // this product we have to get from API Body
    const product = new Product(req.product);
    try {
        const doc = await product.save()
        res.status(201).json(doc);
    } catch (error) {
        res.status(400).json(doc);
    }
}