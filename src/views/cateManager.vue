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
        <span v-for="(value,index) in cateList" :key="value.id" @click="removeCate(value)">{{ value.name }}</span>
      </div>
    </div>
    <div class="addCate">
      <h3>点击添加频道</h3>
      <div class="list">
        <span v-for="(value,index) in unaddCateList" :key="value.id" @click="addCate(value)">{{ value.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import My_header from "@/components/my_header";
import {getCateList} from '@/apis/category'

export default {
  name: "cateManager",
  components: {My_header},
  data() {
    return {
      // 添加的栏目
      cateList: [],
      // 未添加栏目
      unaddCateList: []
    }
  },
  async mounted() {
    // 先读取已经本地 已存储的数组
    this.cateList = JSON.parse(localStorage.getItem('cateList'))
    if (!this.cateList) {
      let res = await getCateList()
      console.log(res)
      this.cateList = res.data.data
      if (localStorage.getItem('token')) {
        this.cateList.splice(0, 2)
      } else {
        this.cateList.splice(0, 1)
      }
      console.log(this.cateList)
    }
    this.unaddCateList = JSON.parse(localStorage.getItem('unaddCateList') || '[]')
  },
  methods: {
    removeCate(value) {
      // 1.将当前栏目添加到 未添加栏目 中
      this.unaddCateList.push(value)
      // 2.将当前栏目从 已添加栏目 中移出
      this.cateList = this.cateList.filter(v => {
        return v.id !== value.id
      })

      // 将两个数组存储到本地存储,本地存储只能存储字符串
      // 把  未添加  的栏目 储存到本地的remove
      localStorage.setItem('cateList', JSON.stringify(this.cateList))
      // 把  已添加  的栏目 储存到本地的add
      localStorage.setItem('unaddCateList', JSON.stringify(this.unaddCateList))
    },
    addCate(value) {
      // 1.将当前栏目添加到 未添加栏目中
      this.cateList.push(value)
      // 2.将当前栏目从 已添加栏目 中移出
      this.unaddCateList = this.unaddCateList.filter(v => {
        return v.id !== value.id
      })
      // 将两个数组存储到本地存储,本地存储只能存储字符串
      localStorage.setItem('cateList', JSON.stringify(this.cateList))
      localStorage.setItem('unaddCateList', JSON.stringify(this.unaddCateList))
    }
  }
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