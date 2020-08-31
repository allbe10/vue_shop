const Router = require('@koa/router');
const mongoose = require('mongoose')

const router = new Router();

router.get('/',async(ctx) => {
    ctx.body="这是用户操作首页"
})


router.post('/register',async(ctx) => {
    const User = mongoose.model('User')
    let newUser = new User(ctx.request.body)

    await newUser.save().then(() => {
        ctx.body = {
            code:200,
            message:'注册成功'
        }
    }).catch(error => {
        ctx.body = {
            code:500,
            message:error
        }
    })

})

router.post('/login',async(ctx) => {
    let loginUser=ctx.request.body
    console.log(loginUser)
    let UserName =loginUser.UserName
    let PassWord =loginUser.PassWord

    //引入User的model
    const User = mongoose.model('User')
    await User.findOne({UserName:UserName}).exec().then(async (result) => {
        console.log(result)
        if(result) {
            let newUser = new User()
            await newUser.comparePassword(PassWord,result.PassWord)
            .then(isMatch => {
                ctx.body = {
                    code:200,
                    message:isMatch
                }
            })
            .catch(error => {
                console.log(error)
                ctx.body = {
                    code:500,
                    message:error
                }
            })
        }
        else {
            ctx.body = {
                code:200,
                message:'noUser'
            }
        }
    }).catch(error => {
        console.log(error)
        ctx.body = {
            code:500,
            message:error
        }
    })
})

module.exports = router