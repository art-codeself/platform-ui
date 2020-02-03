<template>
  <sy-container v-bind="$attrs">
    <iframe
      class="sy-container-frame"
      :src="src"
      frameborder="0"/>
  </sy-container>
</template>

<script>
export default {
  name: 'sy-container-frame',
  props: {
    src: {
      type: String,
      required: false,
      default: 'https://###'
    }
  }
}
</script>

<style lang="scss" scoped>
.sy-container-frame {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
}
</style>
