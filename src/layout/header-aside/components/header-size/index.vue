<template>
  <el-dropdown placement="bottom" size="small" @command="handleChange">
    <el-button class="sy-mr btn-text can-hover" type="text">
      <sy-icon name="font" style="font-size: 16px;"/>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item in options" :key="item.value" :command="item.value">
        <sy-icon :name="iconName(item.value)" class="sy-mr-5"/>{{item.label}}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'sy-header-size',
  data () {
    return {
      options: [
        { label: this.$t('layout.header-aside.header-size.options.default'), value: 'default' },
        { label: this.$t('layout.header-aside.header-size.options.medium'), value: 'medium' },
        { label: this.$t('layout.header-aside.header-size.options.small'), value: 'small' },
        { label: this.$t('layout.header-aside.header-size.options.mini'), value: 'mini' }
      ]
    }
  },
  computed: {
    ...mapState('sysStore/size', [
      'value'
    ])
  },
  watch: {
    // 注意 这里是关键
    // 因为需要访问 this.$ELEMENT 所以只能在这里使用这种方式
    value: {
      handler (val, oldVal) {
        // https://github.com/sy-projects/sy-admin/pull/129
        if (oldVal) {
          // 这个情况在已经加载完页面 用户改变了尺寸时触发
          this.$ELEMENT.size = val
          // 由于已经加载过设置 需要清空缓存设置
          this.pageKeepAliveClean()
          // 由于已经加载过设置 需要刷新此页面
          this.$router.replace('/refresh')
        } else {
          // 这个情况在刷新页面时触发
          this.$ELEMENT.size = val
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations({
      pageKeepAliveClean: 'sysStore/page/keepAliveClean'
    }),
    ...mapActions({
      sizeSet: 'sysStore/size/set'
    }),
    handleChange (value) {
      this.sizeSet(value)
    },
    iconName (name) {
      return name === this.value ? 'dot-circle-o' : 'circle-o'
    }
  }
}
</script>
