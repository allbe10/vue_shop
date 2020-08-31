const BASEURL = "https://www.easy-mock.com/mock/5ed8872e8afb710bec775062/"
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMall : BASEURL + 'first', //网站首页所有商品信息
    register : LOCALURL + 'user/register', //用户注册接口
    login : LOCALURL + 'user/login',   //用户登录接口
    goodsInfo : LOCALURL +'goods/getDetailInfo',  //商品详情页请求接口
    getCategoryList : LOCALURL + 'goods/getCategoryList',  //前端获取商品一级分类接口
    getCategorySubList : LOCALURL + 'goods/getCategorySubList',  //前端获取商品二级分类接口
    getGoodsList : LOCALURL + 'goods/getGoodsList',      //根据二级商品id查找相应的商品
}
module.exports = URL