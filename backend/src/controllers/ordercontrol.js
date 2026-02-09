const product = require('../models/productschema')
const order = require('../models/orderschema')


const createorderbyid = async (req, res) => {
    try {
        const {p_id} = req.params
        const { _id } = req.user
        const prod = await product.findById(p_id)
        if (!prod) {
            return res.status(404).json({ message: 'Product not found' });
        }
        let userorder = await order.findOne({ userId: _id })
        if(!userorder){
            userorder = await order.create({
                userId: _id,
                items: [{
                    productId:p_id,
                    price: prod.price,
                    productname: prod.name,
                    quantity: req.body.quantity,
                    totalPrice:prod.price*req.body.quantity,
                    deliveryTime:'2days',
                    deliveryAdress:req.body.address,
                    deliveryStatus:'pending',
                    paymentStatus:'pending'
                   
                }],

            })
        }
        else {
            userorder.items.push({
                productId: p_id,
                price: prod.price,
                productname: prod.name,
                quantity: req.body.quantity,
                totalPrice:prod.price*req.body.quantity,
                deliveryTime:'2days',
                deliveryAdress:req.body.address,
                deliveryStatus:'pending',
                paymentStatus:'pending'
            })
        
        }
        await userorder.save()
        res.status(201).json({ message: 'Order created successfully', data: userorder });
    }
    catch (err) {
        res.status(400).json({ message: 'Error creating order', error: err.message });
    }
        }
       

module.exports={createorderbyid}