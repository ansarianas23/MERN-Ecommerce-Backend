const { User } = require("../model/User");

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

// Update User Info
exports.loginUser = async(req, res)=>{
    try {
        const user = await User.findOne({email: req.body.email});

        if(!user){
            res.status(401).json({message: "User Not Found"});
        }else if(user.password === req.body.password){
            res.status(200).json({id:user.id, name:user.name, email:user.email});
        }
        else{
            res.status(401).json({message: "invalid credentials"});
        }
    } catch (err) {
        res.status(400).json(err);
    }
}