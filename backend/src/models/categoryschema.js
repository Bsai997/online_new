const mongoose = require('mongoose');
 const {Schema} = mongoose
 const categoryschema = new Schema({
    name:{
      type:String,
      required:true,    
        Minlenghth:3,
        maxlength:50,
        trim:true,
        unique:true,
    },
    },{timestamps:true})
    const category = mongoose.model('category',categoryschema)
    module.exports=category