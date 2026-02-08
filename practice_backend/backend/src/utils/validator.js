const validator = require('validator')
function validateInput(req,res,next ){
      try{
            if(!validator.isEmail(req.body.email)){
                throw new Error("Invalid email")
            }
           
            if(!validator.isStrongPassword(req.body.password)){
                throw new Error("Password is not strong enough")
            }
            else{
                next()  
            }   
        }catch(err){
            return res.status(400).send({message:"Validation error",error:err.message})
        }}

module.exports={validateInput}


