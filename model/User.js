const mongoose = require('mongoose')
const {Schema } = mongoose;


const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: Buffer, required: true, unique: true},
    role: {type: String, required: true, default: 'user'},
    addresses: {type: [Schema.Types.Mixed]},
    name: {type: String},
    orders: {type: [Schema.Types.Mixed]},
    salt: Buffer
});

// this is to create virtual id and add it into document it will be id and not _id
// it database it will still be _id but virtually in frontend response from server it will be only id
const virtual = userSchema.virtual('id');

virtual.get(function(){
    return this._id
});

userSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {delete ret._id}
});


exports.User = mongoose.model('User', userSchema);