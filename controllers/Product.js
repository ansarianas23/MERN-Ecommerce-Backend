const { Product } = require("../model/Product")

exports.createProduct = async(req, res)=>{
    // this product we have to get from API Body
    const product = new Product(req.body);
    try {
        const doc = await product.save();
        res.status(201).json(doc);
    } catch (error) {
        res.status(400).json(doc);
    }
}

exports.fetchAllProducts = async(req, res)=>{
    // this product we have to get from API Body
    // here we need all query string
    // will get all product from DB
    let query = Product.find({});
    let totalProductsQuery = Product.find({});
    
    // will get category query products from DB
    if(req.query.category){
        query = query.find({"category": req.query.category})
        totalProductsQuery = totalProductsQuery.find({"category": req.query.category})
    }
    
    // will get brand query products from DB
    if(req.query.brand){
        query = query.find({"brand": req.query.brand})
        totalProductsQuery = totalProductsQuery.find({"brand": req.query.band})
    }
    
    // will get sort query products from DB
    if(req.query._sort && req.query._order){
        query = query.sort({[req.query._sort]: req.query._order})
    }
    
    // total count
    const totalDocs = await totalProductsQuery.count().exec();

    // will get paginated products from DB
    if(req.query._page && req.query._limit){
        const itemsPerPage = req.query._limit
        const pageNo = req.query._page
        query = query.skip(itemsPerPage*(pageNo-1)).limit(itemsPerPage);
    }

    try {
        const docs = await query.exec();
        res.set('X-total-Count', totalDocs);
        res.status(200).json(docs);
    } catch (err) {
        res.status(400).json(err);
    }
}