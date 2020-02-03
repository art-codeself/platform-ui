<template>
  <el-tooltip
    effect="dark"
    :content="active ? $t('layout.header-aside.header-fullscreen.exit') : $t('layout.header-aside.header-fullscreen.active')"
    placement="bottom">
    <el-button class="sy-mr btn-text can-hover" type="text" @click="toggle">
      <sy-icon v-if="active" name="compress"/>
      <sy-icon v-else name="arrows-alt" style="font-size: 16px"/>
    </el-button>
  </el-tooltip>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('sysStore/fullscreen', [
      'active'
    ])
  },
  methods: {
    ...mapActions('sysStore/fullscreen', [
      'toggle'
    ])
  }
}
</script>
