const connectDB = require("./src/config/dbConfig")
const express = require('express')
const app=express()
const cookieParser = require('cookie-parser')
const cors = require('cors')

require('dotenv').config();

app.use(cors({
    // origin:"http://localhost:5173",
    origin:"https://fintracker-app-backend.onrender.com",
    credentials:true,
}))
app.use(express.json())
app.use(cookieParser())


const authRouter = require("./src/routes/userAuth")
const transactionRouter = require("./src/routes/transactionsOperations")

app.use("/",authRouter)
app.use("/",transactionRouter)

const port = process.env.PORT || 3000

connectDB().then(()=>{
    app.listen(port,()=>{console.log("connected Successfully, Now listening")})
}).catch(()=>{
    console.log("Not Connected!")
})