const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
    {
        emailId:{
            type:String,
            required:true,
            unique:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Email Format Not Valid")
                }
            }
        },
        password:{
            type:String,
            required:true,
            validate(value){
                if(!validator.isStrongPassword(value)){
                    throw new Error("Please keep Strong Password")
                }
            }
        },
        photo:{
            type:String,
            default:"https://static.thenounproject.com/png/7539299-200.png",
            validate(value){
                if(!validator.isURL(value)){
                    throw new Error("Invalid URL for photo")
                }
            }
        }
    },
    {
        timestamps:true,
    }
)

userSchema.methods.getJWT = async function(){
    const token = await jwt.sign({_id:this._id},"finance@7011",{expiresIn:"1d"})
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,this.password)
    return isPasswordValid
}

const User = mongoose.model('User',userSchema)
module.exports = User