<template>
  <el-dropdown size="small" class="sy-mr">
    <span class="btn-text">{{info.name ? $t('layout.header-aside.header-user.hello') + info.name : $t('layout.header-aside.header-user.notlogin')}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff">
        <sy-icon name="power-off" class="sy-mr-5"/>
        {{$t('layout.header-aside.header-user.log-off')}}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('sysStore/user', [
      'info'
    ])
  },
  methods: {
    ...mapActions('sysStore/account', [
      'logout'
    ]),
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        vm: this,
        confirm: true
      })
    }
  }
}
</script>
