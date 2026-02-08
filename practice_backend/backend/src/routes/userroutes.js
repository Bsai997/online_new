const express = require('express')
const userrouter = express.Router()
const {registerUser,loginUser,logoutUser, getprofile,adminregister} = require('../controllers/usercontrol.js')
const {validateInput} = require('../utils/validator.js')
const {userauth} = require('../middlewares/userauth.js')
const {adminauth} = require('../middlewares/adminauth.js')
userrouter.post('/register',validateInput,registerUser)
userrouter.post('/login',validateInput,loginUser)
userrouter.post('/logout',logoutUser)
userrouter.get('/getprofile',userauth,getprofile)
userrouter.post('/adminregister',validateInput,adminauth,adminregister)

module.exports=userrouter