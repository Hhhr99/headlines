<template>
  <div class="edit_profile">
    <my_header title="编辑个人信息">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)"></van-icon>
      </template>
      <template #right>
        <van-icon name="wap-home-o" @click="$router.push({name:'index'})"></van-icon>
      </template>
    </my_header>
    <div class="imgarea">
      <img :src="userinfo.head_img" alt="">
      <van-uploader :after-read="afterRead"/>
    </div>
    <my_cell title="昵称" :desc="userinfo.nickname" @click.native="showNicknameDialog"></my_cell>
    <van-dialog v-model="nickshow" title="编辑昵称" show-cancel-button @confirm="editNickname">
      <van-field v-model="nickname" label="昵称" placeholder="请输入用户名"/>
    </van-dialog>

    <my_cell title="密码" :desc="userinfo.password" @click.native="passshow=!passshow;originPass=newPass=''"></my_cell>
    <van-dialog v-model="passshow" title="编辑密码" show-cancel-button @confirm="editPass" :beforeClose="beforeClose">
      <van-field v-model.trim="originPass" label="原密码" placeholder="请输入原密码"/>
      <van-field v-model.trim="newPass" label="新密码" placeholder="请输入新密码"/>
    </van-dialog>

    <my_cell title="性别" :desc="userinfo.gender===1?'男':'女'"></my_cell>
  </div>

</template>

<script>
import my_header from "@/components/my_header";
import my_cell from "@/components/my_cell";
import {getUserDetail, uploadUserInfo} from "@/apis/user";
import {uploadFile} from "@/apis/fileUpload";
import axios from "@/utils/request";

export default {
  name: "edit_profile",
  data() {
    return {
      userinfo: {},
      id: '',
      nickshow: false,
      passshow: false,
      // 昵称所对应的变量
      nickname: '',
      // 用户所输入的原始密码
      originPass: '',
      newPass: ''
    }
  },
  components: {my_cell, my_header},
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      let formdata = new FormData()
      formdata.append('file', file.file)
      uploadFile(formdata)
          .then(res => {
            console.log(res)
            if (res.data.message === '文件上传成功') {
              this.$toast.success(res.data.message)
              this.userinfo.head_img = axios.defaults.baseURL + res.data.data.url
              uploadUserInfo(this.$route.params.id, {head_img: res.data.data.url})
                  .then(res => {
                    console.log(res)
                  })
                  .catch(err => {
                    console.log(err)
                  })

            }
          })
          .catch(err => {
            console.log(err)
          })
    },
    // 昵称
    showNicknameDialog() {
      this.nickshow = !this.nickshow
      this.nickname = this.userinfo.nickname
    },
    editNickname() {
      uploadUserInfo(this.$route.params.id, {nickname: this.nickname})
          .then(res => {
            console.log(res)
            if (res.data.message === '修改成功') {
              this.$toast.success('修改成功')
              this.userinfo.nickname = this.nickname
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
    // 修改用户密码
    async editPass() {
      if (this.originPass === this.userinfo.password) {
        if (/^.{3,16}$/.test(this.newPass)) {
          let res = await uploadUserInfo(this.$route.params.id, {password: this.newPass})
          console.log(res)
          // 虽然这里不需要更新页面中的显示，但是之前判断原密码是否正确是通过userinfo进行的，所以在密码修改成功之后，为了下次的密码匹配，我们将userinfo中的数据进行更新
          this.userinfo.password = this.newPass
          this.$toast.success(res.data.message)

        } else {
          this.$toast.fail('请输入3~16位密码')
        }
      } else {
        this.$toast.fail('原密码输入不正确')
      }
    },
    // 编辑密码时，阻止模态框的关闭
    // action：当前用户的行为：confirm  cancel
    beforeClose(action, done) {
      if (action === 'confirm') {
        if (this.originPass !== this.userinfo.password || !(/^.{3,16}$/).test(this.newPass)) {
          done(false)
        } else {
          done()
        }
      } else {
        done()
      }
    },
  },
  mounted() {
    // console.log(this.$route.params.id)
    let id = this.$route.params.id
    this.id = id
    getUserDetail(id)
        .then(res => {
          console.log(res)
          this.userinfo = res.data.data
          this.userinfo.head_img = axios.defaults.baseURL + this.userinfo.head_img
        })
        .catch(err => {
          console.log(err)
        })
  },
}
</script>

<style lang="less" scoped>
.edit_profile {
  .imgarea {
    padding: 20px 0;
    display: flex;
    justify-content: center;
    position: relative;

    > img {
      width: 90px;
      height: 90px;
      display: block;
    }

    /deep/ .van-uploader {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    /deep/ .van-uploader__upload {
      width: 100px;
      height: 90px;
      opacity: 0;
    }
  }
}
</style>