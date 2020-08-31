<template>
    <div>
        <!-- 首页搜索框 -->
        <div class="search-bar">
            <van-row >
                <van-col span="3">
                    <img :src="locationIcon" width="75%" class="location-icon" />
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input" />
                </van-col>
                <van-col span="5">
                    <van-button size="mini">搜索</van-button>
                </van-col>
            </van-row>
        </div>
        <!-- 首页轮播图--> 
        <div class="swiper-area"> 
            <van-swipe :autoplay="2500">
                <van-Swipe-item v-for="(banner , index) in bannerArray " :key="index">
                    <img v-lazy="banner.image" width="100%" />
                </van-Swipe-item>
            </van-swipe>
        </div>
        <!-- 首页商品类别-->
        <div class="type-bar">
            <div v-for="(item , index) in category" :key="index">
                <img v-lazy="item.image" width="98%"/>
                <span>
                    {{item.mallCategoryName}}
                </span>
            </div>
        </div>
        <!-- 广告区域-->
        <div>
            <img v-lazy="banner" width="100%" />
        </div>
        <!-- 首页商品推荐-->
        <div class="commend-area">
            <div class="commend-title">
                商品推荐
            </div>
            <div class="commend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" width="80%" />
                            <div>{{item.goodsName}}</div>
                            <div>${{item.price | moneyFilter}}${{item.mallPrice | moneyFilter}}</div>
                        </div>  
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
        </div>
        <floor-component :floorData="floor1" :floortitle="floorName.floor1"></floor-component>
        <floor-component :floorData="floor2" :floortitle="floorName.floor2"></floor-component>
        <floor-component :floorData="floor3" :floortitle="floorName.floor3"></floor-component>
        <!--首页热门商品推荐-->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
            <!--这里需要一个list组件-->
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item , index) in hotGoods" :key="index">
                            <shangping-component :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></shangping-component>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import floorComponent from '../component/floorComponent'
import { toMoney } from '@/filter/moneyFilter.js'
import shangpingComponent from '../component/shangpingComponent'
import url from '@/serverAPI.config.js'

export default {
    
    data () {
        return {
            msg:'lishangchi',
            locationIcon:require('../../assets/images/location.png'),
            bannerArray:[],
            category:[],
            banner:'',
            recommendGoods:[],
            swiperOption: {
                slidesPerView: 3,
                pagination: {
                    el: '.swiper-pagination'
                            }},
            floor1:[],
            floor2:[],
            floor3:[],
            floorName:{},
            hotGoods:[],
        }
    },
    filters:{
        moneyFilter(money) {
            return toMoney(money);
        }
    },
    components: {
      Swiper,
      SwiperSlide,
      floorComponent,
      shangpingComponent,
    },
    created () {
        axios({
            url:url.getShoppingMall,
            method:'get'
        })
        .then(response => {
            console.log(response)
            if(response.status==200) {
                this.category=response.data.data.category;
                this.banner=response.data.data.advertesPicture.PICTURE_ADDRESS;
                this.bannerArray=response.data.data.slides;
                this.recommendGoods=response.data.data.recommend;
                this.floor1=response.data.data.floor1;
                this.floor2=response.data.data.floor2;
                this.floor3=response.data.data.floor3;
                this.floorName=response.data.data.floorName;
                this.hotGoods=response.data.data.hotGoods;
                console.log(this.category);
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
    
}
</script>
<style scoped>
    .search-bar {
        height:2.2rem;
        background-color: #e5017d;
        line-height: 2.2rem;
        overflow: hidden;
    }
    .search-input {
        height:1.3rem;
        width:100%;
        border-top:0px;
        border-left:0px;
        border-right:0px;
        border-bottom:1px solid #fff !important;
        background-color: #e5017d;
        color:#fff;
    }
    .location-icon {
        padding-top:0.2rem;
        padding-left:0.2rem;
    }
    .swiper-area {
        clear:both;
        max-height:15rem;
        overflow:hidden;
    }
    .type-bar {
        background-color: #fff;
        margin:0 .3rem .3rem .3rem;
        border-radius:.3rem;
        font-size:14px;
        display:flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    .type-bar div {
        padding:.3rem;
        font-size:12px;
        text-align: center;
        flex:1;
    }
    .commend-area {
        background-color: #fff;
        margin-top:.3rem;
    }
    .commend-title {
        border-bottom:1px solid #eee;
        font-size:14px;
        padding:.2rem;
        color:#e5017d;
    }
    .commend-body {
        border-bottom:1px solid #eee;
    }
    .recommend-item {
        width:99%;
         border-right:1px solid #eee;
        font-size:12px;
        text-align:center;
    }
    .hot-area{
        text-align: center;
        font-size:14px;
        height: 1.8rem;
        line-height:1.8rem;
    }
    .hot-goods {
        height: 130rem;
        overflow: hidden;
        background-color: #fff;
    }
</style>