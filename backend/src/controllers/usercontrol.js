const user = require('../models/userschema.js')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const registerUser = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const userdata = await user.create(req.body)
        res.status(201).send({ message: "user registered successfully", data: userdata })
    }
    catch (err) {
        res.status(400).send({ message: "error occured", error: err.message })
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const userdata = await user.findOne({ email })
        if (!userdata) {
            throw new Error("invalid credentials")
        }
        console.log(userdata)
        const isPasswordMatch = await bcrypt.compare(password, userdata.password)
        console.log(isPasswordMatch)
        if (!isPasswordMatch) {
            throw new Error("invalid credentials")
        }
        const secret = process.env.JWT_SECRET
        console.log(secret)
        const token = jwt.sign({ _id: userdata._id, role: userdata.role, email: userdata.email }, secret, { expiresIn: 180 })
        res.cookie('token', token)
        res.status(200).send({ message: "login successful", data: userdata })
    }
    catch (err) {
        res.status(400).send({ message: "error occured", error: err.message })
    }
}
const logoutUser = async (req, res) => {
    try {
        const token = req.cookies.token
        res.clearCookie('token', token)
        res.status(200).send({ message: "logout successful", 'token': token })
    } catch (err) {
        res.status(400).send({ message: "error occured", error: err.message })
    }
}
const getprofile = async (req, res) => {
    try {
        res.status(200).send({ message: "user profile fetched successfully", data: req.user })
    } catch (err) {
        res.status(400).send({ message: "error occured", error: err.message })
    }
}
const adminregister = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 11)
        const admin = await user.create(req.body)
        res.status(200).send({ message: "admin registered succesfully", data: admin })
    }
    catch (err) {
        res.send("Err" + err.message)
    }
}
module.exports = { registerUser, loginUser, logoutUser, getprofile, adminregister }