const Koa = require('koa')
const app = new Koa()
const { connect,initSchema } =require('./database/init.js')
const mongoose = require('mongoose')
const Router = require('@koa/router')
const user = require('./appApi/user.js')
const goods = require('./appApi/goods.js')
const banner = require('./appApi/banner.js')
const bodyBody = require('koa-body')
const serve = require('koa-static')
const cors = require('koa2-cors')
app.use(cors())
app.use(bodyBody(
    {
        multipart:true,
        formidable:{
          maxFileSize:200*1024*1024    //设置上传文件的大小，默认2M
        }
      }
));   //可以以ctx.request.body获取前端发送过来的数据
app.use(serve(__dirname + '/staticServer'))

;(async () =>{
    await connect()
    initSchema()//初始化让数据库导入所有的表
})()


//装载所有的子路由
const router = new Router()
router.use('/user',user.routes())
router.use('/goods',goods.routes())
router.use('/banner',banner.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


app.use(async(ctx) => {
    ctx.body = 'hello koa2'
})

app.listen(3000, () => {
    console.log('server success!')
})
