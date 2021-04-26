<template>
  <div class="comment">
    <my_header title='精彩评论页'>
      <template v-slot:left>
        <van-icon name="arrow-left"
                  @click="$router.go(-1)" />
      </template>
    </my_header>
    <div class="item">
      <div class="head">
        <img src="@/assets/logo.png"
             alt />
        <div>
          <p>发表人</p>
          <span>时间</span>
        </div>
        <span>回复</span>
      </div>
      <div class="text">评论内容</div>
    </div>
  </div>
</template>

<script>
import my_header from '@/components/my_header'
export default {
  components: {
    my_header
  }
}
</script>

<style lang="less" scoped>
.item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > img {
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      display: block;
      border-radius: 50%;
    }
    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      > span {
        font-size: 12px;
        color: #999;
        line-height: 25px;
      }
    }
    > span {
      color: #999;
      font-size: 13px;
    }
  }
  .text {
    font-size: 14px;
    color: #333;
    padding: 20px 0 10px 0;
  }
}
</style>