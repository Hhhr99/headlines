<template>
  <div class="my_cell">
    <div class="left">{{ title }}</div>
    <div class="right">
      <span>{{ desc }}</span>
      <van-icon name="arrow"></van-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "my_cell",
  props: {
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
.my_cell {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 10px;
  align-items: center;
  border-bottom: 1px solid #ccc;

  .right {
    font-size: 14px;
    color: #ccc;
  }
}
</style>