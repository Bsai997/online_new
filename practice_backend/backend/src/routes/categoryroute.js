const categoryroute = require('express').Router()
const {addcategory,getallcategories,deletecategory} = require('../controllers/category.js')
const {adminauth}=require('../middlewares/adminauth.js')
categoryroute.post('/addcategory',adminauth,addcategory)
categoryroute.get('/getallcategories',getallcategories)
categoryroute.delete('/deletecategory/',adminauth,deletecategory)
// categoryroute.put('/updatecategory/:id',updatecategory)
module.exports={categoryroute}