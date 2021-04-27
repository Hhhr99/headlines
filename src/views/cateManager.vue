<template>
  <div class="cateManager">
    <my_header title="栏目管理">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)"></van-icon>
      </template>
      <template #right>
        <van-icon name="wap-home-o" @click="$router.push({name:'index'})"></van-icon>
      </template>
    </my_header>
    <div class="delCate">
      <h3>点击删除频道</h3>
      <div class="list">
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
      </div>
    </div>
    <div class="addCate">
      <h3>点击添加频道</h3>
      <div class="list">
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
      </div>
    </div>
  </div>
</template>

<script>
import My_header from "@/components/my_header";

export default {
  name: "cateManager",
  components: {My_header}
}
</script>

<style lang="less" scoped>
.delCate,
.addCate {
  padding: 10px;
  h3 {
    line-height: 30px;
    font-weight: bold;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    span {
      width: 21%;
      border: 1px solid #ccc;
      margin: 5px;
      padding: 10px 15px;
      text-align: center;
    }
  }
}
</style>