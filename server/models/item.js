const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: String,
    description: String  
})

const project = new mongoose.Schema({
    title: String,
    no: String ,
    link : String 
})

const itemModel = mongoose.model("Item",itemSchema)
module.exports = itemModel