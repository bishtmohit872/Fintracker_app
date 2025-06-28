const express = require('express')
const transactionsOperations = express.Router()
const Transactions = require("../models/transactionsDB")
const authMiddleware = require('../middlewares/authMiddleware')


transactionsOperations.get("/api/transaction/all/",authMiddleware,async(req,res)=>{
    try{

        const trans = await Transactions.find()
        res.send({"data":trans})
    }
    catch(err){
        res.status(400).send("Error: "+err.message)
    }
})

transactionsOperations.post("/api/transaction/add/",authMiddleware, async(req,res)=>{
    try{

        const {title,amount,type,category} = req.body
        const trans = new Transactions({
            title,
            amount,
            type,
            category,
        })
        await trans.save()
        res.send({"message":"transaction added"})
    }
    catch(err){
        res.status(400).send("Error: "+err.message)
    }

})

transactionsOperations.patch("/api/transaction/:id",authMiddleware,async(req,res)=>{
    try{

        const {title,amount,type,category} = req.body
        const id = req.params.id
        const trans = await Transactions.updateOne({_id:id},{$set:{title,amount,type,category}})
        res.send("transaction updated")
    }
    catch(err){
        res.status(400).send("Error: "+err.message)
    }
})

transactionsOperations.delete("/api/transaction/:id",authMiddleware,async(req,res)=>{
    try{
        const id = req.params.id
        await Transactions.deleteOne({_id:id})
        res.send("Removed!")
    }
    catch(err){
        res.status(400).send("Error: "+err.message)
    }
})

transactionsOperations.get("/api/transaction/:startDate/:endDate/",authMiddleware,async(req,res)=>{
    try{

        const start = new Date(req.params.startDate + "T00:00:00.000Z")
        const end = new Date(req.params.endDate+"T23:59:59.999Z")
        const trans = await Transactions.find({createdAt:{$gte:start.toISOString(),$lte:end.toISOString()}})
        res.send(trans)
    }
    catch(err){
        res.status(400).send("Error: "+err.message)
    }
})

transactionsOperations.get("/api/transaction/summary",authMiddleware,async(req,res)=>{
    try{

        const trans = await Transactions.aggregate([
            {  $group:{_id:"$type","Total Cost":{$sum:"$amount"}}  }
        ])
        res.send(trans)
    }
    catch(err){
        res.status(400).status("Error: "+err.message)
    }
})

transactionsOperations.get("/api/transaction/stats",authMiddleware,async(req,res)=>{
    try{

        const trans1 = await Transactions.aggregate([
            { $group:{
                        _id:"$category",
                        "Cost":{$sum:"$amount"},
                        count:{$sum:1}
                    } 
            }
        ])
        const trans2 = await Transactions.aggregate([
            { $group:{
                        _id:{
                            year:{$year:"$createdAt"},
                            month:{$month:"$createdAt"}
                        },
                        count:{$sum:1}
                    } 
            },
            
            {
                $sort:{
                    "_id.year":1,
                    "_id.month":1
                }
            }
        ])
        res.send({'category':trans1,'time':trans2})
    }
    catch(err){
        res.status(400).send("Error: "+err.message)
    }
})

module.exports = transactionsOperations