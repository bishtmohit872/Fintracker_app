const connectDB = require("./config/dbConfig")
const express = require('express')
const app=express()
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use(express.json())
app.use(cookieParser())


const authRouter = require("./routes/userAuth")
const transactionRouter = require("./routes/transactionsOperations")

app.use("/",authRouter)
app.use("/",transactionRouter)


const PORT=3000

connectDB().then(()=>{
    app.listen(PORT,()=>{console.log("connected Successfully, Now listening")})
}).catch(()=>{
    console.log("Not Connected!")
})