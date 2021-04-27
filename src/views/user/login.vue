<template>
  <div id="app">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <!-- :value='user.username'：父传子：数据影响元素 -->
        <!-- @getvalue='getv'：子传父：元素影响数据 -->
        <!-- <hm_input :value='user.username'
                  @getvalue='getv'></hm_input> -->
        <!-- v-model:双向数据绑定：数据影响元素 + 元素影响数据
        1.为子组件的value属性赋值
        2.监听子组件所发出的input事件 -->
        <my_input v-model='user.username'
                  placeholder='请输入手机号'
                  :rules='/^1[35789]\d{9}$/'
                  msg='请输入11位手机号'></my_input>

        <!-- 为子组件赋值优先赋值给子组件的props属性，如果没有props属性，那么就会添加到组件的根元素 -->
        <my_input v-model="user.password"
                  placeholder='请输入密码'
                  :rules='/^.{3,16}$/'
                  msg='请输入3~16位的密码'></my_input>

      </div>
      <p class="tips">
        没有账号？
        <a href="#/register"
           class="">去注册</a>
      </p>
      <!-- 这里监听到的click事件，不再是原生的内置click事件了，而是子组件所发出的click事件 -->
      <my_button @click='login'
                 type='success'>登陆</my_button>
    </div>
  </div>
</template>

<script>
import { userLogin } from '@/apis/user.js'
import My_input from "@/components/my_input";
import My_button from "@/components/my_button";
// import { Toast } from 'vant'
export default {
  components: {
    My_button,
    My_input,
  },
  data () {
    return {
      user: {
        username: '13998877665',
        password: '123456'
      }
    }
  },
  methods: {
    login (e) {
      if (/^1[35789]\d{9}$|^admin$/.test(this.user.username) && /^.{3,16}$/.test(this.user.password)) {
        userLogin(this.user)
            .then(res => {
              console.log(res);
              if (res.data.message == '登录成功') {
                // 将token存储到本地存储
                localStorage.setItem('token', res.data.data.token)
                localStorage.setItem('userid', res.data.data.user.id)
                // 跳转处理
                // 如果之前传递的回跳的路径，那么进行回跳
                let redirect = location.href.split('=')[1]
                if (redirect) {
                  location.href = decodeURIComponent(redirect)
                }
                else {// 否则跳转到个人中心页// 跳转到个人中心页
                  this.$router.push({ path: `/personal/${res.data.data.user.id}` })
                }


              } else {
                this.$toast.fail('登陆失败')
              }
            })
            .catch(err => {
              console.log(err);
            })
      } else {
        // 提示
        this.$toast({
          message: '手机号或者密码输入不合法',
          position: 'bottom',
          duration: 5000
        });
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