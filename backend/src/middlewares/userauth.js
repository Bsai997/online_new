
const user = require('../models/userschema.js')
const jwt = require('jsonwebtoken');
const userauth = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            throw new Error("token not found")
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET)
        if (!payload) {
            throw new Error("invalid token")
        }
        const { _id } = payload
        if (!_id) {
            throw new Error("invalid payload")
        }
        const userdata = await user.findById(_id).select('-password')
        if (!userdata) {
            throw new Error("user not found")
        }
        req.user = userdata

        next()
    } catch (err) {
        if (err.message === 'jwt expired') {
            return res.status(401).send({ message: "token expired" })
        }
        res.status(401).send({ message: "invalid token" })
    }
}
module.exports = { userauth }