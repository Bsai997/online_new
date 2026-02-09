const mongoose = require('mongoose')
const {Schema} = mongoose;
const orderschema = new Schema({
    userId:
    {type:Schema.Types.ObjectId,
    ref:'user',
    required:true,
    unique:true
},
    items:[
        {
        productId:{
       type: Schema.Types.ObjectId,
       ref:'product',
       required:true
    },
    productname:String,
    quantity:Number,
    price:Number,
    totalPrice:Number,
    deliveryTime:String,
    deliveryAdress:String,
    deliveryStatus:String,
    paymentStatus:String,
}
    ],
   

    
},{timestamps:true})
let order = mongoose.model('order',orderschema)
module.exports=order