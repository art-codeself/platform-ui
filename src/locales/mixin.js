import util from '@/libs/util'

export default {
  methods: {
    onChangeLocale (command) {
      this.$i18n.locale = command
      let message = `当前语言：${this.$t('_displayName')} [ ${this.$i18n.locale} ]`

      util.cookies.set('lang', command)

      console.log(this.$i18n.locale)

      console.log(this.$t('layout.header-aside.header-fullscreen.active'))

      this.$notify({
        title: '语言变更',
        dangerouslyUseHTMLString: true,
        message
      })
    }
  }
}
