const mongoose = require('mongoose');
const { Schema } = mongoose
const cartschema = new Schema({
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      unique: true,
   },
   items: [
      {
         productid: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: true,
         },
         quantity: {
            type: Number,
            default: 1
         },
         productname: {
            type: String,

         },
         price: {
            type: Number,
            default: 0
         },

      }
   ]
}
   , { timestamps: true }
)
const cart = mongoose.model('cart', cartschema)
module.exports = cart;