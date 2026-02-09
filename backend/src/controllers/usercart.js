const deletecartproductbyid = async (req, res) => {
    try {
        const { _id } = req.user;
        const { productid } = req.params;
        let usercart = await cart.findOne({ userId: _id });
        if (!usercart) {
            return res.status(404).send({ message: "Cart not found" });
        }
        usercart.items = usercart.items.filter(item => item.productid.toString() !== productid);
        await usercart.save();
        res.status(200).send({ message: "Product removed from cart", data: usercart });
    } catch (err) {
        res.status(400).send({ message: "error occurred", error: err.message });
    }
};

const updatecartproductquantity = async (req, res) => {
    try {
        const { _id } = req.user;
        const { productid } = req.params;
        const { quantity } = req.body;
        let usercart = await cart.findOne({ userId: _id });
        if (!usercart) {
            return res.status(404).send({ message: "Cart not found" });
        }
        let item = usercart.items.find(item => item.productid.toString() === productid);
        if (!item) {
            return res.status(404).send({ message: "Product not found in cart" });
        }
        item.quantity = quantity;
        await usercart.save();
        res.status(200).send({ message: "Product quantity updated", data: usercart });
    } catch (err) {
        res.status(400).send({ message: "error occurred", error: err.message });
    }
};

const cart = require('../models/cartschema.js')
require('dotenv').config()
const product = require('../models/productschema.js')
const addtocartbyid = async (req, res) => {
    try {
        const { p_id } = req.params
        const { _id } = req.user
        console.log('Adding to cart: p_id =', p_id, 'user _id =', _id)
        const prod = await product.findById(p_id)
        console.log('Product found:', prod ? prod.name : 'null')
        if (!prod) {
            throw new Error("Product is not found")
        }
        let usercart = await cart.findOne({ userId: _id })
        if (!usercart) {
            console.log('Creating new cart for user', _id)
            usercart = await cart.create({
                userId: _id, items: [{
                    productid: p_id,
                    price: prod.price,
                    productname: prod.name,
                    quantity: req.body.quantity
                }]
            })
        }
        else {
            console.log('Updating existing cart')
            let existingitem = usercart.items.find(item => item.productid.toString() === p_id)
            if (existingitem) {
                console.log('Increasing quantity of existing item')
                existingitem.quantity += req.body.quantity
            }
            else {
                console.log('Adding new item to cart')
                usercart.items.push({
                    productid: p_id,
                    productname: prod.name,
                    price: prod.price,
                    quantity: req.body.quantity
                })
            }
            await usercart.save()
        }
        console.log('Cart operation successful')
        res.status(201).send({
            message: "Product added to cart successfully",
            data: usercart
        })
    }
    catch (err) {
        console.error('Add to cart error:', err);
        res.status(400).send({ message: "error occured", error: err.message })
    }
}
const getcartproducts = async (req, res) => {
    try {
        const { _id } = req.user
        const result = await cart.findOne({ userId: _id })
        if (!result) {
            return res.status(404).send({ message: "Cart is empty" })
        }
        res.status(200).json({
            message: "Cart fetched successfully",
            data: result
        })
    }
    catch (err) {
        res.status(400).send({ message: "error occurred", error: err.message })
    }
}
const deletecartallproduct = async (req, res) => {
    try {
        const { _id } = req.user
        const result = await cart.deleteOne({ userId: _id })
        if (result.deletedCount == 0) {
            throw new Error("cart not found")
        }
        res.status(200).send({
            message: "Cart cleared successfully",
            data: result
        })
    }
    catch (err) {
        res.status(400).send({ message: "error occurred", error: err.message })
    }
}
module.exports = { addtocartbyid, getcartproducts, deletecartallproduct, deletecartproductbyid, updatecartproductquantity }