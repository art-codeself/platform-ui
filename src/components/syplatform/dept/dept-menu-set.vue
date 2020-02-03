<template>
  <el-dialog title="菜单授权" :visible.sync="dialogPermissionVisible" width="800px" top="20px">
    <el-tree class="filter-tree"
      :data="treeData"
      :default-checked-keys="checkedKeys"
      node-key="id"
      highlight-current
      :props="defaultProps"
      show-checkbox
      ref="menuTree"
      :filter-node-method="filterNode">
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="updateDeptMenu()" icon="el-icon-check">授 权</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { fetchDeptMenuTree, fetchDeptAuthorizationTree, deptMenuUpd } from '@/api/dept'
// import { fetchTree } from '@/api/menu'
export default {
  name: 'dept-menu-set',
  data () {
    return {
      deptId: null,
      visible: false,
      checkedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dialogPermissionVisible: false,
      treeData: []
    }
  },
  methods: {
    init (deptId, parentId) {
      this.deptId = deptId
      this.visible = true
      fetchDeptMenuTree(deptId)
        .then(response => {
          this.checkedKeys = response.data
          return fetchDeptAuthorizationTree(parentId)
          // return fetchTree(deptId)
        })
        .then(response => {
          this.treeData = response.data
          this.dialogPermissionVisible = true
        })
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    updateDeptMenu () {
      let currentCheckedKeys = this.$refs.menuTree.getCheckedKeys().concat(this.$refs.menuTree.getHalfCheckedKeys())
      deptMenuUpd(this.deptId, currentCheckedKeys).then(() => {
        this.dialogPermissionVisible = false
        fetchDeptMenuTree(this.deptId)
          .then(response => {
            this.checkedKeys = response.data
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
      })
    }
  }
}
</script>
<style lang="scss">
  .dept-set .el-table__empty-block {
    min-height: 45px;
  }
</style>
