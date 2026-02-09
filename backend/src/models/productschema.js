const mongoose = require('mongoose');
const { Schema } = mongoose
const productschema = new Schema({
    name: {
        type: String,
        required: true,
        Minlenghth: 3,
        maxlength: 50,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 10,
        max: 10000,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true,
    },
    discount: {
        type: Number,
        default: 0,

    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },

}, { timestamps: true })
const product = mongoose.model('product', productschema)
module.exports = product