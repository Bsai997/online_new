const cartrouter = require('express').Router()
const {userauth}=require('../middlewares/userauth')
const {addtocartbyid, getcartproducts,deletecartallproduct} = require('../controllers/usercart')
cartrouter.post('/addtocartbyid/:p_id',userauth,addtocartbyid)
cartrouter.get('/getcartproducts/',userauth,getcartproducts)
cartrouter.delete('/deletecartproduct/',userauth,deletecartallproduct)


module.exports={cartrouter}