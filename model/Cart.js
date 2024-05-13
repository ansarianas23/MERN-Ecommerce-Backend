const mongoose = require('mongoose')
const {Schema } = mongoose;


const cartSchema = new Schema({
    quantity: {type: Number, required: true}, 
    product: {type: Schema.Types.ObjectId, ref:'Product' , required: true}, 
    user: {type: Schema.Types.ObjectId, ref:'User' , required: true}, 
    itemUrl: {type: String} 
});

// this is to create virtual id and add it into document it will be id and not _id
// it database it will still be _id but virtually in frontend response from server it will be only id
const virtual = cartSchema.virtual('id');

virtual.get(function(){
    return this._id
});

cartSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {delete ret._id}
});


exports.Cart = mongoose.model('Cart', cartSchema);