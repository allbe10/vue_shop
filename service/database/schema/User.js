const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.ObjectId
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10


//schema定义表的骨架
const userSchema = new Schema({
    UserId : String,
    UserName : {type : String, unique : true},
    PassWord : {type : String},
    CreateAt : {type :Date,default :Date.now()},
    LastLogin : {type :Date,default :Date.now()}
})

//数据库每一次保存之前，都要做以下指定的函数,函数主要对用户输入的密码进行加盐加密处理
userSchema.pre('save',function(next) {
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt) => {
        if(err) return next(err)
        bcrypt.hash(this.PassWord,salt,(err,hash) => {
            if(err) return next(err)
            this.PassWord = hash
            next()
        })
    })
})

userSchema.methods = {
    //后台匹配密码的方法，_password为用户登录的密码，password为数据库存储的密码，对比两个密码
    comparePassword:(_password,password) => {
        return new Promise((resolve,reject) => {
            //bcrypt提供compare方法来把登录的密码和数据库加盐加密的密码进行对比
            bcrypt.compare(_password,password,(err,isMatch) => {
                if(!err) {
                    resolve(isMatch)
                }
                else {
                    reject(err)
                }
            })
        })
    }
}


//用Model对表的骨架发布出去
mongoose.model('User', userSchema)

