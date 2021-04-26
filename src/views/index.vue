<template>
  <div class="index">
    <!--    头部-->
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <van-icon name="search"/>
        <span>搜索商品</span>
      </div>
      <div class="user">
        <van-icon name="manager-o" @click="jump"/>
      </div>
    </div>
    <!--    tab标签页-->
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="cate.name" v-for="(cate,index) in cateList" :key="cate.id">
        <van-list v-model="cate.loading" :finished="cate.finished" finished-text="玩命加载中..." :offset="200"
                  :immediate-check="false" @load="onLoad"></van-list>
        <van-pull-refresh v-model="cate.isLoading" @refresh="onRefresh"></van-pull-refresh>
        <my_post-block v-for="post in cate.postList" :key="post.id" :post="post"></my_post-block>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import {getCateList} from "@/apis/category";
import {getPostList} from "@/apis/post";
import My_postBlock from "@/components/my_postBlock";

export default {
  name: "index",
  components: {My_postBlock},
  data() {
    return {
      active: localStorage.getItem('token') ? 1 : 0,
      cateList: [],// 所有栏目数据
      // catePostList: []
    }
  },
  async mounted() {
    // 页面一加载完毕：获取栏目数据
    let res = await getCateList()
    console.dir(res);
    this.cateList = res.data.data
    // console.log(this.cateList)

    // 数据改造
    this.cateList = this.cateList.map((v) => {
      // postList：为当前栏目所添加的用于存储这个栏目的新闻数据的数组
      return {
        ...v,
        postList: [],//为当前栏目所添加的用于存储这个栏目的新闻数据的数组
        pageIndex: 1,// 当前栏目的当前页码
        pageSize: 6, // 当前栏目的每页所显示的数量
        loading: false,//当前组件的上拉加载的状态
        finished: false, //当前组件的数据是否全部加载完毕的标记
        isLoading: false // 当前组件的下拉刷新的状态，标记是否正在下拉刷新
      }
    })
    console.log(this.cateList)
    // 获取当前被激活栏目的新闻数据
    // await this.getpost()

  },
  methods: {
    // 单机各人中心图标
    jump() {
      // 判断是否有id,如果有就跳转到个人中心页
      let id = localStorage.getItem('heimatoutiao_userid')
      if (id) {
        this.$router.push({path: `/personal/${id}`})
      } else {
        this.$toast.fail('未登陆，请先登陆')
        this.$router.push({path: `/login`})
      }
      // 如果没有，则登陆
    },
    onRefresh() {
      // 下拉刷新需要做什么
      // 1.页码重新设置为1
      this.cateList[this.active].pageIndex = 1
      // 2.将数据清空
      this.cateList[this.active].postList.length = 0
      // 3.将之前可能重置为true的finished状态重置为false
      this.cateList[this.active].finished = false

      this.getpost()
    },
    // 上拉加载下一页的数据
    onLoad() {
      this.cateList[this.active].pageIndex++
      this.getpost()
    },
    async getpost() {
      // 加载默认栏目的新闻数据：关键在于获取当前栏目的id
      // let id = this.cateList[this.active].id
      // console.log(id)
      // 将获取到的新闻数据存储到当前栏目的postList数组中
      let current = (await getPostList({
        category: this.cateList[this.active].id,
        pageSize: this.cateList[this.active].pageSize,
        pageIndex: this.cateList[this.active].pageIndex
      })).data.data

      // 将获取到的新闻数据储存到当前栏目的postList数组中
      this.cateList[this.active].postList.push(...current)
      // 本次请求完成之后，将loading重置为false,以便下一次上拉
      this.cateList[this.active].loading = false
      // 本次请求完成之后，将下拉刷新折状态重置为false,以便下一次下拉刷新
      this.cateList[this.active].isLoading = false
      // 判断数据是否已全部加载完毕：我要求6条数据，结果返回的数量小于6，说明真没有数据了
      if (current.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true
      }
      // console.log(this.cateList[this.active].postList)
    }
  },
  watch: {
    async active() {
      // 单击栏目获取当前栏目的新闻数据：关键也是获取栏目id
      if (this.cateList[this.active].postList.length === 0) {
        await this.getpost()
      }
    }
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