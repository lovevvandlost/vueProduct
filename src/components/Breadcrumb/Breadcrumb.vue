<!--
 * @Description: 
 * @Author:  
 * @Date: 2021-11-03 07:28:33
 * @LastEditTime: 2021-11-03 07:28:34
 * @LastEditors:  
-->
<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ name1 }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ name2 }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    name1: String,
    name2: String
  }
}
</script>

<style lang="less" scoped></style>