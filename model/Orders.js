const mongoose = require('mongoose')
const {Schema } = mongoose;


const orderSchema = new Schema({
    items: {type:[Schema.Types.Mixed], required:true},
    totalAmount: {type: Number},
    totalItems: {type: Number},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    // TODO: later we will ad enum type
    paymentMethod: {type: String, required:true},
    status: {type: String, default:'pending'},
    selectedAddress: {type:Schema.Types.Mixed, required:true}
});

// this is to create virtual id and add it into document it will be id and not _id
// it database it will still be _id but virtually in frontend response from server it will be only id
const virtual = orderSchema.virtual('id');

virtual.get(function(){
    return this._id
});

orderSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {delete ret._id}
});


exports.Order = mongoose.model('Order', orderSchema);