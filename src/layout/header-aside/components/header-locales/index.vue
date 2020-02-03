<template>
  <el-dropdown
    placement="bottom"
    size="small"
    @command="onChangeLocale">
    <el-button class="sy-mr btn-text can-hover" type="text">
      <sy-icon name="language" style="font-size: 16px;"/>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="language in $languages"
        :key="language.value"
        :command="language.value">
        <sy-icon :name="$i18n.locale === language.value ? 'dot-circle-o' : 'circle-o'" class="sy-mr-5"/>
        {{ language.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import localeMixin from '@/locales/mixin.js'
export default {
  mixins: [
    localeMixin
  ]
}
</script>
