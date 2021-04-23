<template>
  <div class="index">
    <!--    头部-->
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push({name:'Search'})">
        <van-icon name="search"/>
        <span>搜索商品</span>
      </div>
      <div class="user" @click="$router.push({path:`/personal/${id}`})">
        <van-icon name="manager-o"/>
      </div>
    </div>
    <!--    tab标签页-->
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="cate.name" v-for="(cate,index) in cateList" :key="cate.id">内容 {{ index + 1 }}</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {getCateList} from "@/apis/category";

export default {
  name: "index",
  data() {
    return {
      active: 1,
      cateList: []
    };
  },
  async mounted() {
    let res = await getCateList()
    console.log(res);
    this.cateList = res.data.data
    // console.log(this.cateList)
  }
}
</script>

<style lang="less" scoped>
.index {
  .header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    background-color: red;

    .logo {
      color: #fff;

      .iconnew {
        font-size: 50px;
      }
    }

    .search {
      flex: 1;
      height: 30px;
      margin-top: 5px;
      border-radius: 20px;
      background-color: rgba(266, 266, 266, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }

    .user {
      color: #fff;
      font-size: 20px;
    }
  }
}
</style>