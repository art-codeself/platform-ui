<template>
  <div class="sy-multiple-page-control-group" flex>
    <div class="sy-multiple-page-control-content" flex-box="1">
      <div class="sy-multiple-page-control-content-inner">
        <sy-contextmenu
          :visible.sync="contextmenuFlag"
          :x="contentmenuX"
          :y="contentmenuY">
          <sy-contextmenu-list
            :menulist="tagName === '/dashboard' ? contextmenuListIndex : contextmenuList"
            @rowClick="contextmenuClick"/>
        </sy-contextmenu>
        <el-tabs
          class="sy-multiple-page-control"
          :value="current"
          type="card"
          :closable="true"
          @tab-click="handleClick"
          @edit="handleTabsEdit"
          @contextmenu.native="handleContextmenu">
          <el-tab-pane
            v-for="page in opened"
            :key="page.fullPath"
            :label="page.meta.title || $t('layout.header-aside.tabs.label-default')"
            :name="page.fullPath"/>
        </el-tabs>
      </div>
    </div>
    <div
      class="sy-multiple-page-control-btn"
      flex-box="0">
      <el-dropdown
        size="default"
        split-button
        @click="closeAll"
        @command="command => handleControlItemClick(command)">
        <sy-icon name="times-circle"/>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="left">
            <sy-icon name="arrow-left" class="sy-mr-10"/>
            {{ $t('layout.header-aside.tabs.close-left') }}
          </el-dropdown-item>
          <el-dropdown-item command="right">
            <sy-icon name="arrow-right" class="sy-mr-10"/>
            {{ $t('layout.header-aside.tabs.close-right') }}
          </el-dropdown-item>
          <el-dropdown-item command="other">
            <sy-icon name="times" class="sy-mr-10"/>
            {{ $t('layout.header-aside.tabs.close-other') }}
          </el-dropdown-item>
          <el-dropdown-item command="all">
            <sy-icon name="times-circle" class="sy-mr-10"/>
            {{ $t('layout.header-aside.tabs.close-all') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    syContextmenu: () => import('../contextmenu'),
    syContextmenuList: () => import('../contextmenu/components/contentmenuList')
  },
  data () {
    return {
      contextmenuFlag: false,
      contentmenuX: 0,
      contentmenuY: 0,
      contextmenuListIndex: [
        { icon: 'times-circle', title: this.$t('layout.header-aside.tabs.close-all'), value: 'all' }
      ],
      contextmenuList: [
        { icon: 'arrow-left', title: this.$t('layout.header-aside.tabs.close-left'), value: 'left' },
        { icon: 'arrow-right', title: this.$t('layout.header-aside.tabs.close-right'), value: 'right' },
        { icon: 'times', title: this.$t('layout.header-aside.tabs.close-other'), value: 'other' },
        { icon: 'times-circle', title: this.$t('layout.header-aside.tabs.close-all'), value: 'all' }
      ],
      tagName: '/dashboard'
    }
  },
  computed: {
    ...mapState('sysStore/page', [
      'opened',
      'current'
    ])
  },
  methods: {
    ...mapActions('sysStore/page', [
      'close',
      'closeLeft',
      'closeRight',
      'closeOther',
      'closeAll'
    ]),
    /**
     * @description 右键菜单功能点击
     */
    handleContextmenu (event) {
      let target = event.target
      let flag = false
      if (target.className.indexOf('el-tabs__item') > -1) flag = true
      else if (target.parentNode.className.indexOf('el-tabs__item') > -1) {
        target = target.parentNode
        flag = true
      }
      if (flag) {
        event.preventDefault()
        event.stopPropagation()
        this.contentmenuX = event.clientX
        this.contentmenuY = event.clientY
        this.tagName = target.getAttribute('aria-controls').slice(5)
        this.contextmenuFlag = true
      }
    },
    /**
     * @description 右键菜单的row-click事件
     */
    contextmenuClick (command) {
      this.handleControlItemClick(command, this.tagName)
    },
    /**
     * @description 接收点击关闭控制上选项的事件
     */
    handleControlItemClick (command, tagName = null) {
      if (tagName) {
        this.contextmenuFlag = false
      }
      const params = {
        pageSelect: tagName
      }
      switch (command) {
        case 'left':
          this.closeLeft(params)
          break
        case 'right':
          this.closeRight(params)
          break
        case 'other':
          this.closeOther(params)
          break
        case 'all':
          this.closeAll()
          break
        default:
          this.$message.error('无效的操作')
          break
      }
    },
    /**
     * @description 接收点击 tab 标签的事件
     */
    handleClick (tab, event) {
      // 找到点击的页面在 tag 列表里是哪个
      const page = this.opened.find(page => page.fullPath === tab.name)
      const { name, params, query } = page
      if (page) {
        this.$router.push({ name, params, query })
      }
    },
    /**
     * @description 点击 tab 上的删除按钮触发这里 首页的删除按钮已经隐藏 因此这里不用判断是 index
     */
    handleTabsEdit (tagName, action) {
      if (action === 'remove') {
        this.close({
          tagName
        })
      }
    }
  }
}
</script>
