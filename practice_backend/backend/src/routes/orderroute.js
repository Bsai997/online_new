const orderroute = require('express').Router()
const {createorderbyid} = require('../controllers/ordercontrol')
const {userauth} = require('../middlewares/userauth')
orderroute.post('/createorderbyid/:p_id',userauth,createorderbyid)
module.exports=orderroute