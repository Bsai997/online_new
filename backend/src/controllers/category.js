
const category = require('../models/categoryschema')
const addcategory = async(req,res)=>{
    try{
        const {name}=req.body
        const cat = await category.create({name})
        res.status(201).send({message:"category added successfully",data:cat})
    }catch(err){
        res.status(400).send({message:"error occured",error:err.message})
    }
}
const getallcategories = async(req,res)=>{
    try{
        const categories = await category.find()
        res.status(200).send({message:"categories fetched successfully",data:categories})
    }catch(err){
        res.status(400).send({message:"error occure",error:err.message})
    }
}
const deletecategory = async(req,res)=>{
   try{
     const {name}=req.body
    const {delete1}=await category.deleteOne({name:name})
    res.send("category is deleted "+delete1)
   }
   catch(Err){
    res.send("error occured"+Err.message)
   }
}
module.exports={addcategory,getallcategories,deletecategory}