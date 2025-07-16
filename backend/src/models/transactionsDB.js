const mongoose = require('mongoose')

const transactionsSchema = mongoose.Schema(
    {
        description: {
            type: String,
            require: [true, "Title can't be empty"],
        },
        category: {
            type: String,
        },
        type: {
            type: String,
            require: true,
            enum:{
                values:['income','expense'],
                message:"invalid type",
            }
        },
        amount: {
            type: Number,
            require:[true,"Amount can't be Empty"],
            default: 0,
        },

    },
    {
        timestamps:true,
    }
)

const Transactions = mongoose.model("Transactions",transactionsSchema)
module.exports = Transactions