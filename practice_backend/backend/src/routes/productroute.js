const productrouter = require('express').Router()
const {addproduct,getallproducts,getproductsbycategory,getproductsbyid} = require('../controllers/productcontrol.js')
const {adminauth}=require('../middlewares/adminauth.js')
productrouter.post('/addproduct',adminauth,addproduct)
productrouter.get('/getallproducts',getallproducts)
productrouter.get('/getproductsbyid/:id',getproductsbyid,)
productrouter.get('/getproductscategory/:category',getproductsbycategory)
// productrouter.get('/getproductscategory/:category',getproductsbycategory)
module.exports={productrouter}