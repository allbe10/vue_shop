<template>
    <div>
        <div classs="nav-div">
            <van-nav-bar title="购物车" />
        </div>
        <div class="cart-list">
            <div class="cart-row" v-for="(item,index) in cartInfo" :key="index">
                <div class="cart-img">
                    <img :src="item.Image" width="100%" />
                </div>
                <div class="cart-name">
                    <div class="item-name">{{item.Name}}</div>
                    <div class="item-count">
                        <van-stepper v-model="item.Count" max="10" />
                    </div>
                </div>
                <div class="cart-price">
                    <div>${{item.Price | moneyFilter}}</div>
                    <div>x{{item.Count}}</div>
                    <div class="item-price">${{item.Price*item.Count | moneyFilter}}</div>
                </div>
            </div>
        </div>
        <div class="total-money">
            商品总价：￥{{totalMoney | moneyFilter}}
        </div>
        <div class="nav-title">
            <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
        </div>
    </div>    
</template>
<script>
import { Toast } from 'vant'
import { toMoney} from '@/filter/moneyFilter.js'
export default {
    data() {
        return {
            cartInfo:[],
            isEmpty:false,
        }
    },
    created() {
        this.getCartInfo()
    },
    computed: {
        totalMoney() {
            let allMoney = 0
            this.cartInfo.forEach((item,index) => {
                allMoney += item.Price*item.Count
            })
            localStorage.cartInfo = JSON.stringify(this.cartInfo)
            return allMoney
        }
    },
    methods : {

        //获取localStorage的购物信息
        getCartInfo() {
            if(localStorage.cartInfo)  {
                this.cartInfo=JSON.parse(localStorage.cartInfo)
            }

            this.isEmpty = this.cartInfo.length >0 ? true : false
            console.log(JSON.stringify(this.cartInfo))
        },
        clearCart() {
            localStorage.removeItem('cartInfo') 
            this.cartInfo = []
            Toast.success('清空购物车成功！')
        },
    },
    filters: {
        moneyFilter(money) {
            return toMoney(money)
        }
    }
    
}
</script>
<style scoped>
    .nav-title {
        height:2rem;
        line-height:2rem;
        background-color: #fff;
        border-bottom:1px solid #E4E7ED;
        padding:5px;
        text-align:center;
    }
    .cart-list {
        background-color: #fff;
    }
    .cart-row {
        display: flex;
        flex-direction: row;
        flex-wrap:nowrap;
        padding:0.5rem;
        font-size:0.85rem;
        border-bottom:1px solid #E4E7ED;
    }
    .cart-img {
        flex:6;
    }
    .cart-name {
        flex:12;
        padding-left:10px;
    }
    .item-count {
        padding-top: 10px;
    }
    .cart-price {
        flex:4;
        text-align: right;
    }
    .item-price {
        color: red;
    }
    .total-money {
        text-align: right;
        background-color: #fff;
        border-bottom:1px solid #E4E7ED;
        padding: 5px;
        color: red;
    }

</style>