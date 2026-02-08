 const mongoose = require('mongoose');
// const { trim } = require('validator');
 const {Schema} = mongoose
 const userschema = new Schema({
    email:{
      type:String,
      unique:true,
      minLength:5,
      maxLength:20,
      lowercase:true,
      required:true,
      trim:true,
    },
    password:{
      type:String,
      required:true
    },
    phone:{
      type:String,
      required:true,
      minlength:10,
      maxlength:15,
      unique:true,
      trim:true,
    },
    name:{
      type:String,
      trim:true,
    },
    role:{
      type:String,
      enum:['user','admin'],
      default:'user',
      trim:true,
    },
    address:{
      type:String,
      trim:true,
    }
  },{timestamps:true})
  const user = mongoose.model('user',userschema)
 module.exports=user