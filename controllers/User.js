const { User } = require('../model/User');

// Fetch single user by id
exports.fetchUserbyId = async(req, res)=>{
    const {id} = req.params
    try {
        let user = await User.findById(id);
        res.status(200).json({id:user.id, name:user.name, email:user.email});
    } catch (err) {
        res.status(400).json(err);
    }
}

// Create New User
exports.createUser = async(req, res)=>{
    const user = new User(req.body);
    try {
        const doc = await user.save();
        res.status(200).json(doc);
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