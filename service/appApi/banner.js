const Router = require('@koa/router');
const mongoose = require('mongoose')

const router = new Router();

router.get('/',async(ctx) => {
    ctx.body="这是用户操作首页"
})

router.post('/addBanner',async(ctx) => {
    const Banner = mongoose.model('Banner')
    let newBanner = new Banner(ctx.request.body)
    try {
        const res = await newBanner.save()
        if(res) {
            console.log(res)
            ctx.body ={
                code:200,
                message:'添加成功！'
            }
        }
        else {
            ctx.body ={
                code:200,
                message:'添加失败！'
            }
        }
    }
    catch(error) {
        console.log(error)
        ctx.body ={
            code:500,
            message:'添加失败！'
        }
    }
    
})

router.get('/getBanner',async(ctx) => {
    const Banner = mongoose.model('Banner')
    try {
        const res = await Banner.find().exec()
        if(res) {
            ctx.body = {
                code:200,
                message:res
            }
        }
        else {
            ctx.body = {
                code:500,
                message:'轮播图获取失败！'
            }
        }
    }
    catch(error) {
        console.log(error)
        ctx.body = {
            code:500,
            message:'轮播图获取失败！'
        }
    }
})

router.post('/addCates',async(ctx)=> {
    const Cates = mongoose.model('Cates')
    const newCates = new Cates(ctx.request.body)
    try {
        const res = await newCates.save()
        if(res) {
            ctx.body = {
                code:200,
                message:res
            }
        }
        else {
            ctx.body = {
                code:500,
                message:'添加失败！'
            }
        }
    }
    catch(error) {
        console.log(error)
        ctx.body = {
            code:500,
            message:error
        }
    }
})

router.get('/getCates',async(ctx)=> {
    const Cates = mongoose.model('Cates')
    try {
        const res = await Cates.find().exec()
        if(res) {
            ctx.body = {
                code:200,
                message:res
            }
        }
        else {
            ctx.body = {
                code:500,
                message:'查询失败！'
            }
        }
    }
    catch(error) {
        console.log(error)
        ctx.body = {
            code:500,
            message:error
        }
    }
})


module.exports = router