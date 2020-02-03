<template>
  <el-menu-item :index="menu.path || uniqueId">
    <i v-if="menu.icon" :class="`fa fa-${menu.icon}`"></i>
    <i v-if="menu.icon === undefined & !menu.iconSvg" class="fa fa-file-o"></i>
    <sy-icon-svg v-if="menu.iconSvg" :name="menu.iconSvg"/>
    <span slot="title">{{menu.title || $t("layout.header-aside.menu-item.label-default") }}</span>
  </el-menu-item>
</template>

<script>
import { uniqueId } from 'lodash'
export default {
  name: 'sy-layout-header-aside-menu-item',
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
