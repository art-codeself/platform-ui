<template>
  <sy-container-iframe :src="src"/>
</template>
<script>
export default {
  name: 'syplatform-Sentinel',
  data () {
    return {
      src: `${process.env.VUE_APP_SENTINEL_URL}`
    }
  }
}
</script>
