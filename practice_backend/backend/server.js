const express = require('express')
const app = express()
const cookieparser = require('cookie-parser')
const main = require('./src/config/db.js')
const userrouter = require('./src/routes/userroutes.js')
const {productrouter} = require('./src/routes/productroute.js')
const {categoryroute} = require('./src/routes/categoryroute.js')
const {cartrouter} = require('./src/routes/cartrouter.js')
const orderroute=require('./src/routes/orderroute.js')
const cors=require('cors')
// CORS configuration for frontend connection
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())
app.use(cookieparser());
app.use('/user',userrouter)
app.use('/product',productrouter)
app.use('/category',categoryroute)  
app.use('/cart',cartrouter)  
app.use('/order',orderroute)  
main()
.then(()=>{
    console.log("Db is connected")
    app.listen(4000,()=>{
    console.log("listening at port 4000")
})
})
.catch((Err)=>{
    console.log("error occured"+err)
})