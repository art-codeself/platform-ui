<template>
  <el-button class="sy-mr btn-text can-hover" type="text" @click="handleClick">
    <sy-icon name="search" style="font-size: 18px;"/>
  </el-button>
</template>

<script>
export default {
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>
