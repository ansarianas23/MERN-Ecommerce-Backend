const { Cart } = require('../model/Cart');
const { Order } = require('../model/Orders');

exports.fetchOrdersByUser = async(req, res)=>{
    const userId = req.query.user;
    try {
        let orders = await Order.find({user:userId});
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
