const { User } = require('../model/User');

// Fetch single user by id
exports.fetchUserbyId = async(req, res)=>{
    const {id} = req.params
    try {
        let user = await User.findById(id);
        res.status(200).json({id:user.id, name:user.name, email:user.email, addresses:user.addresses,orders:user.orders, name:user.name, role:user.role });
    } catch (err) {
        res.status(400).json(err);
    }
}

// Update User Info
exports.updateUser = async(req, res)=>{
    const { id } = req.params;
    
    try {
        const user = await User.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
}