const app=require('express')
const express = require('express')
const userAuth = express.Router()

const bcrypt = require('bcrypt')
const User = require('../models/userDB')


userAuth.post("/signup",async(req,res)=>{
    try{
        const {emailId,password,confirmpassword} = req.body
        // console.log(req.body)

        if(password===confirmpassword){
            const passwordHash = await bcrypt.hash(password,10)
            const user = new User({
                emailId,
                password:passwordHash
            })
            await user.save()
            res.send(user)
        }
        else{
            throw new Error("Password does not match your current password")
        }
    }
    catch(err){
        // res.status(400).send('Error in saving the user' + err.message)
        res.send(err.message)
    }
})


userAuth.post('/login', async(req,res)=>{
    try{
        const {emailId,password} = req.body
        const user = await User.findOne({emailId})
        
        if(!user){
            throw new Error("Invalid Credential")
        }
        
        const isPasswordValid = await user.validatePassword(password)
        
        if(isPasswordValid)
        {
            const token = await user.getJWT()
            res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)})
            res.send(
                {
                    "message":"Login Successful",
                    "data":user
                }
            )
        }
        else{
            throw new Error("Invalid Credential")
        }   
    }
    catch(err){
        // res.status(400).send("Error: "+err.message)
        res.send(err.message)
    }
})

userAuth.post("/logout",async(req,res)=>{
    res.cookie("token",null,{expires:new Date(Date.now())})
    res.send({"message":"Logout Successful"})
})

module.exports = userAuth



