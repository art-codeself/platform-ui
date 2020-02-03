<template>
  <el-dialog title="用户组角色设置" :visible.sync="visible" width="800px" top="20px">
    <el-row :gutter="20" class="group-set">
      <el-col :span="12">
        <p>可添加角色</p>
        <div style="margin-bottom: 10px">
          <el-input size="small" @keyup.enter.native="queryNotin" style="width: 200px;margin-right:10px" v-model="addRoleName" clearable></el-input>
          <el-button size="small" type="default" @click="queryNotin" icon="el-icon-search">搜 索</el-button>
        </div>
        <el-table :data="notin" stripe border style="width: 100%" size="small">
          <el-table-column prop="name" label="角色名称"></el-table-column>
          <el-table-column prop="action" label="操作" width="100">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="addOne(scope.row)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- footer 分页条 -->
        <el-pagination
          background
          @current-change="handlePageAddedChange"
          :current-page.sync="pageNotin.page"
          :page-size="pageNotin.limit"
          layout="prev, pager, next, total"
          :total="notinTotal"
          style="margin-top:10px">
        </el-pagination>
      </el-col>
      <el-col :span="12">
        <p>已添加角色</p>
        <div style="margin-bottom: 10px">
          <el-input size="small" @keyup.enter.native="queryAdded" style="width: 200px;margin-right:10px" v-model="deleteRoleName" clearable></el-input>
          <el-button size="small" type="default" @click="queryAdded" icon="el-icon-search">搜 索</el-button>
        </div>
        <el-table :data="added" stripe border style="width: 100%" size="small">
          <el-table-column prop="name" label="角色名称"></el-table-column>
          <el-table-column prop="action" label="操作" width="100">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="deleteOne(scope.row)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- footer 分页条 -->
        <el-pagination
          background
          @current-change="handlePageNotinChange"
          :current-page.sync="pageAdded.page"
          :page-size="pageAdded.limit"
          layout="prev, pager, next, total"
          :total="addedTotal"
          style="margin-top:10px">
        </el-pagination>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { usergroupRolesUpd, usergroupRolesAdded, usergroupRolesNotin } from '@/api/usergroup'
export default {
  name: 'usergroup-user-set',
  data () {
    return {
      groupId: null,
      visible: false,
      addRoleName: '',
      deleteRoleName: '',
      added: [],
      addedTotal: 0,
      notin: [],
      notinTotal: 0,
      pageAdded: {
        page: 1,
        limit: 10
      },
      pageNotin: {
        page: 1,
        limit: 10
      }
    }
  },
  methods: {
    init (groupId) {
      this.groupId = groupId
      this.queryAdded()
      this.queryNotin()
      this.visible = true
    },
    queryAdded () {
      usergroupRolesAdded(this.groupId, Object.assign(this.pageAdded, { roleName: this.deleteRoleName }))
        .then(({ data }) => {
          if (data.status === 'SUCCEED') {
            this.added = data.result.records
            this.addedTotal = data.result.total
          }
        })
    },
    queryNotin () {
      usergroupRolesNotin(this.groupId, Object.assign(this.pageNotin, { roleName: this.addRoleName }))
        .then(({ data }) => {
          if (data.status === 'SUCCEED') {
            this.notin = data.result.records
            this.notinTotal = data.result.total
          }
        })
    },
    handlePageAddedChange (page) {
      this.pageAdded.page = page
      this.queryAdded()
    },
    handlePageNotinChange (page) {
      this.pageNotin.page = page
      this.queryNotin()
    },
    addOne (row) {
      usergroupRolesUpd(this.groupId, [row.id], 'add')
        .then(({ data }) => {
          if (data.status === 'SUCCEED') {
            this.queryAdded()
            this.queryNotin()
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success',
              duration: 2000
            })
          }
        })
    },
    deleteOne (row) {
      usergroupRolesUpd(this.groupId, [row.id], 'delete')
        .then(({ data }) => {
          if (data.status === 'SUCCEED') {
            this.queryAdded()
            this.queryNotin()
            this.$notify({
              title: '成功',
              message: '移除成功',
              type: 'success',
              duration: 2000
            })
          }
        })
    }
  }
}
</script>
<style lang="scss">
  .group-set .el-table__empty-block {
    min-height: 45px;
  }
</style>
