<template>
  <input type="text" class="myinput" :[pn]="{success:flag,error:!flag}" @input="handerInput" @blur="handerBlur">
</template>

<script>

import {Button} from "vant";

export default {
  name: "my_input",
  // props: ['value'],
  props: {
    rules: {
      type: RegExp
    },
    msg: {
      type: String,
      default: '输入错误'

    }
  },
  data() {
    return {
      flag: '',
      pn: 'aa'
    }
  },
  methods: {
    handerInput(e) {
      this.pn = 'class'
      let value = e.target.value
      // 校验用户输入是否合法
      if (this.rules) { // 判断是否传递了规则
        // 进行用户数据的校验
        if (this.rules.test(value)) {
          console.log('ok')
          this.flag = true
        } else {
          console.log('no ok')
          this.flag = false
        }
      }
      if (!value) {
        this.pn = 'aa'
      }
      this.$emit('input', value)
    },
    // 失焦处理事件函数
    handerBlur(e) {
      let value = e.target.value
      // 校验用户输入是否合法
      if (this.rules) { // 判断是否传递了规则
        // 进行用户数据的校验
        if (!this.rules.test(value)) {
          console.log(this.msg)
          Button
        }
      }
    },
  }
}
</script>

<style lang="less" scoped>
.myinput {
  width: 314/360vw*100;
  height: 50px;
  outline: none;
  border: none;
  border-bottom: 2px solid #ccc;
  font-size: 16px;
  color: #ccc;
  line-height: 50px;
}

.success {
  border-bottom-color: green;
}

.error {
  border-bottom-color: red;
}
</style>