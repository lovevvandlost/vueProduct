<!--
 * @Description: 
 * @Author:  
 * @Date: 2021-11-01 19:38:22
 * @LastEditTime: 2021-11-03 21:15:27
 * @LastEditors:  
-->
<template>
  <div>
    <!-- 头部面包屑导航 -->
    <Breadcrumb name1="用户管理" name2="用户列表" />
    <!-- 卡片区域 -->
    <el-card class="box-card" style="height:750px">
      <!-- 头部搜索栏 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 搜索区域 -->
          <el-input placeholder="请输入搜索内容" clearable @clear="getUserList" v-model="queryInfo.query" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="isAddDialogUserVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table border stripe style="width: 100%" :data="userList">
        <el-table-column type="index" label="#">
        </el-table-column>
        <el-table-column label="姓名" prop="username">
        </el-table-column>
        <el-table-column label="邮箱" prop="email">
        </el-table-column>
        <el-table-column label="电话" prop="mobile">
        </el-table-column>
        <el-table-column label="角色" prop="role_name">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" @change="handleChangeState(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editDialog(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)"></el-button>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRoles(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination :total="total" :current-page="queryInfo.pagenum" :page-size="queryInfo.pagesize" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[1, 2, 5, 10]" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
      <!-- 分页结束 -->
    </el-card>
    <!-- 添加用户弹出框 -->
    <el-dialog title="添加用户" :visible.sync="isAddDialogUserVisible" width="50%" @close="addDialogClose">
      <el-form label-width="70px" :model="addForm" ref="addFormRef" :rules="addFormRules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isAddDialogUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户弹出框 -->
    <el-dialog title="修改用户" :visible.sync="isEditDialogUserVisible" width="50%" @close="editDialogClose">
      <el-form label-width="70px" :model="editForm" ref="editFormRef" :rules="editFormRules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isEditDialogUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色对话框 -->
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="setRolesDialogVisible" @close="setRolesDialogClosed" width="50%">
      <div>
        <p>当前的用户 : {{ userInfo.username }}</p>
        <p>当前的角色 : {{ userInfo.role_name }}</p>
        <p>
          分配新角色:
          <el-select v-model="selectRoleId" placeholder="请选择">
            <el-option v-for="item in rolesList" :key="item.id" :label="item.roleName" :value="item.id"> </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRolesDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRolesInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userAddFormRulesMixin } from '@/common/rule.js'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
export default {
  name: 'Users',
  components: { Breadcrumb },
  mixins: [userAddFormRulesMixin],
  data () {
    return {
      userList: [],

      // 传过去的参数
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      // 添加用户存储
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 需要被分配角色的用户信息
      userInfo: {},
      // 修改用户存储
      editForm: {},
      total: 0,
      // 控制是否显示弹出框
      isAddDialogUserVisible: false,
      // 修改用户
      isEditDialogUserVisible: false,
      // 分配角色
      setRolesDialogVisible: false,
      // 分配角色列表
      rolesList: [],
      // 保存已经选中的角色id值
      selectRoleId: ''
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 获取用户列表
    async getUserList () {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error('获取列表失败')
      this.userList = res.data.users
      this.total = res.data.total
    },
    // 监听状态栏改变
    async handleChangeState (userInfo) {
      const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error("改变用户状态失败")
      }
      this.$message.success('改变用户状态成功')
    },
    // 分页
    handleSizeChange (newsize) {
      this.queryInfo.pagesize = newsize
      this.getUserList()
    },
    handleCurrentChange (newnum) {
      this.queryInfo.pagenum = newnum
      this.getUserList()
    },
    // 添加用户方法
    addUser () {
      this.$refs.addFormRef.validate(async vaild => {
        if (!vaild) return
        const { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) return this.$message.error("添加用户失败")
        this.$message.success('添加用户成功')
        this.isAddDialogUserVisible = false
        this.getUserList()
      })
    },
    // 添加用户弹出层关闭事件
    addDialogClose () {
      this.$refs.addFormRef.resetFields()
    },
    // 修改用户弹出层的方法
    async editDialog (id) {
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) return this.$message.error("查询用户失败")
      this.$message.success('查询用户成功')
      this.editForm = res.data
      this.isEditDialogUserVisible = true
    },
    // 关闭修改用户弹出层事件
    editDialogClose () {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户
    editUser () {
      this.$refs.editFormRef.validate(async vaild => {
        if (!vaild) return
        const { data: res } = await this.$http.put('users/' + this.editForm.id, {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        })
        if (res.meta.status !== 200) return this.$message.error('修改用户信息失败')
        this.isEditDialogUserVisible = false
        this.getUserList()
        this.$message.success('修改用户信息成功')
      })
    },
    // 删除用户
    async deleteUser (id) {
      const resultConfirm = await this.$confirm('此操作将永久删除该文件, 是否继续?', '永久删除该用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 用户点击了删除,则返回字符串 confirm
      // 用户取消了删除,则返回字符串 cancel
      if (resultConfirm !== 'confirm') {
        return this.$message.info('已经取消了删除')
      }
      const { data: res } = await this.$http.delete('users/' + id)
      if (res.meta.status !== 200) return this.$message.error('删除用户失败')
      this.$message.success(res.meta.msg)
      this.getUserList()
    },
    // 展示分配角色对话框
    async setRoles (userInfo) {
      this.userInfo = userInfo
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) return this.$message.error('获取角色列表失败')
      this.rolesList = res.data
      this.setRolesDialogVisible = true
    },
    // 点击按钮,分配角色
    async saveRolesInfo () {
      if (!this.selectRoleId) {
        return this.$message.error('请选择要分配的角色!')
      }
      const { data: res } = await this.$http.put(`users/${this.userInfo.id}/role`, {
        rid: this.selectRoleId
      })
      if (res.meta.status !== 200) {
        return this.$message.error('更新角色失败!')
      }
      this.$message.success('更新角色成功!')
      this.getUserList()
      this.setRolesDialogVisible = false
    },
    // 分配角色对话框关闭
    setRolesDialogClosed () {
      this.selectRoleId = ''
      this.userInfo = ''
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
</style>