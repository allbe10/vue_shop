const Router = require('@koa/router');
const mongoose = require('mongoose')
const fs = require('fs');
const { request } = require('http');

const router = new Router();
//一次性插入数据到数据表，这三个请求已经执行完成，相当于数据库表的初始化
//第一个请求为商品的插入，第二个为商品一级分类的插入，第三个为商品二级分类的插入
router.get('/insertAllgoodsInfo',async(ctx) => {
    // 把newGoods里面的json数据导入到数据库表Goods中去，已经执行过了
    fs.readFile('./data_json/newGoods.json','utf8',(err,data) => {
        data = JSON.parse(data)
        let saveCounct=0
        const Goods = mongoose.model('Goods')
        data.map((value,index) => {
            console.log(value)
            let newGoods = new Goods(value)
            newGoods.save().then(() => {
                saveCounct++
                console.log('成功'+saveCounct)
            }).catch(error => {
                console.log(error)
            })
        })
    })
    ctx.body="开始导入数据"
})

router.get('/insertAllcategory',async(ctx) => {
    // 把category里面的json数据导入到数据库表categorys中去，已经执行过了
    fs.readFile('./data_json/category.json','utf8',(err,data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const Category = mongoose.model('Category')
        data.RECORDS.map((value,index) => {
            console.log(value)
            let newCategory = new Category(value)
            newCategory.save().then(() => {
                saveCount++
                console.log('成功'+saveCount)
            })
            .catch(error => {
                console.log(error)
            })
        })
    })
    ctx.body = "正在插入数据"

})

router.get('/insertAllcategorySub',async(ctx) => {
    fs.readFile('./data_json/category_sub.json','utf8',(err,data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((value,index) => {
            console.log(value)
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(() => {
                saveCount++
                console.log('成功'+saveCount)
            })
            .catch(error => {
                console.log(error)
            })
        })
    })
    ctx.body = "正在插入商品二级分类"
})

/** 与前端用户交互的请求接口,这个接口为商品详情页的接口 */
router.post('/getDetailInfo',async(ctx) => {
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    await Goods.findOne({ID:goodsId}).exec()
    .then(async(result) => {
        ctx.body = {
            code:200,
            message:result
        }
    })
    .catch(error => {
        console.log(error)
        ctx.body = {
            code:500,
            message:error
        }
    })
})


//获取商品一级分类接口
router.get('/getCategoryList',async(ctx) => {
    try {
        const Category = mongoose.model('Category')
        let result = await Category.find().exec()
        ctx.body = {
            code:200,
            message:result
        }
    }
    catch(error) {
        ctx.body = {
            code:200,
            message:error
        }
    }
})

//获取商品二级分类接口
router.post('/getCategorySubList',async(ctx) => {
    try {
        let categoryId = ctx.request.body.categoryId
        const CategorySub = mongoose.model('CategorySub')
        let result = await CategorySub.find({MALL_CATEGORY_ID:categoryId}).exec()
        ctx.body = {
            code:200,
            message:result
        }
    }catch(error) {
        ctx.body = {
            code:500,
            message:error
        }
    }
})


//根据类别获取对应的商品列表
router.post('/getGoodsList',async(ctx) => {
    try {
        let categorySubId = ctx.request.body.categorySubId
        let page = ctx.request.body.page   //前后端配合实现分页
        let num =10    //每一页显示10个商品
        let start = (page-1)*num  //分页开始位置
        const Goods = mongoose.model('Goods')
        let result = await Goods.find({SUB_ID:categorySubId})
        .skip(start).limit(num).exec()
        ctx.body = {
            code:200,
            message:result
        }
    }catch(error) {
        ctx.body ={
            code:500,
            message:error
        }
    }
})


//后台查询全部商品接口
router.get('/getgoodslist',async(ctx) => {
    try {
        const Goods = mongoose.model('Goods')
        const result = await Goods.find().exec()
        if(result) {
            ctx.body = {
                code:200,
                message:result
            }
        }
        else {
            ctx.body = {
                code:500,
                message:'服务器出现问题！'
            }
        }
    }
    catch(error) {
        ctx.body = {
            code:500,
            message:'服务器出现问题！'
        }
    }
})

router.get('/abcd',async(ctx) => {
    try {
        let categorySubId = '2c9f6c946016ea9b016016f79c8e0000'
        const Goods = mongoose.model('Goods')
        let result = await Goods.find({SUB_ID:categorySubId}).exec()
        ctx.body = {
            code:200,
            message:result
        }
    }catch(error) {
        ctx.body ={
            code:500,
            message:error
        }
    }
})
module.exports = router
