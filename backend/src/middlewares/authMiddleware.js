const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/userDB')

const authMiddleware = async (req,res,next) => {
    try {

        const { token } = req.cookies

        if (!token) {
            res.status(400).send("Please, Login First")
        }

        const decodeToken = await jwt.verify(token, 'finance@7011')
        const { _id } = decodeToken

        const user = await User.findOne({ _id })
        if (!user) {
            res.status(400).send("User not found")
        }

        req.user = user
        next()
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
}


module.exports = authMiddleware