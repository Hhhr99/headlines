<template>
  <div id="app">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <my_input v-model="user.username" placeholder="请输入手机号" :rules="/^1[3456789]\d{9}$/" msg="请输入11位手机号"></my_input>
        <!--为子组件赋值有限给子组件的props属性，如果没有props属性，那么就会添加到组件的根元素-->
        <my_input v-model="user.password" placeholder="请输入密码" :rules="/^.{3,16}$/" msg="请输入3~16位密码"></my_input>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
      <my_button @click="login" type="success">
        登录
      </my_button>
    </div>
  </div>
</template>

<script>
import my_button from "@/components/my_button";
import my_input from "@/components/my_input";
import {userLogin} from "@/apis/user";

export default {
  name: "login",
  components: {my_button, my_input},
  data() {
    return {
      user: {
        username: '13000000001',
        password: '1234'
      }
    }
  },
  methods: {
    login(e) {
      if (/^1[3456789]\d{9}$/.test(this.user.username) || /^.{3,16}$/.test(this.user.password)) {
        userLogin(this.user)
            .then((res) => {
              console.log(res)
              localStorage.setItem('token', res.data.data.token)
              this.$toast.success('登录成功')
              this.$router.push({path: `/personal/${res.data.data.user.id}`})
              let redirect = location.href.split('=')[1]
              if (redirect) {
                location.href = decodeURIComponent(redirect)
              } else {
                this.$router.push({path: `/personal/${res.data.data.user.id}`})
              }
            })
            .catch((err) => {
              console.log(err)
              this.$toast.fail('登录失败')
            })
      } else {
        this.$toast.fail('请输入正确的用户名和密码')
      }
    }
  },
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