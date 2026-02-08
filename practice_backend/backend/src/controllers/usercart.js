const cart = require('../models/cartschema.js')
require('dotenv').config()
const product = require('../models/productschema.js')
const addtocartbyid = async (req, res) => {
    try {
        const {p_id} = req.params
        const { _id } = req.user
        const prod = await product.findById(p_id)
        if (!prod) {
            throw new Error("Product is not found")
        }
        let usercart = await cart.findOne({ userId: _id })
        if (!usercart) {
           usercart= await cart.create({
                userId: _id, items: [{
                    productid: p_id,
                    price: prod.price,
                    productname: prod.name,
                    quantity: req.body.quantity
                }]
            })
        }
        else {
            let existingitem = usercart.items.find(item => item.productid.toString() === p_id)
            if (existingitem) {
                existingitem.quantity += req.body.quantity
            }
            else {
                usercart.items.push({
                    productid: p_id,
                    productname: prod.name,
                    price: prod.price,
                    quantity: req.body.quantity
                })
            }
            await usercart.save()
        }
        res.status(201).send({
            message: "Product added to cart successfully",
            data: usercart
        })
    }
    catch (err) {
        res.status(400).send({ message: "error occured", error: err.message })
    }
}
const getcartproducts = async(req,res)=>{
    try{
        const{_id}=req.user
        const result = await cart.findOne({userId:_id})
        if(!result){
            return res.status(404).send({message: "Cart is empty"})
        }
        res.status(200).json({
            message: "Cart fetched successfully",
            data: result
        })
    }
    catch(err){
        res.status(400).send({message: "error occurred", error: err.message})
    }
}
const deletecartallproduct = async(req,res)=>{
    try{
        const {_id}=req.user
        const result = await cart.deleteOne({userId:_id})
        if(result.deletedCount==0){
            throw new Error("cart not found")
        }
        res.status(200).send({
            message: "Cart cleared successfully",
            data: result
        })
    }
    catch(err){
        res.status(400).send({message: "error occurred", error: err.message})
    }
}
module.exports = { addtocartbyid,getcartproducts,deletecartallproduct}