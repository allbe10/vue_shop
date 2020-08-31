const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const newCates = new Schema({
    id:ObjectId,
    name:{type:String,unique:true},
    url:{type:String,unique:true},
})

mongoose.model('Cates',newCates)