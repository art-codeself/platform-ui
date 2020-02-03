<template>
  <div
    class="sy-layout-header-aside-group"
    :style="styleLayoutMainGroup"
    :class="{grayMode: grayActive}">
    <!-- 半透明遮罩 -->
    <div class="sy-layout-header-aside-mask"></div>
    <!-- 主体内容 -->
    <div class="sy-layout-header-aside-content" flex="dir:top">
      <!-- 顶栏 -->
      <div
        class="sy-theme-header"
        :style="{
          opacity: this.searchActive ? 0.5 : 1
        }"
        flex-box="0"
        flex>
        <div class="logo-group" :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}" flex-box="0">
          <img style="height:40px;margin-top:10px;" v-if="asideCollapse" :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/icon-only.png`">
          <img style="height:40px;margin-top:10px;" v-else :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/all.png`">
        </div>
        <div class="toggle-aside-btn" @click="handleToggleAside" flex-box="0">
          <sy-icon name="bars"/>
        </div>
        <sy-menu-header flex-box="1"/>
        <!-- 顶栏右侧 -->
        <div class="sy-header-right" flex-box="0">
          <!-- 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" -->
          <sy-header-search @click="handleSearchClick"/>
          <sy-header-log/>
          <sy-header-fullscreen/>
          <sy-header-theme/>
          <sy-header-locales/>
          <sy-header-size/>
          <sy-header-user/>
        </div>
      </div>
      <!-- 下面 主体 -->
      <div class="sy-theme-container" flex-box="1" flex>
        <!-- 主体 侧边栏 -->
        <div
          flex-box="0"
          ref="aside"
          class="sy-theme-container-aside"
          :style="{
            width: asideCollapse ? asideWidthCollapse : asideWidth,
            opacity: this.searchActive ? 0.5 : 1
          }">
          <sy-menu-side/>
        </div>
        <!-- 主体 -->
        <div class="sy-theme-container-main" flex-box="1" flex>
          <!-- 搜索 -->
          <transition name="fade-scale">
            <div v-if="searchActive" class="sy-theme-container-main-layer" flex>
              <sy-panel-search
                ref="panelSearch"
                @close="searchPanelClose"/>
            </div>
          </transition>
          <!-- 内容 -->
          <transition name="fade-scale">
            <div v-if="!searchActive" class="sy-theme-container-main-layer" flex="dir:top">
              <!-- tab -->
              <div class="sy-theme-container-main-header" flex-box="0">
                <sy-tabs/>
              </div>
              <!-- 页面 -->
              <div class="sy-theme-container-main-body" flex-box="1">
                <transition :name="transitionActive ? 'fade-transverse' : ''">
                  <keep-alive :include="keepAlive">
                    <router-view/>
                  </keep-alive>
                </transition>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import syMenuSide from './components/menu-side'
import syMenuHeader from './components/menu-header'
import syTabs from './components/tabs'
import syHeaderFullscreen from './components/header-fullscreen'
import syHeaderLocales from './components/header-locales'
import syHeaderSearch from './components/header-search'
import syHeaderSize from './components/header-size'
import syHeaderTheme from './components/header-theme'
import syHeaderUser from './components/header-user'
import syHeaderLog from './components/header-log'
import { mapState, mapGetters, mapActions } from 'vuex'
import mixinSearch from './mixins/search'
export default {
  name: 'sy-layout-header-aside',
  mixins: [
    mixinSearch
  ],
  components: {
    syMenuSide,
    syMenuHeader,
    syTabs,
    syHeaderFullscreen,
    syHeaderLocales,
    syHeaderSearch,
    syHeaderSize,
    syHeaderTheme,
    syHeaderUser,
    syHeaderLog
  },
  data () {
    return {
      // [侧边栏宽度] 正常状态
      asideWidth: '200px',
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: '65px'
    }
  },
  computed: {
    ...mapState('sysStore', {
      keepAlive: state => state.page.keepAlive,
      grayActive: state => state.gray.active,
      transitionActive: state => state.transition.active,
      asideCollapse: state => state.menu.asideCollapse
    }),
    ...mapGetters('sysStore', {
      themeActiveSetting: 'theme/activeSetting'
    }),
    /**
     * @description 最外层容器的背景图片样式
     */
    styleLayoutMainGroup () {
      return {
        ...this.themeActiveSetting.backgroundImage ? {
          backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')`
        } : {}
      }
    }
  },
  methods: {
    ...mapActions('sysStore/menu', [
      'asideCollapseToggle'
    ]),
    /**
     * 接收点击切换侧边栏的按钮
     */
    handleToggleAside () {
      this.asideCollapseToggle()
    }
  }
}
</script>

<style lang="scss">
// 注册主题
@import '~@/assets/style/theme/register.scss';
</style>
