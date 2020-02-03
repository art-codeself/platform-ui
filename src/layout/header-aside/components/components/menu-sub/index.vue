<template>
  <el-submenu :index="menu.path || uniqueId">
    <template slot="title">
      <i v-if="menu.icon" :class="`fa fa-${menu.icon}`"></i>
      <i v-if="menu.icon === undefined & !menu.iconSvg" class="fa fa-folder-o"></i>
      <sy-icon-svg v-if="menu.iconSvg" :name="menu.iconSvg"/>
      <span slot="title">{{menu.title}}</span>
    </template>
    <template v-for="(child, childIndex) in menu.children">
      <sy-layout-header-aside-menu-item v-if="child.children === undefined" :menu="child" :key="childIndex"/>
      <sy-layout-header-aside-menu-sub v-else :menu="child" :key="childIndex"/>
    </template>
  </el-submenu>
</template>

<script>
import { uniqueId } from 'lodash'
// 组件
import syLayoutMainMenuItem from '../menu-item'

export default {
  name: 'sy-layout-header-aside-menu-sub',
  components: {
    'sy-layout-header-aside-menu-item': syLayoutMainMenuItem
  },
  props: {
    menu: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data () {
    return {
      uniqueId: uniqueId('sy-menu-empty-')
    }
  }
}
</script>
