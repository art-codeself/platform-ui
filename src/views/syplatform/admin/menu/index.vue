<template>
  <sy-container>
    <!-- header 查询条件 -->
    <template slot="header">
      <el-button size="mini" type="default" @click="getList" icon="el-icon-refresh">刷新</el-button>
      <div style="float: right">
        <el-button size="mini" type="primary" @click="handleAdd" icon="el-icon-plus">新 增</el-button>
      </div>
    </template>
    <tree-table :data="treeData">
     <el-table-column label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="路径">
        <template slot-scope="scope">
          <span>{{ scope.row.path }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
           <el-tag v-if="scope.row.type" :type="scope.row.type | typeTagFilter" effect="plain">{{scope.row.type | typeFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="图标" width="80">
        <template slot-scope="scope">
          <i :class="`fa fa-${scope.row.icon}`"></i>
        </template>
      </el-table-column>
      <el-table-column label="排序" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.sort }}</span>
        </template>
      </el-table-column>
     <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row.id)"></el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </tree-table>
    <!-- 新增菜单弹框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="400px">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="上级菜单" prop="parentId">
          <!-- <el-select v-model="form.parentId" placeholder="不选默认顶级菜单" style="width:100%">
            <el-option label="顶级菜单" :value="-1" />
            <el-option
              v-for="item in treeData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>           -->
          <sy-select-tree
            :props="props"
            :options="optionData"
            :value="valueId"
            :clearable="isClearable"
            :accordion="isAccordion"
            @getValue="getValue($event)"
            v-model="form.parentId"/>
        </el-form-item>
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name" placeholder="最多输入50个字符"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="path">
          <el-input v-model="form.path" placeholder="最多输入255个字符"></el-input>
        </el-form-item>
        <el-form-item label="权限编码" prop="permissionCode">
          <el-input v-model="form.permissionCode" placeholder="最多输入255个字符"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="form.type" size="small" @change="formTypeClickHandler">
              <el-radio label='0'>菜单</el-radio>
              <el-radio label='1'>按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <sy-icon-select v-model="form.icon" placeholder="请选择图标"></sy-icon-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model.number="form.sort" placeholder="只能输入正整数, 最大999"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel" icon="el-icon-close">取 消</el-button>
        <el-button type="primary" @click="submit" icon="el-icon-check">确 定</el-button>
      </div>
    </el-dialog>
  </sy-container>
</template>

<script>
import { fetchTree, getObj, addObj, delObj, putObj } from '@/api/menu'
export default {
  name: 'user-menu',
  data () {
    const validateSort = (rule, value, callback) => {
      if (!value) {
        callback()
        return
      }
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'))
      } else {
        if (value < 1 || value > 999) {
          callback(new Error('大小在 1 到 999 之间'))
        } else {
          callback()
        }
      }
    }
    return {
      /**
       * 菜单选择
       */
      isClearable: true, // 可清空（可选）
      isAccordion: true, // 可收起（可选）
      valueId: 1, // 初始ID（可选）
      props: {
        // 配置项（必选）
        value: 'id',
        label: 'name',
        children: 'children'
        // disabled:true
      },
      dialogFormVisible: false,
      treeData: [],
      dialogStatus: '',
      textMap: {
        update: '编辑菜单',
        create: '新增菜单'
      },
      form: {
        id: undefined,
        name: undefined,
        parentId: undefined,
        url: undefined,
        icon: undefined,
        sort: 99,
        path: undefined,
        type: '0',
        permissionCode: undefined
      },
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请输入菜单路径', trigger: 'blur' },
          { min: 2, max: 255, message: '长度在 2 到 255 个字符', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请选择菜单图标', trigger: 'change' }
        ],
        sort: [
          { validator: validateSort, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getList()
  },
  computed: {
    /* 转树形数据 */
    optionData () {
      // let cloneData = JSON.parse(JSON.stringify(this.treeData))
      // return cloneData.filter(father => {
      //   let branchArr = cloneData.filter(child => father.id == child.parentId)//eslint-disable-line
      //   father.children = branchArr.length > 0 ? branchArr : ''
      //   return father.parentId == 0;//eslint-disable-line
      // })
      let cloneData = []
      cloneData.push({ 'id': -1, 'parentId': -2, 'icon': '', 'name': '顶级菜单', 'url': '', 'spread': false, 'path': '', 'label': '顶级菜单', 'sort': 0, 'type': 0 })
      cloneData = cloneData.concat(this.treeData)
      return cloneData
    }
  },
  filters: {
    typeFilter (type) {
      const typeMap = {
        0: '菜单',
        1: '按钮'
      }
      return typeMap[type]
    },
    typeTagFilter (type) {
      const typeTagMap = {
        0: '',
        1: 'warning'
      }
      return typeTagMap[type]
    }
  },
  methods: {
    // 菜单选择取值
    getValue (value) {
      this.valueId = value
      this.form.parentId = value
    },
    getList () {
      fetchTree().then(response => {
        this.treeData = response.data
      })
    },
    // 新增菜单
    handleAdd () {
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
    },
    // 编辑菜单
    handleEdit (id) {
      getObj(id).then((data) => {
        this.form = data.data
        this.dialogFormVisible = true
        this.dialogStatus = 'update'
      })
    },
    handleDelete (id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObj(id).then(() => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!this.form.parentId) {
            this.form.parentId = -1
          }
          if (!this.form.id) {
            this.create()
          } else {
            this.update()
          }
        }
      })
    },
    update () {
      putObj(this.form).then(() => {
        this.onCancel()
        this.getList()
        this.$notify({
          title: '成功',
          message: '更新成功',
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
          title: '成功',
          message: '创建成功',
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
      this.$refs.form.resetFields()
    },
    formTypeClickHandler (label) {}
  }
}
</script>
