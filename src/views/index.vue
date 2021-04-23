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
      <van-tab title="标签 1" style="height: 1000px;background-color: yellow;">内容 1</van-tab>
      <van-tab title="标签 2" style="height: 1000px;background-color: red;">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 5">内容 5</van-tab>
      <van-tab title="标签 6">内容 6</van-tab>
      <van-tab title="标签 7">内容 7</van-tab>
      <van-tab title="标签 8">内容 8</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      active: 1,
    };
  },
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