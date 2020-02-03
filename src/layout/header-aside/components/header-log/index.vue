<template>
  <el-tooltip
    effect="dark"
    :content="tooltipContent"
    placement="bottom">
    <el-button
      class="sy-ml-0 sy-mr btn-text can-hover"
      type="text"
      @click="handleClick">
      <el-badge
        v-if="logLength > 0"
        :max="99"
        :value="logLengthError"
        :is-dot="logLengthError === 0">
        <sy-icon
          :name="logLengthError === 0 ? 'dot-circle-o' : 'bug'"
          style="font-size: 20px"/>
      </el-badge>
      <sy-icon
        v-else
        name="dot-circle-o"
        style="font-size: 20px"/>
    </el-button>
  </el-tooltip>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters('sysStore', {
      logLength: 'log/length',
      logLengthError: 'log/lengthError'
    }),
    tooltipContent () {
      let emptyLog = this.$t('layout.header-aside.header-log.empty')
      let allLog = this.$t('layout.header-aside.header-log.log-length', { length: this.logLength })
      let exLog = this.$t('layout.header-aside.header-log.error-length', { length: this.logLengthError })
      if (this.logLength > 0) {
        if (this.logLengthError > 0) {
          return allLog + '|' + exLog
        } else {
          return allLog
        }
      } else {
        return emptyLog
      }
    }
  },
  methods: {
    ...mapMutations('sysStore/log', [
      'clean'
    ]),
    handleClick () {
      this.$router.push({
        name: 'syslog'
      })
    }
  }
}
</script>
