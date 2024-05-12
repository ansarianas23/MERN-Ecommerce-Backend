const mongoose = require('mongoose')
const {Schema } = mongoose;


const productSchema = new Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    price: {type: Number, required: true, min:[0, 'wrong min product price']},
    discountPercentage: {type: Number, required: true, min:[0, 'wrong min discountPercentage'], max:[100, 'wrong max discountPercentage']},
    rating: {type: Number, required: true, min:[0, 'wrong min rating'], max:[5, 'wrong max rating'], default:0},
    stock: {type: Number, required: true, min:[0, 'wrong min stock'], default:0},
    brand: {type: String, required: true},
    category: {type: String, required: true},
    thumbnail: {type: String, required: true}, 
    images: {type: [String], required: true}, 
    deleted: {type: Boolean, default: false}, 
})

// this is to create virtual id and add it into document it will be id and not _id
// it database it will still be _id but virtually in frontend response from server it will be only id
const virtual = productSchema.virtual('id');

virtual.get(function(){
    return this._id
});

productSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {delete ret._id}
});


exports.Product = mongoose.model('Product', productSchema);