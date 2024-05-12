const mongoose = require('mongoose')
const {Schema } = mongoose;


const BrandSchema = new Schema({
    value: {type: String, required: true, unique: true},
    label: {type: String, required: true, unique: true} 
})

// this is to create virtual id and add it into document it will be id and not _id
// it database it will still be _id but virtually in frontend response from server it will be only id
const virtual = BrandSchema.virtual('id');

virtual.get(function(){
    return this._id
});

BrandSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {delete ret._id}
});


exports.Brand = mongoose.model('Brand', BrandSchema);