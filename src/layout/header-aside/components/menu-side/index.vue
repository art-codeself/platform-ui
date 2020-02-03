<template>
  <div class="sy-layout-header-aside-menu-side">
    <el-menu
      :collapse="asideCollapse"
      :unique-opened="true"
      :default-active="active"
      ref="menu"
      @select="handleMenuSelect">
      <template v-for="(menu, menuIndex) in aside">
        <sy-layout-header-aside-menu-item v-if="menu.children === undefined" :menu="menu" :key="menuIndex"/>
        <sy-layout-header-aside-menu-sub v-else :menu="menu" :key="menuIndex"/>
      </template>
    </el-menu>
    <div v-if="aside.length === 0 && !asideCollapse" class="sy-layout-header-aside-menu-empty" flex="dir:top main:center cross:center">
      <sy-icon name="inbox"/>
      <span>{{$t('layout.header-aside.menu-side.empty')}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import menuMixin from '../mixin/menu'
import syLayoutMainMenuItem from '../components/menu-item/index.vue'
import syLayoutMainMenuSub from '../components/menu-sub/index.vue'
import BScroll from 'better-scroll'
export default {
  name: 'sy-layout-header-aside-menu-side',
  mixins: [
    menuMixin
  ],
  components: {
    'sy-layout-header-aside-menu-item': syLayoutMainMenuItem,
    'sy-layout-header-aside-menu-sub': syLayoutMainMenuSub
  },
  data () {
    return {
      active: '',
      asideHeight: 300,
      BS: null
    }
  },
  computed: {
    ...mapState('sysStore/menu', [
      'aside',
      'asideCollapse'
    ])
  },
  watch: {
    // 折叠和展开菜单的时候销毁 better scroll
    asideCollapse (val) {
      this.scrollDestroy()
      setTimeout(() => {
        this.scrollInit()
      }, 500)
    },
    // 监听路由 控制侧边栏激活状态
    '$route': {
      handler ({ fullPath }) {
        this.active = fullPath
        this.$nextTick(() => {
          if (this.aside.length > 0 && this.$refs.menu) {
            this.$refs.menu.activeIndex = fullPath
          }
        })
      },
      immediate: true
    }
  },
  mounted () {
    this.scrollInit()
  },
  beforeDestroy () {
    this.scrollDestroy()
  },
  methods: {
    scrollInit () {
      this.BS = new BScroll(this.$el, {
        mouseWheel: true,
        click: true
        // 如果你愿意可以打开显示滚动条
        // scrollbar: {
        //   fade: true,
        //   interactive: false
        // }
      })
    },
    scrollDestroy () {
      try {
        this.BS.destroy()
      } catch (e) {
        delete this.BS
        this.BS = null
      }
    }
  }
}
</script>
