<template>
  <div class="mystar">
    <my_header title='我的收藏'>
      <template v-slot:left>
        <van-icon name="arrow-left"
                  @click="$router.go(-1)"/>
      </template>
    </my_header>
    <van-swipe-cell v-for='value in starList' :key="value.id">
      <my_postBlock :post='value'></my_postBlock>
      <template #right>
        <van-button square
                    text="删除"
                    type="danger"
                    class="delete-button"
                    style='height:100%'/>
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import my_header from '@/components/my_header'
import my_postBlock from '@/components/my_postBlock'
import {getUserStars} from '@/apis/user.js'

export default {
  components: {
    my_header, my_postBlock
  },
  data() {
    return {
      starList: []
    }
  },
  async mounted() {
    let res = await getUserStars()
    console.log(res);
    this.starList = res.data.data
  }
}
</script>

<style>
</style>