const mongoose = require('mongoose')
const {Schema } = mongoose;


const productSchema = new Schema({
    title: {type: String, required: true},
    descriptiopn: {type: String, required: true},
    price: {type: Number, required: true, min:[0, 'wrong min product price']},
    discountPercentage: {type: Number, required: true, min:[0, 'wrong min discountPercentage'], max:[100, 'wrong max discountPercentage']},
    rating: {type: Number, required: true, min:[0, 'wrong min rating'], max:[5, 'wrong max rating'], default:0},
    stock: {type: Number, required: true, min:[0, 'wrong min stock'], default:0},
    brand: {type: String, required: true},
    category: {type: String, required: true},
    thumbnail: {type: String, required: true}, 
    images: {type: [String], required: true}, 
    deleted: {type: [Boolean], default: false}, 
})

exports.Product = mongoose.model('Product', productSchema);