<template>
  <div class="commentItem">
    <commentItem v-if='parent.parent'
                 :parent='parent.parent' @replay="replayComment"></commentItem>
    <div class="top">
      <div class="left">
        <span>{{ parent.user.nickname }}</span> &nbsp;&nbsp;&nbsp;
        <span>2分钟前</span>
      </div>
      <span @click="replayComment(parent)">回复</span>
    </div>
    <div class="bottom">{{ parent.content }}</div>
  </div>
</template>

<script>
export default {
  // 这个属性的值就可以当成组件来使用
  name: 'commentItem',
  props: {
    parent: {
      type: Object
    }
  },
  methods: {
    replayComment(v) {
      // 实现子传父
      this.$emit('replay', v)
    }
  }
}
</script>

<style lang="less" scoped>
.commentItem {
  border: 1px solid #ccc;
  padding: 5px;
  margin-top: 10px;

  .top {
    font-size: 12px;
    color: #aaa;
    display: flex;
    justify-content: space-between;
  }

  .bottom {
    font-size: 13px;
    line-height: 40px;
  }
}
</style>