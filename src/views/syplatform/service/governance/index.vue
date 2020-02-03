<template>
  <sy-container-iframe :src="src"/>
</template>
<script>
export default {
  name: 'syplatform-Governance',
  data () {
    return {
      src: `${process.env.VUE_APP_ADMINSERVER_URL}`
    }
  }
}
</script>
