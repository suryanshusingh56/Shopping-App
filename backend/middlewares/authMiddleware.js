const jwt = require('jsonwebtoken')

const User = require('../models/User')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decode = jwt.verify(token, process.env.JWT_KEY)
            req.user=await User.findById(decode.id).select('-password')
            next()
        } catch (error) {
            if (!token) {
                res.status(401)
                throw new Error('Not Authorized,not token')
            }
            console.error(error);
            res.status(401);
            throw new Error("Not Authorized,Token failed")
         }
       
    }


})
module.exports = { protect };