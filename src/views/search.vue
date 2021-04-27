<template>
  <div class="search">
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search
          v-model="userKey"
          placeholder="请输入搜索关键词"
          shape="round"
      >
      </van-search>
      <div @click="onSearch">搜索</div>
    </div>
    <div class="historyList">
      <h2>历史记录</h2>
      <p v-for="item in historyList" :key="item.id" @click="searchByHistory(item)">{{ item }}</p>
    </div>
    <div class="historyList">
      <h2>搜索结果</h2>
      <router-link :to="{path:`postDetail/${value.id}`}" v-for="value in searchList" :key="value.id">{{
          value.title
        }}
      </router-link>
    </div>
  </div>
</template>

<script>
import {searchPost} from "@/apis/post";

export default {
  data() {
    return {
      userKey: '',
      searchList: [],
      historyList: []
    }
  },
  methods: {
    async onSearch() {
      // 获取输入框的值搜索
      let res = await searchPost(this.userKey)
      console.log(res)
      this.searchList = res.data.data

      // 判断搜索历史有没有重复
      let index = this.historyList.indexOf(this.userKey)
      if (index !== -1) {
        this.historyList.splice(index, 1)
      }
      // 添加到历史
      this.historyList.unshift(this.userKey)
      // 储存到本地
      localStorage.setItem('search', JSON.stringify(this.historyList))
    },
    searchByHistory(item) {
      this.userKey = item
      this.onSearch()
    }
  },
  mounted() {
    this.historyList = JSON.parse(localStorage.getItem('search', JSON.stringify(this.historyList)) || [])
  }
}
</script>

<style lang='less' scoped>
.header {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;

  .van-search {
    flex: 1;
    padding: 5px 12px;
  }
}

.historyList {
  padding: 10px;
  border-bottom: 1px solid #ccc;

  h2 {
    line-height: 40px;
    font-weight: bold;
  }

  > a {
    display: block;
    text-decoration: underline;
    line-height: 30px;
    color: #666;
  }
}
</style>