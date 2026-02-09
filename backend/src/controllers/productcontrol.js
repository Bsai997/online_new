const category = require('../models/categoryschema.js')
const product = require('../models/productschema.js')

const addproduct = async(req,res)=>{
    try{
        const {name,price,category,stock}=req.body
        const prod = await product.create({name,price,category,stock})
        res.status(201).send({message:"product added successfully",data:prod})
    }catch(err){
        res.status(400).send({message:"error occured",error:err.message})
    }
}
const getallproducts = async(req,res)=>{
    try{
        const products = await product.find()   
        res.status(200).send({message:"products fetched successfully",data:products})
    }catch(err){
        res.status(400).send({message:"error occured",error:err.message})
    }
}
const getproductsbycategory = async(req,res)=>{
    try{
        const categoryab = await category.findOne({name:req.params.category})
       if(!categoryab){
        throw new Error("category not found")
       }
        const categoryProducts = await product.find({category:categoryab._id})
        res.status(200).send({message:"products fetched successfully",data:categoryProducts})
    }
    catch(err){
        res.status(400).send({message:"error occured",error:err.message})
    }   
}
const getproductsbyid = async(req,res)=>{
    try{
        const {id} = req.params
        const prod = await product.findById(id)  
        const {_id} = prod
        console.log(_id)
        res.status(200).send({message:"product fetched successfully",data:prod})
    }catch(err){
        res.status(400).send({message:"error occured",error:err.message})
    }
}
module.exports={addproduct,getallproducts,getproductsbycategory,getproductsbyid}