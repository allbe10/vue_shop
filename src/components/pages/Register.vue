<template>
    <div>
        <van-nav-bar 
            title="用户注册"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="input-body">
            <van-field 
                v-model="username"
                label="用户名"
                clearable
                required
                placeholder="请输入用户名"
                :error-message="usernameMessage"
            />
            <van-field 
                v-model="password"
                type="password"
                label="用户名"
                clearable
                required
                placeholder="请输入密码"
                :error-message="passwordMessage"
            />
            <div class="input-button">
                <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">马上注册</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import url from '@/serverAPI.config.js'
import { Toast } from 'vant'
export default {
    data() {
        return {
            username:'',
            password:'',
            openLoading:false, //是否开启用户注册的loading状态，防止用户连续提交表单
            usernameMessage:'', //当前端验证到用户名出错后弹出的错误提示
            passwordMessage:'',  //当前端验证到用户密码出错后弹出的错误提示
        }
    },
    methods : {
        onClickLeft() {
            this.$router.go(-1)
        },
        registerAction() {
            //这个方法整合registerNow和checkFrom方法，当checkFrom方法执行完，如果checkFrom验证用户名密码正确，才执行registerNow向后端发送请求
            //if(this.checkFrom()) {
            //    this.registerNow()
            //}
            this.checkFrom()&&this.registerNow()
        },
        registerNow() {
            this.openLoading = true;
            axios({
                url:url.register,
                method : 'post',
                data : {
                    UserName : this.username,
                    PassWord : this.password
                }
            })
            .then(response => {
                if(response.data.code==200) {
                    Toast.success(response.data.message)
                    this.$router.push('/')
                }      
                else {
                    console.log(response.data.message)
                    this.openLoading=false
                    Toast.fail('注册失败')
                }
            })
            .catch(error => {
                console.log(error)
                this.openLoading=false
                Toast.fail('注册失败')
            })
        },
        checkFrom() {
            //此方法为验证用户输入用户名和密码的正确性
            let isok=true
            if(this.username.length<5) {
                this.usernameMessage="用户名不能少于5位！"
                isok=false
            }
            else {
                this.usernameMessage=''
            }

            if(this.password.length<6) {
                this.passwordMessage="密码不能少于6位！"
                console.log(this.passwordMessage)
                isok=false
            }
            else {
                this.passwordMessage=''
            }
            return isok
        },
    },
    
    
}
</script>
<style scoped>
    
</style>