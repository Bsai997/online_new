const cartrouter = require('express').Router()
const { userauth } = require('../middlewares/userauth')
const { addtocartbyid, getcartproducts, deletecartallproduct, deletecartproductbyid, updatecartproductquantity } = require('../controllers/usercart')
cartrouter.post('/addtocartbyid/:p_id', userauth, addtocartbyid)
cartrouter.get('/getcartproducts/', userauth, getcartproducts)
cartrouter.delete('/deletecartproduct/', userauth, deletecartallproduct)
cartrouter.delete('/deletecartproduct/:productid', userauth, deletecartproductbyid)
cartrouter.put('/updatecartproduct/:productid', userauth, updatecartproductquantity)
module.exports = { cartrouter }


module.exports = { cartrouter }