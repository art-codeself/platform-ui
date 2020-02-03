<template>
  <sy-container>
    <!-- header 查询条件 -->
    <template slot="header">
      <el-button size="mini" type="default" @click="getList" icon="el-icon-refresh">{{$t('views.syplatform.admin.dept.header.button.refresh')}}</el-button>
      <div style="float: right">
        <el-button size="mini" type="primary" @click="handlerAdd" icon="el-icon-plus">{{$t('views.syplatform.admin.dept.header.button.add')}}</el-button>
      </div>
    </template>
    <tree-table :data="treeData">
     <el-table-column :label="$t('views.syplatform.admin.dept.table.column.name')">
      <template slot-scope="scope">
        <span>{{ scope.row.name }}</span>
      </template>
     </el-table-column>
     <el-table-column :label="$t('views.syplatform.admin.dept.table.column.sort')">
      <template slot-scope="scope">
        <span>{{ scope.row.sort }}</span>
      </template>
     </el-table-column>
     <el-table-column :label="$t('views.syplatform.admin.dept.table.column.operate.title')" width="360" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handlerDelete(scope.row.id)" icon="el-icon-delete"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="handlerEdit(scope.row.id)"></el-button>
          <el-button size="mini" v-if="scope.row.parentId!=-1" type="warning" @click="handleMenuSet(scope.row)">{{$t('views.syplatform.admin.dept.table.column.operate.button.Authorization')}}</el-button>
          <!-- <el-button size="mini" type="success" @click="handleUserSet(scope.row)">成员</el-button>
          <el-button size="mini" type="primary" @click="handlePositionSet(scope.row)">职位</el-button>
          <el-button size="mini" type="warning" @click="handleRoleSet(scope.row)">角色</el-button> -->
        </template>
      </el-table-column>
    </tree-table>
    <!-- 新增弹框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="400px">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item :label="$t('views.syplatform.admin.dept.dialog.form.label.parentId')" prop="parentId">
          <!-- <el-select v-model="form.parentId" placeholder="不选默认顶级部门" style="width:100%" :disabled="isEdit">
            <el-option label="顶级部门" :value="-1" />
            <el-option
              v-for="item in listAll"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> -->
          <sy-select-tree
            :props="props"
            :options="optionData"
            :value="valueId"
            :clearable="isClearable"
            :accordion="isAccordion"
            @getValue="getValue($event)"
            v-model="form.parentId"/>
        </el-form-item>
        <el-form-item :label="$t('views.syplatform.admin.dept.dialog.form.label.name')" prop="name">
          <el-input v-model="form.name" :placeholder="$t('views.syplatform.admin.dept.dialog.form.placeholder.name')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('views.syplatform.admin.dept.dialog.form.label.sort')" prop="sort">
          <el-input v-model.number="form.sort" :placeholder="$t('views.syplatform.admin.dept.dialog.form.placeholder.sort')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel" icon="el-icon-close">{{ $t('views.syplatform.admin.dept.dialog.form.button.cancel') }}</el-button>
        <el-button type="primary" @click="submit" icon="el-icon-check">{{ $t('views.syplatform.admin.dept.dialog.form.button.confirm') }}</el-button>
      </div>
    </el-dialog>

     <sy-dept-member-set ref="deptMemberSet"/>
     <sy-dept-position-set ref="deptPositionSet"/>
     <sy-dept-role-set ref="deptRoleSet"/>
     <sy-dept-menu-set ref="deptMenuSet"/>
  </sy-container>
</template>

<script>
import { listAll, fetchTree, getObj, addObj, delObj, putObj } from '@/api/dept'
export default {
  name: 'department',
  data () {
    const validateSort = (rule, value, callback) => {
      if (!value) {
        callback()
        return
      }
      if (!Number.isInteger(value)) {
        callback(new Error(this.$t('views.syplatform.admin.dept.message.message.error.sort.isInteger')))
      } else {
        if (value < 1 || value > 999) {
          callback(new Error(this.$t('views.syplatform.admin.dept.message.message.error.sort.valueRange')))
        } else {
          callback()
        }
      }
    }
    return {
      /**
       * 部门选择
       */
      isClearable: true, // 可清空（可选）
      isAccordion: true, // 可收起（可选）
      valueId: -1, // 初始ID（可选）
      props: {
        // 配置项（必选）
        value: 'id',
        label: 'name',
        children: 'children'
        // disabled:true
      },
      dialogFormVisible: false,
      isEdit: false,
      listAll: [],
      treeData: [],
      dialogStatus: '',
      textMap: {
        update: this.$t('views.syplatform.admin.dept.dialog.form.title.edit'),
        create: this.$t('views.syplatform.admin.dept.dialog.form.title.add')
      },
      form: {
        name: undefined,
        sort: 99,
        parentId: undefined,
        id: undefined
      },
      rules: {
        name: [
          { required: true, message: this.$t('views.syplatform.admin.dept.dialog.form.validate.name.required'), trigger: 'blur' },
          { min: 2, max: 50, message: this.$t('views.syplatform.admin.dept.dialog.form.validate.name.length'), trigger: 'blur' }
        ],
        sort: [
          { validator: validateSort, trigger: 'blur' }
        ]
      }
    }
  },
  filters: {
    typeFilter (type) {
      const typeMap = {
        0: this.$t('views.syplatform.admin.dept.table.filter.typeMap.menu'),
        1: this.$t('views.syplatform.admin.dept.table.filter.typeMap.button')
      }
      return typeMap[type]
    }
  },
  created () {
    this.getList()
  },
  computed: {
    /* 部门数据转树形数据 */
    optionData () {
      let cloneData = []
      cloneData.push({ 'id': -1, 'parentId': -2, 'name': this.$t('views.syplatform.admin.dept.data.menuName'), 'sort': 0 })
      cloneData = cloneData.concat(this.treeData)
      return cloneData
    }
  },
  methods: {
    // 部门选择取值
    getValue (value) {
      this.valueId = value
      this.form.parentId = value
    },
    getAllList () {
      listAll().then(response => {
        this.listAll = response.data
      })
    },
    getList () {
      fetchTree().then(response => {
        this.treeData = response.data
      })
    },
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!this.form.parentId) {
            this.form.parentId = -1
          }
          if (!this.isEdit) {
            this.create()
          } else {
            this.update()
          }
        }
      })
    },
    handlerEdit (id) {
      getObj(id).then((data) => {
        this.form = data.data
        this.getAllList()
        this.isEdit = true
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
      })
    },
    handlerAdd () {
      this.getAllList()
      this.resetForm()
      this.isEdit = false
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handlerDelete (id) {
      this.$confirm(this.$t('views.syplatform.admin.dept.message.confirm.delete.message'), this.$t('views.syplatform.admin.dept.message.confirm.delete.title'), {
        confirmButtonText: this.$t('views.syplatform.admin.dept.message.confirm.button.confirm'),
        cancelButtonText: this.$t('views.syplatform.admin.dept.message.confirm.button.cancel'),
        type: 'warning'
      }).then(() => {
        delObj(id).then(({ data }) => {
          if (data.status && data.status === 'FAILED') {
            return
          }
          this.getList()
          this.resetForm()
          this.onCancel()
          this.$notify({
            title: this.$t('views.syplatform.admin.dept.message.notify.title.success'),
            message: this.$t('views.syplatform.admin.dept.message.notify.message.delete'),
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    update () {
      putObj(this.form).then(() => {
        this.onCancel()
        this.getList()
        this.$notify({
          title: this.$t('views.syplatform.admin.dept.message.notify.title.success'),
          message: this.$t('views.syplatform.admin.dept.message.notify.message.update'),
          type: 'success',
          duration: 2000
        })
      })
    },
    create () {
      addObj(this.form).then(() => {
        this.onCancel()
        this.getList()
        this.$notify({
          title: this.$t('views.syplatform.admin.dept.message.notify.title.success'),
          message: this.$t('views.syplatform.admin.dept.message.notify.message.add'),
          type: 'success',
          duration: 2000
        })
      })
    },
    onCancel () {
      this.dialogFormVisible = false
      this.resetForm()
    },
    resetForm () {
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },
    handleUserSet (row) {
      this.$refs.deptMemberSet.init(row.id)
    },
    handlePositionSet (row) {
      this.$refs.deptPositionSet.init(row.id)
    },
    handleRoleSet (row) {
      this.$refs.deptRoleSet.init(row.id)
    },
    handleMenuSet (row) {
      this.$refs.deptMenuSet.init(row.id, row.parentId)
    }
  }
}
</script>
