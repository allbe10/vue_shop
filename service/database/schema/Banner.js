const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = mongoose.Types.ObjectId

const newBanner = new Schema({
    id:ObjectId,
    name:{type:String,unique:true},
    url:{type:String}
})

mongoose.model('Banner',newBanner)