<template>
    <div>
        <div class="main-div">
            <router-view />
        </div>
        <van-tabbar v-model="active" @change="onChange(active)">
            <van-tabbar-item icon="shop">首页</van-tabbar-item>
            <van-tabbar-item icon="records">列表</van-tabbar-item>
            <van-tabbar-item icon="cart">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact">会员中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active:0,
            nowPath:'',
        }
    },
    created() {
        this.changeTabBarActive()
    },
    updated() {
        this.changeTabBarActive()
    },
    methods: {
        onChange(active) {
            switch(active) {
                case 0:
                    this.$router.push({name:'shoppingMall'});
                    break;
                case 1:
                    this.$router.push({name:'CategoryList'});
                    break;
                case 2:
                    this.$router.push({name:'Cart'});
                    break;
                case 3:
                    this.$router.push({name:'Center'});
                    break;
                
            }
        },
        changeTabBarActive(){
            this.nowPath=this.$route.path
            if(this.nowPath=='/cart'){
                this.active=2;
            }
        },
    }
}
</script>
<style scoped>

</style>