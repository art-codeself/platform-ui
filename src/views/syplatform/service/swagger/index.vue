<template>
  <sy-container-iframe :src="src"/>
</template>
<script>
export default {
  name: 'syplatform-Swagger',
  data () {
    return {
      src: `${process.env.VUE_APP_BASE_URL}/doc.html`
    }
  }
}
</script>
