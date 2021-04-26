<template>
  <div class="comment">
    <my_header title='精彩评论页'>
      <template v-slot:left>
        <van-icon name="arrow-left"
                  @click="$router.go(-1)"/>
      </template>
    </my_header>
    <div class="item" v-for="value in commentList" :key="value.id">
      <div class="head">
        <img :src="axios.defaults.baseURL +value.user.head_img"
             alt/>
        <div>
          <p>{{ value.user.nickname }}</p>
          <span>时间</span>
        </div>
        <span>回复</span>
      </div>
      <my_comment-item v-if='value.parent'
                       :parent='value.parent'></my_comment-item>
      <div class="text">{{ value.content }}</div>
    </div>
  </div>
</template>

<script>
import my_header from '@/components/my_header'
import {getPostComment} from '@/apis/post.js'
import axios from '@/utils/request.js'
import My_commentItem from "@/components/my_commentItem";

export default {
  components: {
    My_commentItem,
    my_header
  },
  data() {
    return {
      commentList: [], axios
    }
  },
  async mounted() {
    let id = this.$route.params.id
    let res = await getPostComment(id)
    console.log(res);
    this.commentList = res.data.data
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