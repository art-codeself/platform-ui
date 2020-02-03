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
      <el-button type="primary" @click="updatePositionMenu()" icon="el-icon-check">授 权</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { fetchPositionMenuTree, positionMenuUpd } from '@/api/position'
import { fetchDeptAuthorizationTree } from '@/api/dept'
// import { fetchTree } from '@/api/menu'
export default {
  name: 'position-menu-set',
  data () {
    return {
      positionId: null,
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
    init (positionId, positionDeptId) {
      this.positionId = positionId
      this.visible = true
      fetchPositionMenuTree(positionId)
        .then(response => {
          this.checkedKeys = response.data
          return fetchDeptAuthorizationTree(positionDeptId)
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
    updatePositionMenu () {
      let currentCheckedKeys = this.$refs.menuTree.getCheckedKeys().concat(this.$refs.menuTree.getHalfCheckedKeys())
      positionMenuUpd(this.positionId, currentCheckedKeys).then(() => {
        this.dialogPermissionVisible = false
        fetchPositionMenuTree(this.positionId)
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
  .position-set .el-table__empty-block {
    min-height: 45px;
  }
</style>
