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
        <van-icon name="manager-o"/>
      </div>
    </div>
    <!--    tab标签页-->
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="cate.name" v-for="(cate,index) in cateList" :key="cate.id">
        <my_post-block v-for="post in postlist" :key="post.id" :post="post"></my_post-block>
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
      cateList: [],
      postlist: []
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
      return {...v, postlist: []}
    })
    // 获取当前被激活栏目的新闻数据

  },
  watch: {
    async active() {
      // 单击栏目获取当前栏目的新闻数据：关键也是获取栏目id
      if (this.active[this.active].postlist.length === 0) {
        let id = this.active[this.active].id
        console.log(this.active, id)
        this.cateList[this.active].postlist = (await getCateList(id)).data.data
      }
    }
  },
  methods: {
    async getpost() {
      let id = this.cateList[this.active].id
      // console.log(id)
      this.postlist = (await getPostList(id)).data.data
      console.log(this.postlist)
    }
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