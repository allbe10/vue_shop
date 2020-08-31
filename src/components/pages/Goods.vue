<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar
                title="商品详情"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
             />
        </div>
        <div class="goodsInfo-div">
            <img :src="goodsInfo.IMAGE1" width="100%" />
        </div>
        <div class="goods-name">
            {{goodsInfo.NAME}}
        </div>
        <div class="goods-price">
            价格：${{goodsInfo.ORI_PRICE | moneyFilter}}
        </div>
        <div>
            <van-tabs swipeable sticky>
                <van-tab title="商品详情">
                    <div class="detail" v-html="goodsInfo.DETAIL"></div>
                </van-tab>
                <van-tab title="评论">评论</van-tab>
            </van-tabs>
        </div>
        <div class="goods-button">
            <div>
                <van-button size="large" type="primary" @click="addGoodsInfo">加入购物车</van-button>
            </div>
            <div>
                <van-button size="large" type="danger">立即购买</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import url from '@/serverAPI.config.js'
import {toMoney} from '@/filter/moneyFilter.js'
import {Toast} from 'vant'
export default {
    data() {
        return {
            goodsId:'',
            goodsInfo:{},
        }
    },
    filters:{
        moneyFilter(money) {
            return toMoney(money)
        }
    },
    created() {
        this.goodsId=this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId
        console.log(this.goodsId)
        this.getGoodInfo()
    },
    methods:{
        getGoodInfo() {
            axios({
                url:url.goodsInfo,
                method:'post',
                data:{
                    goodsId:this.goodsId
                }
            }).then(response => {
                console.log(response)
                this.goodsInfo = response.data.message
            }).catch(error => {
                console.log(error)
            })
        },
        onClickLeft() {
            this.$router.go(-1)
        },
        addGoodsInfo() {
            let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : []
            let isHaveGoods = cartInfo.find(cart=>cart.goodsId == this.goodsId)
            if(!isHaveGoods) {
                let newGoodsInfo = {
                    goodsId : this.goodsInfo.ID,
                    Name : this.goodsInfo.NAME,
                    Price : this.goodsInfo.PRESENT_PRICE,
                    Image : this.goodsInfo.IMAGE1,
                    Count : 1
                }
                cartInfo.push(newGoodsInfo)
                localStorage.cartInfo = JSON.stringify(cartInfo)
                Toast.success('添加购物车成功！')
            }else {
               Toast.success('购物车已存在此商品！') 
            }
            this.$router.push({name:'Cart'})
        }
    }
}
</script>
<style scoped>
    .goods-name {
        background-color: #fff;
    }
    .goods-price {
        background-color: #fff;
    }
    .detail {
        font-size:0px
    }
    .goods-button {
        position:fixed;
        bottom:0px;
        left:0px;
        background-color: #fff;
        width:100%;
        display:flex;
        flex-direction: row;
        flex-flow: nowrap;
    }
    .goods-button > div {
        flex:1;
    }

</style>