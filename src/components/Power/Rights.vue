<!--
 * @Description: 
 * @Author:  
 * @Date: 2021-11-01 19:39:54
 * @LastEditTime: 2021-11-03 21:15:09
 * @LastEditors:  
-->
<template>
  <div class="rights">
      <!-- 面包屑导航 -->
      <Breadcrumb name1="权限管理" name2="权限列表"/>
      <el-card style="height:750px">
        <el-table :data="rightsList" stripe border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column label="权限等级">
          <template v-slot="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="warning" v-else-if="scope.row.level === '2'">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
      </el-card>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
export default {
  name: 'Rights',
  components: {Breadcrumb},
  data() {
    return {
      // 权限列表
      rightsList: []
    }
  },
  created() {
    this.getRightsList()
  },
  methods: {
    async getRightsList() {
      const { data: res } = await this.$http.get('rights/list')
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败!')
      }
      this.rightsList = res.data
      console.log(this.rightsList)
    }
  }
}
</script>

<style>

</style>