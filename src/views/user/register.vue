<template>
  <div class="container">
    <div class="close"><span class="iconfont iconicon-test"></span></div>
    <div class="logo"><span class="iconfont iconnew"></span></div>
    <div class="inputs">
      <my_input placeholder="请输入手机号" :rules="/^1[3456789]\d{9}$/" msg="请输入11位手机号"
                v-model.trim="user.username"></my_input>
      <!--为子组件赋值有限给子组件的props属性，如果没有props属性，那么就会添加到组件的根元素-->
      <my_input placeholder="请输入昵称" v-model="user.nickname"></my_input>
      <my_input placeholder="请输入密码" :rules="/^.{3,16}$/" msg="请输入3~16位密码" v-model.trim="user.password"></my_input>
    </div>
    <p class="tips">
      有账号？
      <a href="#/login"
         class="">去登录</a>
    </p>
    <my_button @click="register" type="success">
      注册
    </my_button>
  </div>
</template>

<script>
import {userRegister} from "@/apis/user";
import My_button from "@/components/my_button";
import My_input from "@/components/my_input";

export default {
  name: "register",
  components: {My_input, My_button},
  data() {
    return {
      user: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  methods: {
    async register() {
      if (/^1[3456789]\d{9}$/.test(this.user.username) || /^.{3,16}$/.test(this.user.password) && this.user.nickname.length > 0) {
        userRegister(this.user)
            .then((res) => {
              console.log(res)
              if ((res.data.message === '注册成功')) {
                this.$toast('注册成功')
              } else {
                this.$toast.fail(res.data.message)
              }
            })
            .catch((err) => {
              console.log(err)
            })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>