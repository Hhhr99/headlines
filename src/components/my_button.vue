<template>
  <div class="btn" :class="{success:type==='success',danger:type==='danger',primary:type==='primary'}" @click="handerClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "my_button",
  props: {
    type: {
      type: String
    }
  },
  methods: {
    handerClick(e) {
      console.log('handerClick')
      this.$emit('click', e)
    }
  }

}
</script>

<style lang="less" scoped>
.btn {
  width: 314 * 100vw/360;
  height: 50px;
  background-color: rgb(70, 158, 12);
  border-radius: 25px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
}

.success {
  background-color: rgb(33, 150, 15);
  color: #fff;
}

.danger {
  background-color: rgb(204, 42, 28);
  color: #fff;
}

.primary {
  background-color: rgb(25, 59, 160);
  color: #fff;
}
</style>