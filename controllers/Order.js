const { Cart } = require('../model/Cart');
const { Order } = require('../model/Orders');

exports.fetchOrdersByUser = async(req, res)=>{
    const {id} = req.user;
    try {
        let orders = await Order.find({user:id});
        res.status(200).json(orders);
    } catch (err) {
        res.status(400).json(err);
    }
}

exports.createOrder = async(req, res)=>{
    const order = new Order(req.body)
    try {
        const doc = await order.save();
        res.status(200).json(doc);
    } catch (err) {
        res.status(400).json(err);
    }
}

exports.deleteOrder = async(req, res)=>{
    const { id } = req.params;
    try {
        const order = await Order.findByIdAndDelete(id);
        res.status(200).json(order);
    } catch (err) {
        res.status(400).json(err);
    }
}

exports.updateOrder = async(req, res)=>{
    const { id } = req.params;
    
    try {
        const order = await Order.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json(order);
    } catch (err) {
        res.status(400).json(err);
    }
}

exports.fetchAllorders = async(req, res)=>{
    const { id } = req.params;
    let query = Order.find({deleted: {$ne: true}});
    let totalOrdersQuery = Order.find({deleted: {$ne: true}});

    if(req.query._sort && req.query._order){
        query = query.sort({[req.query._sort]: req.query._order});
    }

    // total count
    const totalDocs = await totalOrdersQuery.count().exec();

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
