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
    <my_cell title="昵称" :desc="userinfo.nickname"></my_cell>
    <my_cell title="密码" :desc="userinfo.password"></my_cell>
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
      id: ''
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