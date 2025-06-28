const mongoose = require('mongoose')

const transactionsSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: [true, "Title can't be empty"],
        },
        amount: {
            type: Number,
            require:[true,"Amount can't be Empty"],
            default: 0,
        },
        type: {
            type: String,
            require: true,
            enum:{
                values:['income','expense'],
                message:"invalid type",
            }
        },
        category: {
            type: String,
        },

    },
    {
        timestamps:true,
    }
)

const Transactions = mongoose.model("Transactions",transactionsSchema)
module.exports = Transactions