<template>
  <sy-container>
    <el-table
      :data="log"
      size="mini"
      style="width: 100%"
      :empty-text="$t('views.system.log.table.empty-text')"
      stripe>
      <!-- 时间 -->
      <el-table-column
        prop="time"
        :label="$t('views.system.log.table.label.time')"
        width="140">
      </el-table-column>
      <!-- 信息 -->
      <el-table-column
        prop="message"
        :label="$t('views.system.log.table.label.message')">
      </el-table-column>
      <!-- 触发页面 -->
      <el-table-column
        :label="$t('views.system.log.table.label.url')"
        align="center"
        min-width="200">
        <template slot-scope="scope">
          {{get(scope.row, 'meta.url')}}
        </template>
      </el-table-column>
      <!-- 触发组件 -->
      <el-table-column
        :label="$t('views.system.log.table.label.component')"
        align="center"
        min-width="120">
        <template slot-scope="scope">
          <el-tag
            v-if="get(scope.row, 'meta.instance.$vnode.componentOptions.tag')"
            type="info"
            size="mini">
            &#60;{{get(scope.row, 'meta.instance.$vnode.componentOptions.tag')}}&gt;
          </el-tag>
        </template>
      </el-table-column>
      <!-- 查看详情 -->
      <el-table-column
        fixed="right"
        align="center"
        :label="$t('views.system.log.table.label.more')"
        width="100">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleShowMore(scope.row)">
            <sy-icon name="eye"/>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">
      <el-button
        type="primary"
        size="mini"
        :loading="uploading"
        @click="handleUpload">
        <sy-icon name="cloud-upload"/>
        Upload {{log.length}} log data
      </el-button>
    </template>
  </sy-container>
</template>

<script>
import { mapState } from 'vuex'
import { get } from 'lodash'
export default {
  data () {
    return {
      uploading: false
    }
  },
  computed: {
    ...mapState('sysStore/log', [
      'log'
    ])
  },
  methods: {
    get,
    handleShowMore (log) {
      // 打印一条日志的所有信息到控制台
      this.$notify({
        type: 'info',
        title: this.$t('views.system.log.notify.title'),
        message: this.$t('views.system.log.notify.message')
      })
      this.$log.capsule('SysLog', 'handleShowMore', 'primary')
      console.group(log.message)
      console.log('time: ', log.time)
      console.log('type: ', log.type)
      console.log(log.meta)
      console.groupEnd()
    },
    // 日志上传
    handleUpload () {
      this.uploading = true
      this.$notify({
        type: 'info',
        title: this.$t('views.system.log.upload.title'),
        message: this.$t('views.system.log.upload.button', { number: this.log.length })
      })
      setTimeout(() => {
        this.uploading = false
        this.$notify({
          type: 'success',
          title: this.$t('views.system.log.upload.title'),
          message: this.$t('views.system.log.upload.message')
        })
      }, 3000)
    }
  }
}
</script>
