<template>
    <div>
        <van-nav-bar 
            title="用户登录"
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
                <van-button type="primary" size="large" @click="loginAction" :loading="openLoading">登录</van-button>
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
    created() {
        if(localStorage.userInfo) {
            Toast.success('你已经登录过了')
            this.$router.push('/')
        }
    },
    methods : {
        onClickLeft() {
            this.$router.go(-1)
        },
        loginAction() {
            //这个方法整合registerNow和checkFrom方法，当checkFrom方法执行完，如果checkFrom验证用户名密码正确，才执行registerNow向后端发送请求
            //if(this.checkFrom()) {
            //    this.registerNow()
            //}
            this.checkFrom()&&this.loginNow()
        },
        loginNow() {
            this.openLoading = true;
            axios({
                url:url.login,
                method : 'post',
                data : {
                    UserName : this.username,
                    PassWord : this.password
                }
            })
            .then(response => {
                if(response.data.code==200&&response.data.message==true) {
                    //保存用户的登录状态
                    new Promise((resolve,reject) => {
                        localStorage.userInfo={UserName:this.username}
                        setTimeout(()=>{ resolve() },500)    
                    })
                    .then(() => {
                            Toast.success('登录成功！')
                            this.$router.push('/')
                        }) 
                    .catch(err => {
                        Toast.success('登录状态保存失败！')
                        console.log(err)
                    })
                } 
                else {
                    if(response.data.message=='noUser') {
                        Toast.success('用户名不存在！')
                    }
                    else {
                        Toast.success('密码错误')
                    }
                    this.openLoading=false
                }     
            })
            .catch(error => {
                console.log(error)
                this.openLoading=false
                Toast.fail('登录失败')
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