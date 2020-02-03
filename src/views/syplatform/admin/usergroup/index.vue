<template>
  <sy-container>
    <!-- header 查询条件 -->
    <template slot="header">
      <el-button size="mini" type="default" @click="getList" icon="el-icon-refresh">刷新</el-button>
      <div style="float: right">
        <el-button size="mini" type="primary" @click="handleAdd" icon="el-icon-plus">新 增</el-button>
      </div>
    </template>
    <!-- table表格 -->
    <el-table :key='tableKey'
              :data="tableData"
              v-loading="tableLoading"
              element-loading-text="拼命加载中..."
              highlight-current-row
              stripe
              style="width: 100%">
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="用户组名称" />
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="280"  fixed="right">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="rowDel(scope.row,scope.index)"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row,scope.index)"></el-button>
          <el-button size="mini" type="default" @click="handleUserSet(scope.row)">成员</el-button>
          <el-button size="mini" type="warning" @click="handleRoleSet(scope.row)">角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- footer 分页条 -->
    <template slot="footer">
        <el-pagination
          background
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page.sync="page.currentPage"
          :page-sizes="[10,20,30,50]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          style="margin: -10px;">
        </el-pagination>
    </template>
    <!-- 表单弹窗 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="800px" :before-close="dialogClose">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="用户组名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入用户组名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
           <el-input-number  v-model="form.sort" placeholder="请输入排序" clearable></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" @click="dialogFormVisible = false" icon="el-icon-close">取 消</el-button>
        <el-button size="small" v-if="dialogStatus=='create'" type="primary" @click="handleSave" icon="el-icon-check">保 存</el-button>
        <el-button size="small" v-else type="primary" @click="handleUpdate" icon="el-icon-check">修 改</el-button>
      </div>
    </el-dialog>

    <sy-group-member-set ref="groupMemberSet"/>
    <sy-group-role-set ref="groupRoleSet"/>
  </sy-container>
</template>

<script>
import {
  fetchList,
  addObj,
  getObj,
  putObj,
  delObj
} from '@/api/usergroup'
export default {
  name: 'usergroup',
  data () {
    return {
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      tableLoading: false,
      tableKey: 0,
      dialogStatus: '',
      dialogFormVisible: false,
      textMap: {
        update: '编辑用户组',
        create: '新增用户组'
      },
      form: {
        name: '',
        sort: 1
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入用户组名称',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  filters: {},
  created () {
    this.getList()
  },
  mounted: function () {},
  methods: {
    getList () {
      this.tableLoading = true
      fetchList({
        page: this.page.currentPage,
        limit: this.page.pageSize
      }).then(response => {
        this.tableData = response.data.records
        this.page.total = response.data.total
        this.tableLoading = false
      })
    },
    currentChange (val) {
      this.page.currentPage = val
      this.getList()
    },
    sizeChange (val) {
      this.page.pageSize = val
      this.getList()
    },
    handleAdd: function () {
      this.resetTemp()
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleEdit (row, index) {
      getObj(row.id)
        .then((res) => {
          this.form = res.data
          this.dialogFormVisible = true
          this.dialogStatus = 'update'
        })
    },
    /**
     * 删除路由
     */
    rowDel: function (row, index) {
      var _this = this
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function () {
          delObj(row.id).then(data => {
            _this.tableData.splice(index, 1)
            _this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
            _this.getList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    /**
     * 数据更新
     **/
    handleUpdate: function () {
      this.$refs.form.validate(valid => {
        if (valid) {
          putObj(this.form).then(data => {
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            this.getList()
          })
        }
      })
    },
    /**
     * 数据添加
     **/
    handleSave: function () {
      this.$refs.form.validate(valid => {
        if (valid) {
          addObj(this.form).then(data => {
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            this.$refs.form.resetFields()
            this.getList()
          })
        }
      })
    },
    dialogClose (done) {
      this.$refs.form.resetFields()
      this.scope = []
      this.authorizedGrantTypes = []
      done()
    },
    resetTemp () {
      this.form = {
        name: '',
        sort: 1
      }
    },
    handleUserSet (row) {
      this.$refs.groupMemberSet.init(row.id)
    },
    handleRoleSet (row) {
      this.$refs.groupRoleSet.init(row.id)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
