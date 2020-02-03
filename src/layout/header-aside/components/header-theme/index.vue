<template>
  <div>
    <el-tooltip
      effect="dark"
      :content="$t('layout.header-aside.header-theme.tooltip.content')"
      placement="bottom">
      <el-button
        class="sy-ml-0 sy-mr btn-text can-hover"
        type="text"
        @click="dialogVisible = true">
        <sy-icon
          name="diamond"
          style="font-size: 16px"/>
      </el-button>
    </el-tooltip>
    <el-dialog
      :title="$t('layout.header-aside.header-theme.dialog.title')"
      width="600px"
      :visible.sync="dialogVisible"
      :append-to-body="true">
      <sy-theme-list style="margin-top: -25px;"/>
    </el-dialog>
  </div>
</template>

<script>
import themeList from './components/sy-theme-list'
export default {
  components: {
    'sy-theme-list': themeList
  },
  data () {
    return {
      dialogVisible: false
    }
  }
}
</script>
