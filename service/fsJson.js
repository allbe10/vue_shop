const fs = require('fs') //引入node自带的fs，方便把goods.json引入，并读取

fs.readFile('./data_json/goods.json','utf8',function(err,data) { //把需要的json数据读取出来
    let newData = JSON.parse(data)
    let pushData = []
    let i = 0
    newData.RECORDS.map(function(value,index) {  //map方法遍历，提取有用的json数据
        if(value.IMAGE1!=null) {
            i++
            pushData.push(value)
        }
    })
    console.log(i)
    fs.writeFile('./data_json/newGoods.json',JSON.stringify(pushData),function(err) {  //把需要的json数据写入到新的json文件里面去
        if(err) console.log('文件写入失败')
        else console.log('文件写入成功')
    })
})