<template>
  <div class="index">
    <!-- 头部 -->
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <van-icon name="search"/>
        <span @click="$router.push({name:'search'})">搜索商品</span>
      </div>
      <div class="user">
        <van-icon name="manager-o"
                  @click="jump"/>
      </div>
    </div>
    <!-- tab标签页
    1.数量超过5个，标签项才能左右滚动--滑动
    2.sticky：实现吸顶效果
    3.swipeable：滑动内容，实现标签项的切换 -->
    <van-tabs v-model="active"
              sticky
              swipeable>
      <van-tab :title="cate.name"
               v-for='(cate,index) in cateList'
               :key='cate.id'>

        <van-list v-model="cate.loading"
                  :finished="cate.finished"
                  finished-text="没有更多了"
                  loading-text='玩命加载中...'
                  :offset="200"
                  :immediate-check='false'
                  @load="onLoad">

          <van-pull-refresh v-model="cate.isLoading"
                            @refresh="onRefresh">

            <my_post-block v-for='item in cate.postList'
                           :key='item.id'
                           :post='item'></my_post-block>

          </van-pull-refresh>

        </van-list>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import {getCateList} from '@/apis/category.js'
import {getPostList} from '@/apis/post.js'
import My_postBlock from "@/components/my_postBlock";

export default {
  data() {
    return {
      // 当前被激活项的索引值:这个索引值就对应着数据在数组中的索引
      // 这个项目在打开首页之后，应该让“头条”栏目默认被选中，如果登陆了，有了关注，那么active=1，否则 active=0
      active: localStorage.getItem('token') ? 1 : 0,
      cateList: [], // 所有栏目数据
      // catePostList: [], // 栏目的新闻数据
    };
  },
  components: {
    My_postBlock,
  },
  async mounted() {
    // 点击添加栏目
    document.querySelector('.van-sticky').onclick = (e) => {
      console.log(e.target.className)
      let className = e.target.className
      if (className.indexOf('van-sticky') !== -1) {
        this.$router.push({name: 'cateManager'})
      }
    }
    // // 首页加载之后，先读取本地存储中的栏目数据--加载用户定制数据
    this.cateList = JSON.parse(localStorage.getItem('cateList') || '[]')
    if (this.cateList.length === 0) {
      // 页面一加载完毕：获取栏目数据
      let res = await getCateList()
      console.log(res)
      // 这个数据现在只有 id  name  is_top，并没有存储新闻数据的数组
      this.cateList = res.data.data
    } else {
      if (localStorage.getItem('token')) {
        this.cateList.unshift({id: 0, name: '关注', is_top: 1}, {id: 999, name: '头条', is_top: 1})
      } else {
        this.cateList.unshift({id: 999, name: '头条', is_top: 1})
      }
    }

    // 数据改造：为每个栏目添加一个数组用于存储这个栏目自己的新闻数据
    this.cateList = this.cateList.map(v => {
      // v.postList = []
      // return v
      // postList：为当前栏目所添加的用于存储这个栏目的新闻数据的数组
      return {
        ...v,
        postList: [],//为当前栏目所添加的用于存储这个栏目的新闻数据的数组
        pageIndex: 1,// 当前栏目的当前页码
        pageSize: 6, // 当前栏目的每页所显示的数量
        loading: false,//当前组件的上拉加载的状态
        finished: false,//当前组件的数据是否全部加载完毕的标记
        isLoading: false,// 当前组件的下拉刷新的状态，标记是否正在下拉刷新
      }
    })
    console.log(this.cateList);

    // 加载当前默认栏目的新闻数据
    this.getpost()
  },

  methods: {
    // 单击个人中心图标
    jump() {
      // 判断是否有id,如果有就跳转到个人中心页
      let id = localStorage.getItem('userid')
      if (id) {
        this.$router.push({path: `/personal/${id}`})
      } else {
        this.$toast.fail('未登陆，请先登陆')
        this.$router.push({path: `/login`})
      }
      // 如果没有，则登陆
    },
    // 下拉刷新处理函数
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
    // 上拉加载下一页数据
    onLoad() {
      // 加载下一页数据：就是将当前栏目的页码+1，重新发起axios请求
      this.cateList[this.active].pageIndex++
      this.getpost()
    },
    async getpost() {
      // 加载默认栏目的新闻数据：关键在于获取当前栏目的id
      let current = (await getPostList({
        category: this.cateList[this.active].id, // 传递当前栏目的id
        pageSize: this.cateList[this.active].pageSize, // 传递当前栏目的pageSize
        pageIndex: this.cateList[this.active].pageIndex// 传递当前栏目的pageIndex
      })).data.data
      // let id = this.cateList[this.active].id
      // 将获取到的新闻数据存储到当前栏目的postList数组中
      this.cateList[this.active].postList.push(...current)
      // 本次请求完成之后，将loading重置为false,以便下一次上拉
      this.cateList[this.active].loading = false
      // 本次请求完成之后，将下拉刷新折状态重置为false,以便下一次下拉刷新
      this.cateList[this.active].isLoading = false
      // 判断数据是否已全部加载完毕：我要求6条数据，结果返回的数量小于6，说明真没有数据了
      if (current.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true
      }
    }
  },

  watch: {
    // 单击栏目获取当前栏目的新闻数据：关键也是获取栏目id
    active() {
      if (this.cateList[this.active].postList.length === 0) {
        this.getpost()
      }
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
    background-color: #f00;

    .logo {
      color: #fff;

      .iconnew {
        font-size: 50px;
      }
    }

    .search {
      flex: 1;
      height: 40px;
      margin-top: 5px;
      border-radius: 20px;
      background-color: rgba(255, 255, 255, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      margin: 0 10px;
    }

    .user {
      color: #fff;
      font-size: 20px;
    }
  }
}

/deep/ .van-sticky {
  padding-right: 44px;

  &::before {
    content: "+";
    width: 51px;
    height: 42px;
    position: absolute;
    top: 0;
    right: 7px;
    background-color: #fff;
    line-height: 42px;
    text-align: center;
    font-size: 35px;
  }
}
</style>