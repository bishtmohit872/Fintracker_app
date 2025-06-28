const mongoose=require("mongoose")

const connectDB= async()=>{
    await mongoose.connect("mongodb+srv://m2079b:mlgW1vjBfido7M5s@namastenode.nggjxtj.mongodb.net/financeDB")
}

module.exports = connectDB