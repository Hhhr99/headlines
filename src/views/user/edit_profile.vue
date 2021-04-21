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
      <img src="@/assets/logo.png" alt="">
      <van-uploader :after-read="afterRead"/>
    </div>
    <my_cell title="昵称" desc="我的昵称"></my_cell>
    <my_cell title="密码" desc="******"></my_cell>
    <my_cell title="性别" desc="男"></my_cell>
  </div>

</template>

<script>
import my_header from "@/components/my_header";
import my_cell from "@/components/my_cell";

export default {
  name: "edit_profile",
  components: {my_cell, my_header},
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
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